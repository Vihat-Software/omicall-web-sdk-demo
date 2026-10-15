export function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export function setByPath(obj, path, value) {
    const keys = path.split('.');
    const next = Array.isArray(obj) ? [...obj] : { ...obj };
    let cursor = next;
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            cursor[key] = value;
            return;
        }
        const existing = cursor[key];
        cursor[key] = Array.isArray(existing) ? [...existing] : { ...existing };
        cursor = cursor[key];
    });
    return next;
}
