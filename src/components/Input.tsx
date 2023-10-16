import {ChangeEvent} from "react";

type InputProps = {
    type: 'text' | 'number' | 'email' | 'password'
    inputMode?: 'text' | 'numeric'
    value: string | number
    name: string
    placeholder: string
    error: boolean
    disabled?: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Input({type, value, name, placeholder, error, disabled, onChange, inputMode}: InputProps) {

    return (
        <input
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            inputMode={inputMode}
            className={error ? 'text-rose-200' : undefined}
        />
    )

}