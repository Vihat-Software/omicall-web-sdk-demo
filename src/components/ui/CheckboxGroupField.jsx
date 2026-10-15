import { Checkbox, Label } from '@heroui/react';

export function CheckboxGroupField({ name, label, items, value, onChange, disabled }) {
    const selected = value || [];

    const toggle = (item) => {
        const next = selected.includes(item) ? selected.filter((i) => i !== item) : [...selected, item];
        onChange?.(next);
    };

    return (
        <div
            data-name='CheckboxGroupField'
            className='flex flex-col gap-1.5'
        >
            {label && <Label>{label}</Label>}
            <div className='flex flex-wrap gap-x-4 gap-y-2'>
                {items.map((item) => (
                    <div
                        key={item}
                        className='flex items-center gap-1.5'
                    >
                        <Checkbox
                            id={`${name}-${item}`}
                            isSelected={selected.includes(item)}
                            onChange={() => toggle(item)}
                            isDisabled={disabled}
                        >
                            <Checkbox.Content>
                                <Checkbox.Control>
                                    <Checkbox.Indicator />
                                </Checkbox.Control>
                            </Checkbox.Content>
                        </Checkbox>
                        <Label
                            htmlFor={`${name}-${item}`}
                            className='text-xs font-normal tracking-normal text-slate-600 normal-case'
                        >
                            {item}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
