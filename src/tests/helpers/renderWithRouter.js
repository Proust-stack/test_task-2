import { MemoryRouter} from 'react-router-dom';
import { Footer } from '../../components/footer/Footer';
import { TodoList } from '../../components/todoList/TodoList';
import { TodosPage } from '../../pages/TodosPage';
import {render} from '@testing-library/react';
import { TodoForm } from '../../components/todoForm/TodoForm';

export const initialTodos = [
  { title: 'Тестовое задание', id: 123, completed: false },
  { title: 'Прекрасный код', id: 1256, completed: true },
  { title: 'Покрытие тестами', id: 58965, completed: false },
];

let filteredTodos;
const onRemove = jest.fn(
  () => (filteredTodos = initialTodos.filter((todo) => !todo.completed))
);
const toggleHandler = jest.fn(
  () => (filteredTodos = initialTodos.filter((todo) => todo.completed))
);
const filterHandler = jest.fn(
  () => (filteredTodos = initialTodos.filter((todo) => !todo.completed))
);

const onAdd = jest.fn();
const onToggle = jest.fn();

export const renderWithRouter = (initialRouter = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRouter]}>
      <TodosPage>
        <TodoList todos={filteredTodos} onToggle={toggleHandler} />
        <Footer
          todosQuantity={3}
          filterHandler={filterHandler}
          onRemove={onRemove}
        />
      </TodosPage>
    </MemoryRouter>
  );
};
export const renderFooterWithRouter = () => {
  return render(
    <MemoryRouter>
        <Footer
          todosQuantity={3}
          filterHandler={filterHandler}
          onRemove={onRemove}
        />
    </MemoryRouter>
  );
};
export const renderTodoForm = (fn) => {
  return render(
    <TodoForm
          onAdd={onAdd}
          value={''}
          onChange={fn}
        />
  );
};
export const renderTodoList = () => {
  return render(
    <TodoList
          todos={initialTodos}
          onToggle={onToggle}
        />
  );
};
