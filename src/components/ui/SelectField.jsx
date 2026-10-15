import { Label, ListBox, Select } from '@heroui/react';

export function SelectField({ name, label, value, onChange, items, disabled }) {
    return (
        <div
            data-name='SelectField'
            className='flex flex-col gap-1'
        >
            <Select
                className='w-full'
                value={value ?? null}
                onChange={(next) => onChange?.(next)}
                isDisabled={disabled}
            >
                {label && <Label htmlFor={name}>{label}</Label>}
                <Select.Trigger id={name}>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        {items.map((item) => (
                            <ListBox.Item
                                key={item.id}
                                id={item.id}
                                textValue={item.label}
                            >
                                {item.label}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
}
