const SYNCED_KEYS = ['sdkSource', 'sdkEnv', 'sdkVersion', 'sipRealm', 'sipUser', 'sipPassword', 'phoneNumber'];

export function readUrlParams() {
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    return Object.fromEntries(SYNCED_KEYS.filter((key) => key in params).map((key) => [key, params[key]]));
}

export function writeUrlParams(state) {
    const params = new URLSearchParams(window.location.search);
    SYNCED_KEYS.forEach((key) => {
        const value = state[key];
        if (value === undefined || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
    });
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
}
