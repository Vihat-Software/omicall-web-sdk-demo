import { toast } from '@heroui/react';

import { useDemoDispatch, useDemoState, logEntry } from '../state/hooks';

import { getAdapter } from './adapters';

export function useSdkActions() {
    const state = useDemoState();
    const dispatch = useDemoDispatch();
    const adapter = getAdapter(state.sdkSource);

    const log = (level, message) => dispatch({ type: 'ADD_LOG', entry: logEntry(level, message) });

    return {
        async init() {
            dispatch({ type: 'SET_STATUS', value: { scriptStatus: 'loading', sdkStatus: 'initializing' } });
            try {
                await adapter.loadSdk({ version: state.sdkVersion, env: state.sdkEnv });
                dispatch({ type: 'SET_STATUS', value: { scriptStatus: 'loaded' } });
                log('info', `SDK script loaded (${state.sdkSource} ${adapter.getVersion?.() || state.sdkVersion})`);

                adapter.onEvent('register', ({ status, desc }) => {
                    dispatch({
                        type: 'SET_STATUS',
                        value: {
                            registerStatus: status ? 'registered' : 'idle',
                            registerMessage: desc || '',
                        },
                    });
                    log(
                        status ? 'success' : 'warning',
                        `register event: ${status ? 'registered' : 'unregistered'}${desc ? ` (${desc})` : ''}`,
                    );
                });
                ['invite', 'accepted', 'ended', 'inviteRejected'].forEach((name) => {
                    adapter.onEvent(name, () => log('info', `event: ${name}`));
                });

                const initOptions = state.options[state.sdkSource].init;
                await adapter.init(initOptions);
                dispatch({ type: 'SET_STATUS', value: { sdkStatus: 'ready' } });
                log('success', 'SDK initialized');
                toast.success('SDK initialized');
            } catch (error) {
                dispatch({ type: 'SET_STATUS', value: { scriptStatus: 'error', sdkStatus: 'error' } });
                log('error', `init failed: ${error.message || error}`);
                toast.danger(error.message || 'Failed to initialize SDK');
            }
        },

        async register() {
            dispatch({ type: 'SET_STATUS', value: { registerStatus: 'registering' } });
            try {
                const extra = state.sdkSource === 'v3' ? state.options.v3.register : {};
                const result = await adapter.register({
                    sipRealm: state.sipRealm,
                    sipUser: state.sipUser,
                    sipPassword: state.sipPassword,
                    ...extra,
                });
                if (!result?.status) {
                    throw new Error(result?.message || result?.error || 'Register failed');
                }
                dispatch({
                    type: 'SET_STATUS',
                    value: { registerStatus: 'registered', registerMessage: result.message || '' },
                });
                log('success', `Registered as ${state.sipUser}@${state.sipRealm}`);
                toast.success('Registered successfully');
            } catch (error) {
                dispatch({ type: 'SET_STATUS', value: { registerStatus: 'error', registerMessage: error.message } });
                log('error', `register failed: ${error.message || error}`);
                toast.danger(error.message || 'Failed to register');
            }
        },

        unregister() {
            try {
                adapter.unregister();
                dispatch({ type: 'SET_STATUS', value: { registerStatus: 'idle', registerMessage: '' } });
                dispatch({ type: 'SET_BUSY', value: false });
                log('info', 'Unregistered');
                toast('Unregistered');
            } catch (error) {
                log('error', `unregister failed: ${error.message || error}`);
                toast.danger(error.message || 'Failed to unregister');
            }
        },

        toggleBusy() {
            try {
                const next = !state.busy;
                const applied = adapter.setBusy(next);
                dispatch({ type: 'SET_BUSY', value: applied });
                log('info', `Busy status: ${applied}`);
                toast(applied ? 'Busy / DND enabled' : 'Busy / DND disabled', {
                    variant: applied ? 'warning' : 'success',
                });
            } catch (error) {
                log('error', `toggle busy failed: ${error.message || error}`);
                toast.danger(error.message || 'Failed to toggle busy status');
            }
        },

        async makeCall() {
            try {
                await adapter.makeCall(state.phoneNumber);
                log('info', `Calling ${state.phoneNumber}...`);
            } catch (error) {
                log('error', `makeCall failed: ${error.message || error}`);
                toast.danger(error.message || 'Failed to place call');
            }
        },
    };
}
