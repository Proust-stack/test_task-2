import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';

interface TodolistProps {
  todosQuantity: number;
  filterHandler: (status?: boolean) => void;
  onRemove: () => void;
}

export const Footer: React.FC<TodolistProps> = ({
  todosQuantity,
  filterHandler,
  onRemove,
}) => {
  return (
    <div className="footer_container">
      <div className="footer_items">{todosQuantity} items left</div>
      <div className="footer_filter filter">
        <NavLink to="/" exact activeClassName="selected" data-testid="all-link">
          <button
            data-testid="all_btn"
            className="filter_all"
            onClick={() => filterHandler()}
          >
            All
          </button>
        </NavLink>
        <NavLink to="/active" activeClassName="selected" data-testid="active-link">
          <button
            data-testid="active_btn"
            className="filter_active"
            onClick={() => filterHandler(false)}
          >
            Active
          </button>
        </NavLink>
        <NavLink to="/completed" activeClassName="selected"  data-testid="completed-link">
          <button
            data-testid="completed_btn"
            className="filter_completed"
            onClick={() => filterHandler(true)}
          >
            Completed
          </button>
        </NavLink>
      </div>
      <button
        data-testid="clear_btn"
        className="footer_clear"
        onClick={onRemove}
      >
        Clear completed
      </button>
    </div>
  );
};
