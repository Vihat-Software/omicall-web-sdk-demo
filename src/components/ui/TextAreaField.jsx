import { Label, TextArea } from '@heroui/react';

export function TextAreaField({ name, label, value, onChange, placeholder, rows = 4, hint, disabled }) {
    return (
        <div
            data-name='TextAreaField'
            className='flex flex-col gap-1'
        >
            {label && <Label htmlFor={name}>{label}</Label>}
            <TextArea
                id={name}
                name={name}
                fullWidth
                rows={rows}
                value={value ?? ''}
                placeholder={placeholder}
                disabled={disabled}
                className='font-mono text-xs'
                onChange={(event) => onChange?.(event.target.value)}
            />
            {hint && <p className='text-xs text-slate-400'>{hint}</p>}
        </div>
    );
}
