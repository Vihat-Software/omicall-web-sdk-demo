import { V3_AUDIO_CODECS, V3_ICE_TRANSPORT_POLICIES } from '../../state/defaultOptions';
import { useField } from '../../state/hooks';
import { CheckboxGroupField } from '../ui/CheckboxGroupField';
import { NumberField } from '../ui/NumberField';
import { SelectField } from '../ui/SelectField';
import { SwitchField } from '../ui/SwitchField';
import { TextAreaField } from '../ui/TextAreaField';
import { TextInputField } from '../ui/TextInputField';

const ICE_POLICY_ITEMS = V3_ICE_TRANSPORT_POLICIES.map((id) => ({ id, label: id }));

export function V3RegisterOptions({ disabled }) {
    const [isGuest, setIsGuest] = useField('options.v3.register.isGuest');
    const [sipUid, setSipUid] = useField('options.v3.register.sipUid');
    const [expires, setExpires] = useField('options.v3.register.expires');
    const [wssUri, setWssUri] = useField('options.v3.register.wssUri');
    const [audioCodecs, setAudioCodecs] = useField('options.v3.register.audioCodecs');
    const [iceTransportPolicy, setIceTransportPolicy] = useField('options.v3.register.iceTransportPolicy');
    const [advancedJson, setAdvancedJson] = useField('options.v3.register.advancedJson');

    return (
        <div
            data-name='V3RegisterOptions'
            className='flex flex-col gap-4'
        >
            <SwitchField
                label='Guest mode'
                description='isGuest — skip auth & internal APIs, still connect to switchboard'
                isSelected={isGuest}
                onChange={setIsGuest}
                isDisabled={disabled}
            />

            <div className='grid grid-cols-2 gap-3'>
                <TextInputField
                    name='v3-sipUid'
                    label='SIP UID'
                    placeholder='optional cache key'
                    value={sipUid}
                    onChange={setSipUid}
                    disabled={disabled}
                />
                <NumberField
                    name='v3-expires'
                    label='Register expires (s)'
                    min={0}
                    value={expires}
                    onChange={setExpires}
                    disabled={disabled}
                />
                <TextInputField
                    name='v3-wssUri'
                    label='Custom WSS URI'
                    placeholder='wss://omi-sip.omicrm.com/ws'
                    value={wssUri}
                    onChange={setWssUri}
                    disabled={disabled}
                />
                <SelectField
                    name='v3-iceTransportPolicy'
                    label='ICE transport policy'
                    items={ICE_POLICY_ITEMS}
                    value={iceTransportPolicy}
                    onChange={setIceTransportPolicy}
                    disabled={disabled}
                />
            </div>

            <CheckboxGroupField
                name='v3-audioCodecs'
                label='Audio codecs'
                items={V3_AUDIO_CODECS}
                value={audioCodecs}
                onChange={setAudioCodecs}
                disabled={disabled}
            />

            <TextAreaField
                name='v3-register-advanced'
                label='Advanced JSON (merged into register config)'
                placeholder='{ "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }] }'
                value={advancedJson}
                onChange={setAdvancedJson}
                disabled={disabled}
                hint='Covers iceServers and any field not exposed above.'
            />
        </div>
    );
}
