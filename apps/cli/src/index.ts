#!/usr/bin/env node
import { Command } from 'commander';
import { walkSafe, GraphBuilder } from '@codegraph/core';
import * as fs from 'fs/promises';
import * as path from 'path';

const program = new Command();

program
  .name('codegraph')
  .description('CodeGraph - Interactive architecture graph for Stellar/Soroban')
  .version('0.1.0');

program
  .command('analyze')
  .description('Analyze a directory and emit a graph JSON')
  .argument('<path>', 'Directory to analyze')
  .option('-o, --out <file>', 'Output file', 'graph.json')
  .option('--max-files <number>', 'Maximum number of files to process', '10000')
  .action(async (targetPath, options) => {
    try {
      const fullPath = path.resolve(process.cwd(), targetPath);
      console.log(`Analyzing: ${fullPath}`);
      
      const maxFiles = parseInt(options.maxFiles, 10);
      const { files, skipped } = await walkSafe(fullPath, { maxFiles });
      console.log(`Found ${files.length} files.`);
      if (skipped.length > 0) {
        console.warn(`\nWARNING: Skipped ${skipped.length} files:`);
        for (const s of skipped.slice(0, 5)) {
          console.warn(`  - ${s.file} (${s.reason})`);
        }
        if (skipped.length > 5) {
          console.warn(`  ... and ${skipped.length - 5} more.`);
        }
        console.warn(''); // blank line
      }

      const builder = new GraphBuilder();
      builder.setCoverage(files.length, skipped);
      
      const { SorobanAnalyzerPlugin } = await import('@codegraph/analyzer-soroban');
      const plugins = [new SorobanAnalyzerPlugin()];

      for (const p of plugins) {
        if (await p.detect(fullPath)) {
          console.log(`Plugin ${p.name} detected, analyzing...`);
          const res = await p.analyze(files);
          builder.addNodes(res.nodes);
          builder.addEdges(res.edges);
        }
      }

      const graph = builder.build();
      
      const outPath = path.resolve(process.cwd(), options.out);
      await fs.writeFile(outPath, JSON.stringify(graph, null, 2), 'utf-8');
      
      console.log(`Graph successfully written to ${options.out}`);
    } catch (err: unknown) {
      console.error('Error during analysis:', err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program
  .command('docs')
  .description('Generate a Markdown architecture document from a graph JSON')
  .argument('<graphJson>', 'Path to graph JSON file')
  .option('-o, --out <file>', 'Output markdown file', 'ARCHITECTURE.md')
  .option('--detail <level>', 'Detail level (e.g. function)', 'contract')
  .action(async (graphJson, options) => {
    try {
      const graphData = JSON.parse(await fs.readFile(graphJson, 'utf-8'));
      const { generateMarkdownDocs } = await import('./docs.js');
      const md = generateMarkdownDocs(graphData, options.detail);
      await fs.writeFile(options.out, md, 'utf-8');
      console.log(`Docs successfully written to ${options.out}`);
    } catch (err: unknown) {
      console.error('Error generating docs:', err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program
  .command('export')
  .description('Export graph JSON to other formats (e.g. Mermaid, DOT)')
  .argument('<graphJson>', 'Path to graph JSON file')
  .requiredOption('--format <type>', 'Export format (mermaid, dot)')
  .option('-o, --out <file>', 'Output file', 'graph.mermaid')
  .action(async (graphJson, options) => {
    try {
      const graphData = JSON.parse(await fs.readFile(graphJson, 'utf-8'));
      if (options.format === 'mermaid') {
        const { generateMermaid } = await import('./docs.js');
        const mermaid = generateMermaid(graphData);
        await fs.writeFile(options.out, mermaid, 'utf-8');
        console.log(`Mermaid graph successfully written to ${options.out}`);
      } else if (options.format === 'dot') {
        const { generateDot } = await import('./docs.js');
        const dot = generateDot(graphData);
        await fs.writeFile(options.out, dot, 'utf-8');
        console.log(`DOT graph successfully written to ${options.out}`);
      } else {
        console.error(`Unsupported format: ${options.format}`);
        process.exit(1);
      }
    } catch (err: unknown) {
      console.error('Error exporting graph:', err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program
  .command('check')
  .description('Run heuristics and check architecture graph for issues')
  .argument('<graphJson>', 'Path to graph JSON file')
  .option('--fail-on <types>', 'Comma-separated heuristic IDs that cause a non-zero exit code')
  .action(async (graphJson, options) => {
    try {
      const graphData = JSON.parse(await fs.readFile(graphJson, 'utf-8'));
      let failed = false;
      const failOn = options.failOn ? options.failOn.split(',') : [];

      console.log('--- Analysis Coverage ---');
      if (graphData.coverage) {
        console.log(`Files Analyzed: ${graphData.coverage.filesAnalyzed}`);
        console.log(`Files Skipped:  ${graphData.coverage.skippedFiles.length}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalCalls = graphData.edges.filter((e: any) => e.type === 'calls').length;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const unresolvedCalls = graphData.edges.filter((e: any) => e.type === 'calls' && !e.resolved).length;
      if (totalCalls > 0) {
        console.log(`Unresolved Cross-Contract Calls: ${unresolvedCalls}/${totalCalls} (${((unresolvedCalls / totalCalls) * 100).toFixed(1)}%)`);
      }
      
      console.log('\n--- Health Checks ---');
      if (graphData.heuristics && graphData.heuristics.length > 0) {
        for (const h of graphData.heuristics) {
          console.log(`[${h.id}] ${h.name} (${h.count} found)`);
          if (failOn.includes(h.id)) {
            console.error(`ERROR: Check failed for ${h.id}`);
            failed = true;
          }
        }
      } else {
        console.log('No issues found by heuristics.');
      }

      if (failed) process.exit(1);
    } catch (err: unknown) {
      console.error('Error checking graph:', err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program.parse();
