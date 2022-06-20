import React, { useEffect, useState } from 'react';
import { Footer } from '../components/footer/Footer';
import { TodoForm } from '../components/todoForm/TodoForm';
import { TodoList } from '../components/todoList/TodoList';
import { ITodo } from '../interfaces';
import './todoPage.css';

export const TodosPage: React.FC = () => {
  const initialTodos = [
    {title: 'Тестовое задание', id: 123, completed: false}, 
    {title: 'Прекрасный код', id: 1256, completed: true}, 
    {title: 'Покрытие тестами', id: 58965, completed: false}, 
    ];
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || JSON.stringify(initialTodos)) as ITodo[];
    setTodos(saved);
    filterHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    filterHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title,
      id: Date.now(),
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('')
  };

  const toggleHandler = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }
  const removeHandler = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }
  const inputHandler = (value: string) => {
    setInputValue(value)
  }

  const filterHandler = (status?: boolean) => {
    if (typeof status === 'undefined') {
      setFilteredTodos([...todos]);
    } else {
      setFilteredTodos([...todos.filter((todo) => todo.completed === status)]);
    }
  };

  return (
    <div className="container">
      <h1>Todos</h1>
      <div className="content">
        <TodoForm 
        onAdd={addHandler} 
        value={inputValue}
        onChange={inputHandler}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleHandler}
        />
        <Footer 
        todosQuantity={filteredTodos.length} 
        filterHandler={filterHandler} 
        onRemove={removeHandler}
        />
      </div>
    </div>
  );
};
