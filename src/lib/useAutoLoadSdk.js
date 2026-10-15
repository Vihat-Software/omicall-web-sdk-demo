import { useEffect } from 'react';

import { useDemoDispatch, useDemoState, logEntry } from '../state/hooks';

import { getAdapter } from './adapters';

const LOAD_DEBOUNCE_MS = 500;

/** Fetches the SDK script for the selected source/version/env as soon as it's chosen — before Init is ever pressed. */
export function useAutoLoadSdk() {
    const { sdkSource, sdkVersion, sdkEnv, sdkStatus } = useDemoState();
    const dispatch = useDemoDispatch();

    useEffect(() => {
        const version = sdkVersion.trim();
        if (!version || sdkStatus === 'ready' || sdkStatus === 'initializing') return undefined;

        const adapter = getAdapter(sdkSource);
        let cancelled = false;
        dispatch({ type: 'SET_STATUS', value: { scriptStatus: 'loading' } });

        const timer = setTimeout(async () => {
            try {
                await adapter.loadSdk({ version, env: sdkEnv });
                if (cancelled) return;
                dispatch({ type: 'SET_STATUS', value: { scriptStatus: 'loaded' } });
                dispatch({
                    type: 'ADD_LOG',
                    entry: logEntry('info', `SDK script loaded (${sdkSource} ${adapter.getVersion?.() || version})`),
                });
            } catch (error) {
                if (cancelled) return;
                dispatch({ type: 'SET_STATUS', value: { scriptStatus: 'error' } });
                dispatch({
                    type: 'ADD_LOG',
                    entry: logEntry('error', `script load failed: ${error.message || error}`),
                });
            }
        }, LOAD_DEBOUNCE_MS);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [sdkSource, sdkVersion, sdkEnv, sdkStatus, dispatch]);
}
