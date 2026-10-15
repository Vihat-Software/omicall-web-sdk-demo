import { useSdkActions } from '../../lib/useSdkActions';
import { useDemoState } from '../../state/hooks';
import { ActionButton } from '../ui/ActionButton';

export function ActionToolbar() {
    const state = useDemoState();
    const actions = useSdkActions();
    const { sdkVersion, sipRealm, sipUser, sipPassword, sdkStatus, registerStatus } = state;

    const hasSipIdentity = Boolean(sdkVersion.trim() && sipRealm.trim() && sipUser.trim() && sipPassword.trim());
    const canInit = hasSipIdentity && sdkStatus !== 'ready' && sdkStatus !== 'initializing';
    const canRegister = sdkStatus === 'ready' && registerStatus !== 'registered' && registerStatus !== 'registering';
    const canUnregister = registerStatus === 'registered';

    return (
        <div
            data-name='ActionToolbar'
            className='panel-toolbar shadow-panel mx-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4'
        >
            <ActionButton
                tone='brand'
                onClick={actions.init}
                isDisabled={!canInit}
                isPending={sdkStatus === 'initializing'}
            >
                {sdkStatus === 'initializing' ? 'Initializing…' : '① Init SDK'}
            </ActionButton>
            <ActionButton
                tone='success'
                onClick={actions.register}
                isDisabled={!canRegister}
                isPending={registerStatus === 'registering'}
            >
                {registerStatus === 'registering' ? 'Registering…' : '② Register'}
            </ActionButton>
            <ActionButton
                tone='danger'
                onClick={actions.unregister}
                isDisabled={!canUnregister}
            >
                Unregister
            </ActionButton>
            {!hasSipIdentity && (
                <p className='flex items-center px-2 text-xs text-slate-400'>
                    Fill in SDK version, SIP realm, user &amp; password to unlock Init.
                </p>
            )}
        </div>
    );
}
