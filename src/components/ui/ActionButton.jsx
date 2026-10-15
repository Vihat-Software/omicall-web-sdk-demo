import { Button } from '@heroui/react';

const TONE_CLASSES = {
    brand: 'bg-brand-700 hover:bg-brand-600 text-white',
    success: 'bg-emerald-500 hover:bg-emerald-400 text-white',
    danger: 'bg-rose-500 hover:bg-rose-400 text-white',
    warning: 'bg-amber-500 hover:bg-amber-400 text-white',
    info: 'bg-sky-500 hover:bg-sky-400 text-white',
};

export function ActionButton({ tone = 'brand', children, className = '', onClick, isDisabled, disabled, ...rest }) {
    return (
        <Button
            data-name='ActionButton'
            variant='primary'
            isDisabled={isDisabled ?? disabled}
            onPress={onClick}
            className={`${TONE_CLASSES[tone] || TONE_CLASSES.brand} ${className}`}
            {...rest}
        >
            {children}
        </Button>
    );
}
