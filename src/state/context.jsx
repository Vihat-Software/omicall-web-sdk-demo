import { useEffect, useReducer } from 'react';

import { setByPath } from '../lib/pathUtils';
import { loadPersistedState, savePersistedState } from '../lib/storage';
import { readUrlOptions, readUrlParams, writeUrlParams } from '../lib/urlParams';

import { DispatchContext, StateContext } from './contexts';
import { createDefaultOptions, DEFAULT_VERSION } from './defaultOptions';

function mergeOptions(base, overrides) {
    return Object.fromEntries(
        Object.entries(base).map(([version, groups]) => [
            version,
            Object.fromEntries(
                Object.entries(groups).map(([group, values]) => [group, { ...values, ...overrides[version]?.[group] }])
            ),
        ])
    );
}

function createInitialState() {
    const persisted = loadPersistedState() || {};
    const urlParams = readUrlParams();
    const sdkSource = urlParams.sdkSource || persisted.sdkSource || 'v3';
    return {
        sdkSource,
        sdkEnv: urlParams.sdkEnv || persisted.sdkEnv || 'prod',
        sdkVersion: urlParams.sdkVersion || persisted.sdkVersion || DEFAULT_VERSION[sdkSource],
        sipRealm: urlParams.sipRealm ?? persisted.sipRealm ?? '',
        sipUser: urlParams.sipUser ?? persisted.sipUser ?? '',
        sipPassword: urlParams.sipPassword ?? persisted.sipPassword ?? '',
        phoneNumber: urlParams.phoneNumber ?? persisted.phoneNumber ?? '',
        optionsTab: urlParams.optionsTab || 'init', // init | register
        scriptStatus: 'idle', // idle | loading | loaded | error
        sdkStatus: 'idle', // idle | initializing | ready | error
        registerStatus: 'idle', // idle | registering | registered | error
        registerMessage: '',
        busy: false,
        logs: [],
        options: mergeOptions({ ...createDefaultOptions(), ...persisted.options }, readUrlOptions()),
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return setByPath(state, action.path, action.value);
        case 'SET_SDK_SOURCE':
            return {
                ...state,
                sdkSource: action.value,
                sdkVersion: DEFAULT_VERSION[action.value],
                scriptStatus: 'idle',
                sdkStatus: 'idle',
                registerStatus: 'idle',
                registerMessage: '',
                busy: false,
            };
        // Changing the load target while a session is live invalidates that session — reset so Init unlocks again.
        case 'SET_LOAD_TARGET_FIELD':
            return {
                ...setByPath(state, action.path, action.value),
                scriptStatus: 'idle',
                sdkStatus: 'idle',
                registerStatus: 'idle',
                registerMessage: '',
                busy: false,
            };
        case 'SET_STATUS':
            return { ...state, ...action.value };
        case 'SET_BUSY':
            return { ...state, busy: action.value };
        case 'ADD_LOG':
            return { ...state, logs: [action.entry, ...state.logs].slice(0, 100) };
        case 'CLEAR_LOGS':
            return { ...state, logs: [] };
        case 'RESET_OPTIONS':
            return { ...state, options: createDefaultOptions() };
        default:
            return state;
    }
}

export function DemoStoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

    useEffect(() => {
        writeUrlParams(state);
        savePersistedState({
            sdkSource: state.sdkSource,
            sdkEnv: state.sdkEnv,
            sdkVersion: state.sdkVersion,
            sipRealm: state.sipRealm,
            sipUser: state.sipUser,
            sipPassword: state.sipPassword,
            phoneNumber: state.phoneNumber,
            options: state.options,
        });
    }, [state]);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
}
