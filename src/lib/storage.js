const STORAGE_KEY = 'omicall-sdk-demo-configs';

export function loadPersistedState() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function savePersistedState(state) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        /* storage unavailable (private mode, quota, ...) — non-fatal for a demo tool */
    }
}
