import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderTodoForm } from '../../tests/helpers/renderWithRouter';

const onChange = jest.fn();

describe('TodoForm component', () => {
  afterEach(cleanup);
  it('TodoForm snapshot', () => {
    const view = renderTodoForm();
    expect(view).toMatchSnapshot();
  });
 
  it('input exists', () => {
    renderTodoForm();
    const input = screen.getByPlaceholderText(/enter task and press enter/);
    expect(input).toBeInTheDocument();
  });

  it('onChange works', () => {
    renderTodoForm(onChange);
    const input = screen.getByPlaceholderText(/enter task and press enter/);
    userEvent.type(input, 'React');
    expect(onChange).toHaveBeenCalledTimes(5)
  });
});
