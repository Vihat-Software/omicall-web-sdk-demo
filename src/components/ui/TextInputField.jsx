import { Input, Label } from '@heroui/react';

export function TextInputField({ name, label, value, onChange, placeholder, type = 'text', required, disabled, hint, onEnter }) {
    return (
        <div
            data-name='TextInputField'
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
            <Input
                id={name}
                name={name}
                type={type}
                fullWidth
                value={value ?? ''}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(event) => onChange?.(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                        onEnter?.(event);
                    }
                }}
            />
            {hint && <p className='text-xs text-slate-400'>{hint}</p>}
        </div>
    );
}
