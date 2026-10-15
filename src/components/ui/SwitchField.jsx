import { Switch } from '@heroui/react';

export function SwitchField({ label, description, isSelected, onChange, isDisabled }) {
    return (
        <div
            data-name='SwitchField'
            className='flex items-start justify-between gap-3 py-1.5'
        >
            <div className='min-w-0'>
                <p className='text-sm font-medium text-slate-700'>{label}</p>
                {description && <p className='text-xs text-slate-400'>{description}</p>}
            </div>
            <Switch
                isSelected={isSelected}
                onChange={onChange}
                isDisabled={isDisabled}
            >
                <Switch.Content>
                    <Switch.Control>
                        <Switch.Thumb />
                    </Switch.Control>
                </Switch.Content>
            </Switch>
        </div>
    );
}
