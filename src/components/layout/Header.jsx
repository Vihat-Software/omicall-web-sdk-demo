import { Circle, CircleCheck, Loader2, TriangleAlert } from 'lucide-react';

import { version } from '../../../package.json';
import { useDemoState } from '../../state/hooks';
import { StatusChip } from '../ui/StatusChip';

const SDK_STATUS_MAP = {
    idle: { label: 'SDK idle', tone: 'neutral', icon: <Circle size={14} /> },
    initializing: {
        label: 'Initializing…',
        tone: 'info',
        icon: (
            <Loader2
                size={14}
                className='animate-spin'
            />
        ),
    },
    ready: { label: 'SDK ready', tone: 'success', icon: <CircleCheck size={14} /> },
    error: { label: 'Init failed', tone: 'danger', icon: <TriangleAlert size={14} /> },
};

const REGISTER_STATUS_MAP = {
    idle: { label: 'Unregistered', tone: 'neutral', icon: <Circle size={14} /> },
    registering: {
        label: 'Registering…',
        tone: 'info',
        icon: (
            <Loader2
                size={14}
                className='animate-spin'
            />
        ),
    },
    registered: { label: 'Registered', tone: 'success', icon: <CircleCheck size={14} /> },
    error: { label: 'Register failed', tone: 'danger', icon: <TriangleAlert size={14} /> },
};

export function Header() {
    const { sdkSource, sdkStatus, registerStatus } = useDemoState();
    const sdkInfo = SDK_STATUS_MAP[sdkStatus] || SDK_STATUS_MAP.idle;
    const registerInfo = REGISTER_STATUS_MAP[registerStatus] || REGISTER_STATUS_MAP.idle;

    return (
        <header
            data-name='Header'
            className='flex flex-wrap items-center justify-between gap-3 px-6 pt-6'
        >
            <div>
                <h1 className='text-xl font-bold text-slate-800'>
                    OMICall SDK Demo <span className='text-sm font-medium text-slate-400'>v{version}</span>
                </h1>
                <p className='text-sm text-slate-500'>
                    Exercise every <code className='rounded bg-slate-200/70 px-1 py-0.5 text-xs'>init()</code> &amp;{' '}
                    <code className='rounded bg-slate-200/70 px-1 py-0.5 text-xs'>register()</code> option for SDK{' '}
                    <span className='text-brand-700 font-semibold'>{sdkSource}</span>.
                </p>
            </div>
            <div className='flex items-center gap-2'>
                <StatusChip
                    label={sdkInfo.label}
                    tone={sdkInfo.tone}
                    icon={sdkInfo.icon}
                />
                <StatusChip
                    label={registerInfo.label}
                    tone={registerInfo.tone}
                    icon={registerInfo.icon}
                />
            </div>
        </header>
    );
}
