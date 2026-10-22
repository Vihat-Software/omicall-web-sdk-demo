import { createDefaultOptions } from '../state/defaultOptions';

const SYNCED_KEYS = ['sdkSource', 'sdkEnv', 'sdkVersion', 'sipRealm', 'sipUser', 'sipPassword', 'phoneNumber'];

// Free-form JSON is too bulky for a URL; everything else under options.* is syncable.
const EXCLUDED_OPTION_KEYS = new Set(['advancedJson']);

const DEFAULT_OPTIONS = createDefaultOptions();

// URL key `v3.init.lng` <-> state path `options.v3.init.lng`; the default value decides how to parse it.
const OPTION_KEYS = Object.entries(DEFAULT_OPTIONS).flatMap(([version, groups]) =>
    Object.entries(groups).flatMap(([group, defaults]) =>
        Object.keys(defaults)
            .filter((key) => !EXCLUDED_OPTION_KEYS.has(key))
            .map((key) => ({ urlKey: `${version}.${group}.${key}`, version, group, key, fallback: defaults[key] }))
    )
);

function parseOptionValue(raw, fallback) {
    if (typeof fallback === 'boolean') {
        if (['true', '1'].includes(raw)) return true;
        if (['false', '0'].includes(raw)) return false;
        return undefined;
    }
    if (typeof fallback === 'number') {
        const value = Number(raw);
        return raw.trim() !== '' && Number.isFinite(value) ? value : undefined;
    }
    if (Array.isArray(fallback)) {
        return raw
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return raw;
}

function serializeOptionValue(value) {
    return Array.isArray(value) ? value.join(',') : String(value);
}

export function readUrlParams() {
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    return Object.fromEntries(SYNCED_KEYS.filter((key) => key in params).map((key) => [key, params[key]]));
}

/** Options present in the URL, shaped like `state.options` ({ v3: { init: {...} } }) so they can be merged over it. */
export function readUrlOptions() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    OPTION_KEYS.forEach(({ urlKey, version, group, key, fallback }) => {
        if (!params.has(urlKey)) return;
        const value = parseOptionValue(params.get(urlKey), fallback);
        if (value === undefined) return;
        result[version] = { ...result[version], [group]: { ...result[version]?.[group], [key]: value } };
    });
    return result;
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
    // Only non-default options are written, so the URL stays short.
    OPTION_KEYS.forEach(({ urlKey, version, group, key, fallback }) => {
        const value = state.options?.[version]?.[group]?.[key];
        const serialized = value === undefined ? undefined : serializeOptionValue(value);
        if (serialized === undefined || serialized === serializeOptionValue(fallback)) {
            params.delete(urlKey);
        } else {
            params.set(urlKey, serialized);
        }
    });
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
}
