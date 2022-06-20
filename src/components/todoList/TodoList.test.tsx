import { cleanup, screen } from '@testing-library/react';
import { initialTodos, renderTodoList } from '../../tests/helpers/renderWithRouter';

describe('TodoList component', () => {
  afterEach(cleanup);
  it('TodoList snapshot', () => {
    const view = renderTodoList();
    expect(view).toMatchSnapshot();
  });

  it('header exists', () => {
    renderTodoList();
    expect(screen.getByText(/what/i)).toBeInTheDocument();
  });
  it('initial todo exists', () => {
    renderTodoList();
    initialTodos.forEach(el => {
      const todo = screen.getByText(el.title);
      expect(todo).toBeInTheDocument();
    });
  });

});
