import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { set } from 'mobx';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/GitHub Issues Kanban Viewer/i);
  expect(linkElement[0]).toBeInTheDocument();
});