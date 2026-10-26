import { Circle, Phone, Video } from 'lucide-react';

import { canVideoCall } from '../../lib/callUtils';
import { useSdkActions } from '../../lib/useSdkActions';
import { useDemoDispatch, useDemoState } from '../../state/hooks';
import { ActionButton } from '../ui/ActionButton';
import { EventLogPanel } from '../ui/EventLogPanel';
import { SectionCard } from '../ui/SectionCard';
import { StatusChip } from '../ui/StatusChip';
import { TextInputField } from '../ui/TextInputField';

export function CallColumn() {
    const state = useDemoState();
    const dispatch = useDemoDispatch();
    const actions = useSdkActions();
    const { sdkSource, phoneNumber, registerStatus, busy, logs } = state;

    const isRegistered = registerStatus === 'registered';
    const isV2 = sdkSource === 'v2';
    const canCall = isRegistered && !!phoneNumber.trim();
    const canVideo = canCall && canVideoCall(phoneNumber);

    return (
        <SectionCard
            name='CallColumn'
            title='Click-to-Call'
            description={isRegistered ? 'Registered — ready to place a call' : 'Register first to unlock calling'}
            actions={
                <StatusChip
                    label={busy ? 'Busy / DND' : 'Available'}
                    tone={busy ? 'warning' : 'success'}
                    icon={
                        <Circle
                            size={10}
                            className={busy ? 'fill-amber-500 text-amber-500' : 'fill-emerald-500 text-emerald-500'}
                        />
                    }
                />
            }
        >
            <div className='flex flex-1 flex-col gap-4'>
                <TextInputField
                    name='phoneNumber'
                    label='Phone number'
                    value={phoneNumber}
                    onChange={(value) => dispatch({ type: 'SET_FIELD', path: 'phoneNumber', value })}
                    placeholder='e.g. 0000000000'
                    disabled={!isRegistered}
                    onEnter={() => canCall && actions.makeCall()}
                />

                <div className='flex flex-wrap gap-2'>
                    <ActionButton
                        tone='info'
                        onClick={() => actions.makeCall()}
                        isDisabled={!canCall}
                        className='flex-1 items-center gap-2'
                    >
                        <Phone size={16} />
                        Click to call
                    </ActionButton>
                    {!isV2 && (
                        <ActionButton
                            tone='success'
                            onClick={() => actions.makeCall({ isVideo: true })}
                            isDisabled={!canVideo}
                            className='flex-1 items-center gap-2'
                        >
                            <Video size={16} />
                            Video call
                        </ActionButton>
                    )}
                    {isV2 && (
                        <ActionButton
                            tone={busy ? 'success' : 'warning'}
                            onClick={actions.toggleBusy}
                            isDisabled={!isRegistered}
                        >
                            {busy ? 'Set available' : 'Set busy'}
                        </ActionButton>
                    )}
                </div>

                <div className='flex flex-1 flex-col'>
                    <div className='mb-1.5 flex items-center justify-between'>
                        <span className='text-xs font-semibold tracking-wide text-slate-500 uppercase'>Event log</span>
                        {logs.length > 0 && (
                            <button
                                type='button'
                                onClick={() => dispatch({ type: 'CLEAR_LOGS' })}
                                className='text-xs text-slate-400 hover:text-slate-600'
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <EventLogPanel logs={logs} />
                </div>
            </div>
        </SectionCard>
    );
}
