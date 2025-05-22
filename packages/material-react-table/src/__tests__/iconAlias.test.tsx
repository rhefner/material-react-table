import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

describe('MUI icon alias', () => {
  it('renders aliased icon', () => {
    const { container } = render(<CloseIcon data-testid="icon" />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
