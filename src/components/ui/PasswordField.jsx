import { Input, Label } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function PasswordField({ name, label, value, onChange, placeholder, required, disabled }) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            data-name='PasswordField'
            className='flex flex-col gap-1'
        >
            {label && (
                <Label
                    htmlFor={name}
                    isRequired={required}
                >
                    {label}
                </Label>
            )}
            <div className='relative'>
                <Input
                    id={name}
                    name={name}
                    type={visible ? 'text' : 'password'}
                    fullWidth
                    value={value ?? ''}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(event) => onChange?.(event.target.value)}
                    className='pr-10'
                />
                <button
                    type='button'
                    onClick={() => setVisible((v) => !v)}
                    className='absolute inset-y-0 right-2 flex items-center text-sm text-slate-400 hover:text-slate-600'
                    tabIndex={-1}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                >
                    {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );
}
