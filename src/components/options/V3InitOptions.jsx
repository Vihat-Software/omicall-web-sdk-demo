import { V3_LANGUAGES } from '../../state/defaultOptions';
import { useField } from '../../state/hooks';
import { NumberField } from '../ui/NumberField';
import { SelectField } from '../ui/SelectField';
import { SwitchField } from '../ui/SwitchField';
import { TextAreaField } from '../ui/TextAreaField';
import { TextInputField } from '../ui/TextInputField';

const LANGUAGE_ITEMS = V3_LANGUAGES.map((id) => ({ id, label: id.toUpperCase() }));
const TOGGLE_DIAL_ITEMS = [
    { id: 'show', label: 'Show' },
    { id: 'hide', label: 'Hide' },
];
const DIAL_POSITION_ITEMS = [
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
];

export function V3InitOptions({ disabled }) {
    const [lng, setLng] = useField('options.v3.init.lng');
    const [toggleDial, setToggleDial] = useField('options.v3.init.toggleDial');
    const [dialPosition, setDialPosition] = useField('options.v3.init.dialPosition');
    const [minimizeNewCall, setMinimizeNewCall] = useField('options.v3.init.minimizeNewCall');
    const [ringtoneVolume, setRingtoneVolume] = useField('options.v3.init.ringtoneVolume');
    const [searchRecentCall, setSearchRecentCall] = useField('options.v3.init.searchRecentCall');
    const [phoneMaskEnable, setPhoneMaskEnable] = useField('options.v3.init.phoneMaskEnable');
    const [phoneMaskLen, setPhoneMaskLen] = useField('options.v3.init.phoneMaskLen');
    const [phoneMaskChar, setPhoneMaskChar] = useField('options.v3.init.phoneMaskChar');
    const [phoneMaskLtr, setPhoneMaskLtr] = useField('options.v3.init.phoneMaskLtr');
    const [advancedJson, setAdvancedJson] = useField('options.v3.init.advancedJson');

    return (
        <div
            data-name='V3InitOptions'
            className='flex flex-col gap-4'
        >
            <div className='grid grid-cols-2 gap-3'>
                <SelectField
                    name='v3-lng'
                    label='Language'
                    items={LANGUAGE_ITEMS}
                    value={lng}
                    onChange={setLng}
                    disabled={disabled}
                />
                <NumberField
                    name='v3-ringtoneVolume'
                    label='Ringtone volume (0–1)'
                    min={0}
                    max={1}
                    step={0.1}
                    value={ringtoneVolume}
                    onChange={setRingtoneVolume}
                    disabled={disabled}
                />
                <SelectField
                    name='v3-toggleDial'
                    label='ui.toggleDial'
                    items={TOGGLE_DIAL_ITEMS}
                    value={toggleDial}
                    onChange={setToggleDial}
                    disabled={disabled}
                />
                <SelectField
                    name='v3-dialPosition'
                    label='ui.dialPosition'
                    items={DIAL_POSITION_ITEMS}
                    value={dialPosition}
                    onChange={setDialPosition}
                    disabled={disabled}
                />
            </div>

            <div className='divide-y divide-slate-100 rounded-lg border border-slate-100 px-3'>
                <SwitchField
                    label='Minimize new calls'
                    description='ui.minimizeNewCall'
                    isSelected={minimizeNewCall}
                    onChange={setMinimizeNewCall}
                    isDisabled={disabled}
                />
                <SwitchField
                    label='Search recent call'
                    description='searchRecentCall'
                    isSelected={searchRecentCall}
                    onChange={setSearchRecentCall}
                    isDisabled={disabled}
                />
                <SwitchField
                    label='Phone masking'
                    description='phoneMasked.enable'
                    isSelected={phoneMaskEnable}
                    onChange={setPhoneMaskEnable}
                    isDisabled={disabled}
                />
            </div>

            {phoneMaskEnable && (
                <div className='grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-3'>
                    <NumberField
                        name='v3-phoneMaskLen'
                        label='Visible length'
                        min={0}
                        value={phoneMaskLen}
                        onChange={setPhoneMaskLen}
                        disabled={disabled}
                    />
                    <TextInputField
                        name='v3-phoneMaskChar'
                        label='Mask char'
                        value={phoneMaskChar}
                        onChange={(v) => setPhoneMaskChar(v.slice(0, 1))}
                        placeholder='*'
                        disabled={disabled}
                    />
                    <div className='flex items-end pb-1.5'>
                        <SwitchField
                            label='LTR'
                            isSelected={phoneMaskLtr}
                            onChange={setPhoneMaskLtr}
                            isDisabled={disabled}
                        />
                    </div>
                </div>
            )}

            <TextAreaField
                name='v3-init-advanced'
                label='Advanced JSON (merged into init config)'
                placeholder='{ "searchRecentCall": true, "icons": [] }'
                value={advancedJson}
                onChange={setAdvancedJson}
                disabled={disabled}
                hint='Covers ctaButtons, callTabs, icons, sounds and any field not exposed above.'
            />
        </div>
    );
}
