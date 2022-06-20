import { cleanup, screen } from '@testing-library/react';
import { renderFooterWithRouter } from '../../tests/helpers/renderWithRouter';

describe('Footer component', () => {
  afterEach(cleanup);
  it('Footer snapshot', () => {
    const view = renderFooterWithRouter()
    expect(view).toMatchSnapshot();
  });

  it('items field exist and quantity equals 3', () => {
    renderFooterWithRouter();
    expect(screen.getByText(/3 items left/i)).toBeInTheDocument();
  });

  it('buttons exist', () => {
    renderFooterWithRouter();
    const btns = screen.getAllByRole('button');
    btns.forEach(btn => {
      expect(btn).toBeInTheDocument();
    });
    expect(btns).toMatchSnapshot();
  });
});
