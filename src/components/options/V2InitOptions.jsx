import { V2_AUDIO_THEMES, V2_LANGUAGES } from '../../state/defaultOptions';
import { useField } from '../../state/hooks';
import { NumberField } from '../ui/NumberField';
import { SelectField } from '../ui/SelectField';
import { SwitchField } from '../ui/SwitchField';
import { TextAreaField } from '../ui/TextAreaField';

const THEME_ITEMS = V2_AUDIO_THEMES.map((id) => ({ id, label: id }));
const LANGUAGE_ITEMS = V2_LANGUAGES.map((id) => ({ id, label: id.toUpperCase() }));

export function V2InitOptions({ disabled }) {
    const [theme, setTheme] = useField('options.v2.init.theme');
    const [debug, setDebug] = useField('options.v2.init.debug');
    const [busy, setBusy] = useField('options.v2.init.busy');
    const [language, setLanguage] = useField('options.v2.init.language');
    const [ringtoneVolume, setRingtoneVolume] = useField('options.v2.init.ringtoneVolume');
    const [autoReject, setAutoReject] = useField('options.v2.init.autoReject');
    const [showNoteInput, setShowNoteInput] = useField('options.v2.init.showNoteInput');
    const [showTagField, setShowTagField] = useField('options.v2.init.showTagField');
    const [showInfoLastCall, setShowInfoLastCall] = useField('options.v2.init.showInfoLastCall');
    const [callButtonEnabled, setCallButtonEnabled] = useField('options.v2.init.callButtonEnabled');
    const [advancedJson, setAdvancedJson] = useField('options.v2.init.advancedJson');

    return (
        <div
            data-name='V2InitOptions'
            className='flex flex-col gap-4'
        >
            <div className='grid grid-cols-2 gap-3'>
                <SelectField
                    name='v2-theme'
                    label='Theme'
                    items={THEME_ITEMS}
                    value={theme}
                    onChange={setTheme}
                    disabled={disabled}
                />
                <SelectField
                    name='v2-language'
                    label='Language'
                    items={LANGUAGE_ITEMS}
                    value={language}
                    onChange={setLanguage}
                    disabled={disabled}
                />
            </div>

            <NumberField
                name='v2-ringtoneVolume'
                label='Ringtone volume (0–1)'
                min={0}
                max={1}
                step={0.1}
                value={ringtoneVolume}
                onChange={setRingtoneVolume}
                disabled={disabled}
            />

            <div className='divide-y divide-slate-100 rounded-lg border border-slate-100 px-3'>
                <SwitchField
                    label='Debug'
                    description='Verbose SDK console logging'
                    isSelected={debug}
                    onChange={setDebug}
                    isDisabled={disabled}
                />
                <SwitchField
                    label='Start busy'
                    description='Reject calls right after init'
                    isSelected={busy}
                    onChange={setBusy}
                    isDisabled={disabled}
                />
                <SwitchField
                    label='Auto reject'
                    description='Auto-reject when unavailable to take calls'
                    isSelected={autoReject}
                    onChange={setAutoReject}
                    isDisabled={disabled}
                />
                <SwitchField
                    label='Show call button'
                    description='form_ui.call_button.enabled'
                    isSelected={callButtonEnabled}
                    onChange={setCallButtonEnabled}
                    isDisabled={disabled}
                />
            </div>

            <div>
                <p className='mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase'>
                    Default theme options
                </p>
                <div className='divide-y divide-slate-100 rounded-lg border border-slate-100 px-3'>
                    <SwitchField
                        label='Show note input'
                        isSelected={showNoteInput}
                        onChange={setShowNoteInput}
                        isDisabled={disabled}
                    />
                    <SwitchField
                        label='Show tag field'
                        isSelected={showTagField}
                        onChange={setShowTagField}
                        isDisabled={disabled}
                    />
                    <SwitchField
                        label='Show info of last call'
                        isSelected={showInfoLastCall}
                        onChange={setShowInfoLastCall}
                        isDisabled={disabled}
                    />
                </div>
            </div>

            <TextAreaField
                name='v2-init-advanced'
                label='Advanced JSON (merged into init config)'
                placeholder='{ "classes": {}, "forms": [] }'
                value={advancedJson}
                onChange={setAdvancedJson}
                disabled={disabled}
                hint='Covers callbacks, classes, forms and any field not exposed above.'
            />
        </div>
    );
}
