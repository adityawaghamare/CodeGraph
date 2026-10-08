import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

global.fetch = vi.fn();

describe('App Loader', () => {
  it('renders the initial loader state', () => {
    render(<App />);
    expect(screen.getByText('CodeGraph Viewer')).toBeInTheDocument();
    expect(screen.getByText('Load Soroban Example Graph')).toBeInTheDocument();
  });

  it('handles invalid file upload', async () => {
    render(<App />);
    const file = new File(['invalid json'], 'graph.json', { type: 'application/json' });
    const input = screen.getByLabelText(/Select graph.json/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid graph file/i)).toBeInTheDocument();
    });
  });

  it('loads example graph', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({
        schemaVersion: 1,
        nodes: [{ id: 'c1', type: 'contract', name: 'ContractA', file: 'a.rs', span: { startLine: 1, endLine: 2 } }],
        edges: []
      })
    });

    render(<App />);
    fireEvent.click(screen.getByText('Load Soroban Example Graph'));

    await waitFor(() => {
      // Sidebar should appear
      expect(screen.getByPlaceholderText(/Search contracts/i)).toBeInTheDocument();
    });
  });
});
