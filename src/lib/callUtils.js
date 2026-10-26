/** Mirrors v3 SDK rules: internal = 2-7 digits, `*91` test call, `1111111…` / `4444444…` prefixes. */
export function isInternalNumber(phoneNumber) {
    const value = String(phoneNumber || '').trim();
    if (!value) return false;
    if (value.startsWith('*91')) return true;
    if (value.length >= 2 && value.length <= 7) return true;
    return /^(1111111|4444444)\d+$/.test(value);
}

/** Zalo Cloud Connect number: 21-22 digits. */
export function isZccNumber(phoneNumber) {
    return /^\d{21,22}$/.test(String(phoneNumber || '').trim());
}

/** Video call is only supported by SDK v3 for internal or ZCC numbers. */
export function canVideoCall(phoneNumber) {
    return isInternalNumber(phoneNumber) || isZccNumber(phoneNumber);
}
