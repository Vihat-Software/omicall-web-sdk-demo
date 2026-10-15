import { Circle, CircleCheck, Loader2, TriangleAlert } from 'lucide-react';

import { useAutoLoadSdk } from '../../lib/useAutoLoadSdk';
import { DEFAULT_VERSION } from '../../state/defaultOptions';
import { useDemoDispatch, useDemoState } from '../../state/hooks';
import { PasswordField } from '../ui/PasswordField';
import { SectionCard } from '../ui/SectionCard';
import { SelectField } from '../ui/SelectField';
import { StatusChip } from '../ui/StatusChip';
import { TextInputField } from '../ui/TextInputField';

const SOURCE_ITEMS = [
    { id: 'v3', label: 'v3' },
    { id: 'v2', label: 'v2' },
];
const ENV_ITEMS = [
    { id: 'prod', label: 'prod' },
    { id: 'dev', label: 'dev' },
];

const SCRIPT_STATUS_MAP = {
    idle: { label: 'Not loaded', tone: 'neutral', icon: <Circle size={14} /> },
    loading: { label: 'Loading…', tone: 'info', icon: <Loader2 size={14} className='animate-spin' /> },
    loaded: { label: 'Loaded', tone: 'success', icon: <CircleCheck size={14} /> },
    error: { label: 'Failed', tone: 'danger', icon: <TriangleAlert size={14} /> },
};

export function ConnectionColumn() {
    const state = useDemoState();
    const dispatch = useDemoDispatch();
    const { sdkSource, sdkEnv, sdkVersion, sipRealm, sipUser, sipPassword, scriptStatus } = state;

    useAutoLoadSdk();

    const set = (path) => (value) => dispatch({ type: 'SET_FIELD', path, value });
    const setLoadTarget = (path) => (value) => dispatch({ type: 'SET_LOAD_TARGET_FIELD', path, value });
    const scriptInfo = SCRIPT_STATUS_MAP[scriptStatus] || SCRIPT_STATUS_MAP.idle;

    return (
        <SectionCard
            name='ConnectionColumn'
            title='SDK & SIP User'
            description='Load target, and the identity to register with'
        >
            <div className='flex flex-col gap-4'>
                <SelectField
                    name='sdkSource'
                    label='SDK source'
                    items={SOURCE_ITEMS}
                    value={sdkSource}
                    onChange={(value) => dispatch({ type: 'SET_SDK_SOURCE', value })}
                />

                {sdkSource === 'v2' && (
                    <SelectField
                        name='sdkEnv'
                        label='Environment'
                        items={ENV_ITEMS}
                        value={sdkEnv}
                        onChange={setLoadTarget('sdkEnv')}
                    />
                )}

                <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-semibold tracking-wide text-slate-500 uppercase'>
                            SDK version *
                        </span>
                        <StatusChip
                            label={scriptInfo.label}
                            tone={scriptInfo.tone}
                            icon={scriptInfo.icon}
                        />
                    </div>
                    <TextInputField
                        name='sdkVersion'
                        value={sdkVersion}
                        onChange={setLoadTarget('sdkVersion')}
                        placeholder={sdkSource === 'v3' ? `e.g. ${DEFAULT_VERSION.v3}` : 'e.g. 2.0.0'}
                    />
                </div>

                <hr className='border-slate-100' />

                <TextInputField
                    name='sipRealm'
                    label='SIP Realm'
                    required
                    value={sipRealm}
                    onChange={set('sipRealm')}
                    placeholder='e.g. example'
                />
                <TextInputField
                    name='sipUser'
                    label='SIP User'
                    required
                    value={sipUser}
                    onChange={set('sipUser')}
                    placeholder='e.g. 100'
                />
                <PasswordField
                    name='sipPassword'
                    label='SIP Password'
                    required
                    value={sipPassword}
                    onChange={set('sipPassword')}
                    placeholder='••••••••'
                />
            </div>
        </SectionCard>
    );
}
