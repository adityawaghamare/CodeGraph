
import path from 'path';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebTreeSitter = require('web-tree-sitter');
const Parser = WebTreeSitter.Parser || WebTreeSitter;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let parser: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getParser(): Promise<any> {
  if (parser) return parser;
  
  await Parser.init();
  parser = new Parser();

  let wasmPath = '';
  try {
    wasmPath = require.resolve('tree-sitter-wasms/out/tree-sitter-rust.wasm');
  } catch (e) {
    wasmPath = path.resolve(process.cwd(), 'node_modules/tree-sitter-wasms/out/tree-sitter-rust.wasm');
  }

  const Rust = await Parser.Language.load(wasmPath);
  parser.setLanguage(Rust);
  return parser;
}
