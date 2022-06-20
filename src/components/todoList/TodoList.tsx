import React, { useState } from 'react';
import { ITodo } from '../../interfaces';
import './todoList.css';

interface TodolistProps {
  todos: ITodo[];
  onToggle(id: number): void;
}

export const TodoList: React.FC<TodolistProps> = ({ todos, onToggle }) => {
  const [isOpend, setIsOpend] = useState(true);
  const divClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpend(prev => !prev);
  };
  return (
    <div className="todo_wrapper">
      <div className="header" onClick={divClickedHandler}>
        <span className="header_title">
          What needs to be done
          <div style={{ transform: isOpend ? ' rotate(180deg)' : '' }}></div>
        </span>
      </div>
      {todos.length === 0 && <div className="center">no tasks...</div>}
      <div>
        {isOpend &&
          todos.map((todo) => {
            const classes = ['todo'];
            if (todo.completed) {
              classes.push('completed');
            }
            return (
              <div className={classes.join(' ')} key={todo.id}>
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={onToggle.bind(null, todo.id)}
                  />
                  <svg
                    className={`checkbox ${
                      todo.completed ? 'checkbox--active' : ''
                    }`}
                    aria-hidden="true"
                    viewBox="0 0 15 11"
                    fill="none"
                  >
                    <path
                      d="M1 4.5L5 9L14 1"
                      strokeWidth="1"
                      stroke={todo.completed ? 'green' : 'none'}
                    />
                  </svg>
                  <span>{todo.title}</span>
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};
