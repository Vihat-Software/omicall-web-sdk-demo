export const DEFAULT_VERSION = {
    v2: '2.0.0',
    v3: '3.0.46',
};

export const V2_AUDIO_THEMES = ['default', 'salesforce', 'iframe'];
export const V2_LANGUAGES = ['vi', 'en'];

export const V3_LANGUAGES = ['vi', 'en', 'km'];
export const V3_AUDIO_CODECS = ['opus', 'red', 'g711', 'pcma', 'pcmu', 'transport-cc', 'telephone-event'];
export const V3_ICE_TRANSPORT_POLICIES = ['all', 'relay'];

export const defaultV2InitOptions = {
    theme: 'default',
    debug: false,
    busy: false,
    language: 'en',
    ringtoneVolume: 1,
    autoReject: true,
    showNoteInput: false,
    showTagField: false,
    showInfoLastCall: false,
    callButtonEnabled: true,
    advancedJson: '',
};

export const defaultV3InitOptions = {
    lng: 'en',
    toggleDial: 'show',
    dialPosition: 'right',
    minimizeNewCall: false,
    ringtoneVolume: 1,
    phoneMaskEnable: false,
    phoneMaskLen: 4,
    phoneMaskChar: '*',
    phoneMaskLtr: false,
    searchRecentCall: true,
    advancedJson: '',
};

export const defaultV3RegisterOptions = {
    isGuest: false,
    sipUid: '',
    expires: 120,
    wssUri: '',
    audioCodecs: [...V3_AUDIO_CODECS],
    iceTransportPolicy: 'all',
    advancedJson: '',
};

export function createDefaultOptions() {
    return {
        v2: { init: { ...defaultV2InitOptions } },
        v3: { init: { ...defaultV3InitOptions }, register: { ...defaultV3RegisterOptions } },
    };
}
