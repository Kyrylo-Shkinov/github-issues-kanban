import React from 'react';
import { render, screen } from '@testing-library/react';
import KanbanColumns from './KanbanColumns';

test('renders KanbanColumns component', () => {
    render(<KanbanColumns />);
    const kanbanColumnsElement = screen.getByTestId('columns');
    expect(kanbanColumnsElement).toBeInTheDocument();
});

test('renders three KanbanColumn components', () => {
    render(<KanbanColumns />);
    
    // Assert that three KanbanColumn components are rendered
    const kanbanColumnElements = screen.getAllByTestId('kanban-column');
    expect(kanbanColumnElements.length).toBe(3);
});

test('renders correct titles for KanbanColumn components', () => {
    render(<KanbanColumns />);
    const kanbanColumnElements = screen.getAllByTestId('kanban-column');
    expect(kanbanColumnElements[0]).toHaveTextContent('To do');
    expect(kanbanColumnElements[1]).toHaveTextContent('In progress');
    expect(kanbanColumnElements[2]).toHaveTextContent('Done');
});