import { Chip } from '@heroui/react';

const COLOR_BY_TONE = {
    neutral: 'default',
    info: 'accent',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
};

export function StatusChip({ label, tone = 'neutral', icon }) {
    return (
        <Chip
            data-name='StatusChip'
            color={COLOR_BY_TONE[tone] || 'default'}
            variant='soft'
        >
            {icon && <span className='mr-1'>{icon}</span>}
            <Chip.Label>{label}</Chip.Label>
        </Chip>
    );
}
