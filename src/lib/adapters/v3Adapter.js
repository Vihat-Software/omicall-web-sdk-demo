import { compact, parseAdvancedJson } from '../json';
import { loadScript } from '../loadScript';

const CDN_BASE = 'https://cdn.omicrm.com/sdk/web';

function getGlobal() {
    return window.OMICallSDK;
}

async function loadSdk({ version }) {
    await loadScript(`${CDN_BASE}/${version}/core.min.js`, { 'omi-call-sdk': '' });
    if (typeof window.OMICallSDK === 'undefined') {
        throw new Error('SDK script loaded but window.OMICallSDK is not defined.');
    }
    return window.OMICallSDK;
}

async function init(options) {
    const sdk = getGlobal();
    const config = compact({
        lng: options.lng,
        ui: compact({
            toggleDial: options.toggleDial,
            dialPosition: options.dialPosition,
            minimizeNewCall: options.minimizeNewCall,
        }),
        ringtoneVolume: options.ringtoneVolume,
        phoneMasked: options.phoneMaskEnable
            ? {
                  enable: true,
                  len: options.phoneMaskLen,
                  char: options.phoneMaskChar,
                  ltr: options.phoneMaskLtr,
              }
            : undefined,
        searchRecentCall: options.searchRecentCall,
        ...parseAdvancedJson(options.advancedJson),
    });
    return sdk.init(config);
}

async function register({
    sipRealm,
    sipUser,
    sipPassword,
    isGuest,
    sipUid,
    expires,
    wssUri,
    audioCodecs,
    iceTransportPolicy,
    advancedJson,
}) {
    const sdk = getGlobal();
    const config = compact({
        sipRealm,
        sipUser,
        sipPassword,
        isGuest: isGuest || undefined,
        sipUid: sipUid || undefined,
        expires: expires || undefined,
        wssUri: wssUri || undefined,
        audioCodecs: audioCodecs?.length ? audioCodecs : undefined,
        iceTransportPolicy: iceTransportPolicy || undefined,
        ...parseAdvancedJson(advancedJson),
    });
    return sdk.register(config);
}

function unregister() {
    getGlobal().unregister();
}

function onEvent(name, cb) {
    getGlobal().on(name, cb);
}

function offEvent(name, cb) {
    getGlobal().off(name, cb);
}

/** `reregister`/`SB_STATE` are legacy runtime APIs (not in the published type surface) kept for DND-style busy toggling. */
function setBusy(next) {
    const sdk = getGlobal();
    const state = next ? sdk.SB_STATE?.BUSY : sdk.SB_STATE?.ONLINE;
    if (state !== undefined && typeof sdk.reregister === 'function') {
        sdk.reregister(state);
    }
    return next;
}

async function makeCall(remoteNumber) {
    return getGlobal().makeCall(remoteNumber);
}

function getVersion() {
    return getGlobal()?.version;
}

export const v3Adapter = {
    id: 'v3',
    getGlobal,
    isLoaded: () => typeof window.OMICallSDK !== 'undefined',
    loadSdk,
    init,
    register,
    unregister,
    onEvent,
    offEvent,
    setBusy,
    makeCall,
    getVersion,
};
