import { describe, it, expect } from 'vitest';
import CloseIcon from '@mui/icons-material/Close';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';

describe('Icon alias', () => {
  it('renders Close icon', () => {
    const { container } = render(<CloseIcon data-testid="icon" />);
    expect(container.querySelector('[data-testid="icon"]')).not.toBeNull();
  });
});
