import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Sidebar } from '../Sidebar';
import type { Graph } from '@codegraph/shared';

const mockGraph: Graph = {
  schemaVersion: 1,
  nodes: [
    {
      id: 'c1',
      type: 'contract',
      name: 'TestContract',
      file: 'test.rs',
      span: { startLine: 1, endLine: 10 }
    },
    {
      id: 'f1',
      type: 'function',
      name: 'test_func',
      file: 'test.rs',
      span: { startLine: 2, endLine: 5 },
      meta: { parentContract: 'c1', has_auth_check: true }
    }
  ],
  edges: [
    {
      id: 'e1',
      from: 'f1',
      to: 'c2',
      type: 'calls',
      confidence: 'high',
      resolved: true
    }
  ]
};

describe('Sidebar Detail Panel', () => {
  it('renders default empty state', () => {
    render(<Sidebar graph={mockGraph} selectedNodeId={null} searchQuery="" setSearchQuery={vi.fn()} />);
    expect(screen.getByText(/Select a node in the graph/i)).toBeInTheDocument();
  });

  it('renders contract details when selected', () => {
    render(<Sidebar graph={mockGraph} selectedNodeId="c1" searchQuery="" setSearchQuery={vi.fn()} />);
    expect(screen.getByText('TestContract')).toBeInTheDocument();
    expect(screen.getByText('contract')).toBeInTheDocument(); // type pill
    expect(screen.getByText(/test.rs:1-10/i)).toBeInTheDocument();
    expect(screen.getByText(/Functions: 1/i)).toBeInTheDocument();
  });

  it('renders function details with auth when selected', () => {
    render(<Sidebar graph={mockGraph} selectedNodeId="f1" searchQuery="" setSearchQuery={vi.fn()} />);
    expect(screen.getByText('test_func')).toBeInTheDocument();
    expect(screen.getByText('Visible Auth Check Found')).toBeInTheDocument();
  });
});
