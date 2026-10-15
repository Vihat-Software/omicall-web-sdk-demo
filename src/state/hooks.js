import { useContext, useMemo } from 'react';

import { getByPath } from '../lib/pathUtils';

import { StateContext, DispatchContext } from './contexts';

export function useDemoState() {
    const ctx = useContext(StateContext);
    if (!ctx) throw new Error('useDemoState must be used within DemoStoreProvider');
    return ctx;
}

export function useDemoDispatch() {
    const ctx = useContext(DispatchContext);
    if (!ctx) throw new Error('useDemoDispatch must be used within DemoStoreProvider');
    return ctx;
}

/** Two-way binding helper for a dot-path field in the store, e.g. useField('options.v3.init.lng'). */
export function useField(path) {
    const state = useDemoState();
    const dispatch = useDemoDispatch();
    const value = getByPath(state, path);
    return useMemo(
        () => [value, (next) => dispatch({ type: 'SET_FIELD', path, value: next })],
        [value, path, dispatch],
    );
}

export function logEntry(level, message) {
    return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, level, message, time: new Date() };
}
