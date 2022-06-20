import React, { useRef } from 'react';
import './todoForm.css';

interface TodoFormProps {
    onAdd(title: string ): void;
    value: string;
    onChange: (value: string) => void;
}   

export const TodoForm: React.FC<TodoFormProps> = ({onAdd, value, onChange}) => {
    const ref = useRef<HTMLInputElement>(null)
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAdd(ref.current!.value);
            ref.current!.value = ''
        }
    }
    return (
        <div className="input-field mt2">
            <input 
            ref={ref}
            type="text" 
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            data-testid="addTodo_input" 
            placeholder="enter task and press enter"
            onKeyPress={keyPressHandler}
            />
        </div>
    );
};

