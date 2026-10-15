import { Label, NumberField as HeroNumberField } from '@heroui/react';

export function NumberField({ name, label, value, onChange, min, max, step, disabled, placeholder }) {
    return (
        <div
            data-name='NumberField'
            className='flex flex-col gap-1'
        >
            {label && <Label htmlFor={name}>{label}</Label>}
            <HeroNumberField
                fullWidth
                value={value === '' ? NaN : value}
                minValue={min}
                maxValue={max}
                step={step}
                isDisabled={disabled}
                onChange={(newValue) => onChange?.(Number.isNaN(newValue) ? '' : newValue)}
            >
                <HeroNumberField.Group>
                    <HeroNumberField.DecrementButton />
                    <HeroNumberField.Input
                        id={name}
                        name={name}
                        placeholder={placeholder}
                    />
                    <HeroNumberField.IncrementButton />
                </HeroNumberField.Group>
            </HeroNumberField>
        </div>
    );
}
