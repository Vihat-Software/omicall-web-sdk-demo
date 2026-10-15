import { v2Adapter } from './v2Adapter';
import { v3Adapter } from './v3Adapter';

const adapters = { v2: v2Adapter, v3: v3Adapter };

export function getAdapter(source) {
    return adapters[source] ?? v3Adapter;
}
