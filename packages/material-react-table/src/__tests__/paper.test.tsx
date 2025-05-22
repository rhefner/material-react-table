import { describe, it, expect } from 'vitest';
import Paper from '../custom/Paper';
import { render } from '@testing-library/react';
import React from 'react';

describe('Paper wrapper', () => {
  it('renders without crashing', () => {
    const { container } = render(<Paper data-testid="paper" />);
    expect(container.querySelector('[data-testid="paper"]')).not.toBeNull();
  });
});
