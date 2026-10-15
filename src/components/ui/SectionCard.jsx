import { Card } from '@heroui/react';

export function SectionCard({ title, description, actions, children, name = 'SectionCard' }) {
    return (
        <Card
            data-name={name}
            className='flex h-full flex-col'
        >
            <Card.Header className='flex-row items-center justify-between gap-2'>
                <div>
                    <Card.Title>{title}</Card.Title>
                    {description && <Card.Description>{description}</Card.Description>}
                </div>
                {actions}
            </Card.Header>
            <Card.Content className='flex-1 overflow-y-auto p-1'>{children}</Card.Content>
        </Card>
    );
}
