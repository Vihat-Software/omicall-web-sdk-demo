/** Parses a user-supplied "advanced JSON" override block. Empty input is a no-op. */
export function parseAdvancedJson(text) {
    const trimmed = (text || '').trim();
    if (!trimmed) return {};
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Advanced JSON must be an object, e.g. { "key": "value" }');
    }
    return parsed;
}

/** Drops undefined / empty-string values so we don't send noisy keys to the SDK. */
export function compact(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== ''));
}
