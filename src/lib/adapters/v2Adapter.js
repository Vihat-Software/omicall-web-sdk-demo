import { compact, parseAdvancedJson } from '../json';
import { loadScript } from '../loadScript';

const CDN_BASE = 'https://cdn.omicrm.com/sdk';

function getGlobal() {
    return window.omiSDK;
}

async function loadSdk({ version, env }) {
    let file = 'sdk.min.js';
    if (env === 'dev') file = file.replace('.min.', '.dev.min.');
    await loadScript(`${CDN_BASE}/${version}/${file}`, { 'omi-sdk': '' });
    if (typeof window.omiSDK === 'undefined') {
        throw new Error('SDK script loaded but window.omiSDK is not defined.');
    }
    return window.omiSDK;
}

async function init(options) {
    const sdk = getGlobal();
    const config = compact({
        theme: options.theme,
        debug: options.debug,
        busy: options.busy,
        language: options.language,
        ringtoneVolume: options.ringtoneVolume,
        autoReject: options.autoReject,
        options: compact({
            showNoteInput: options.showNoteInput,
            showTagField: options.showTagField,
            showInfoLastCall: options.showInfoLastCall,
        }),
        form_ui: { call_button: { enabled: options.callButtonEnabled } },
        ...parseAdvancedJson(options.advancedJson),
    });
    await sdk.init(config);
    return true;
}

async function register({ sipRealm, sipUser, sipPassword }) {
    const sdk = getGlobal();
    try {
        const result = await sdk.register({ domain: sipRealm, username: sipUser, password: sipPassword });
        return { status: true, message: result?.code };
    } catch (error) {
        return { status: false, message: error?.message || String(error), code: error?.code };
    }
}

function unregister() {
    getGlobal().unregister();
}

function onEvent(name, cb) {
    getGlobal().on(name, cb);
}

function offEvent(name, cb) {
    getGlobal().off?.(name, cb);
}

function isBusy() {
    return getGlobal().isBusy();
}

function setBusy(next) {
    getGlobal().setBusy(next);
    return getGlobal().isBusy();
}

async function makeCall(remoteNumber) {
    return getGlobal().makeCall(remoteNumber);
}

function getVersion() {
    return getGlobal()?.version;
}

export const v2Adapter = {
    id: 'v2',
    getGlobal,
    isLoaded: () => typeof window.omiSDK !== 'undefined',
    loadSdk,
    init,
    register,
    unregister,
    onEvent,
    offEvent,
    isBusy,
    setBusy,
    makeCall,
    getVersion,
};
