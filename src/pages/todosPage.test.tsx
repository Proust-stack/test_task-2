import { cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../tests/helpers/renderWithRouter';

describe('TodosPage', () => {
  afterEach(cleanup);
  it('page snapshot', () => {
    const view = renderWithRouter();
    expect(view).toMatchSnapshot();
  });

  it('TodosPage renders header todos', () => {
    const { getByText } = renderWithRouter();
    expect(getByText(/Todos/i)).toBeInTheDocument();
  });
  it('user can type in input', () => {
    renderWithRouter();
    expect(screen.queryByDisplayValue(/React/)).toBeNull();
    userEvent.type(screen.getByRole('textbox'), 'React');
    expect(screen.queryByDisplayValue(/React/)).toBeInTheDocument();
  });
  it('todo is added after sumbiting', () => {
    renderWithRouter();
    userEvent.type(screen.getByRole('textbox'), 'React');
    fireEvent.submit(screen.getByRole('textbox'));
    expect(screen.queryByDisplayValue(/React/)).toBeInTheDocument();
  });
  describe('filters checking', () => {
    afterEach(cleanup);
    it('all todos present at the first render', () => {
      renderWithRouter();
      expect(screen.getByText(/Тестовое задание/i)).toBeInTheDocument();
      expect(screen.getByText(/Прекрасный код/i)).toBeInTheDocument();
      expect(screen.getByText(/Покрытие тестами/i)).toBeInTheDocument();
    });

    it('active button is pushed and active todos stay only', () => {
      const {getByTestId, queryByText, getByText} = renderWithRouter();
      const activeBtn = getByTestId('active_btn');
      fireEvent.click(activeBtn);
      expect(queryByText(/Прекрасный код/i)).toBeNull();
      expect(getByText(/Тестовое задание/i)).toBeInTheDocument();
      expect(getByText(/Покрытие тестами/i)).toBeInTheDocument();
    });
    it('completed button is pushed and completed todo stays only', () => {
      renderWithRouter();
      const completedBtn = screen.getByTestId('completed_btn');
      fireEvent.click(completedBtn);
      expect(screen.queryByText(/Тестовое задание/i)).toBeNull();
      expect(screen.queryByText(/Прекрасный код/i)).toBeInTheDocument();
      expect(screen.queryByText(/Покрытие тестами/i)).toBeNull();
    });
  });
  describe('clear completed checking', () => {
    afterEach(cleanup);
    it('clear button is pushed and active todos stay only', () => {
      renderWithRouter();
      const clearBtn = screen.getByTestId('clear_btn');
      fireEvent.click(clearBtn);
      expect(screen.getByText(/Тестовое задание/i)).toBeInTheDocument();
      expect(screen.getByText(/Покрытие тестами/i)).toBeInTheDocument();
      expect(screen.queryByText(/Прекрасный код/i)).toBeNull();
    });
  });
});
