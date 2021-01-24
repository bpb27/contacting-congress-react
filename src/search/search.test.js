import { render, screen } from '@testing-library/react';
import Search from './search.component';

describe('Search', () => {
  it('renders', () => {
    render(<Search/>);
    expect(screen.getByText('Search component!')).toBeInTheDocument();
  });
});
