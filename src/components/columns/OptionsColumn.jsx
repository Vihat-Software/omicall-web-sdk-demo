import { Tabs } from '@heroui/react';

import { useDemoState, useField } from '../../state/hooks';
import { V2InitOptions } from '../options/V2InitOptions';
import { V2RegisterOptions } from '../options/V2RegisterOptions';
import { V3InitOptions } from '../options/V3InitOptions';
import { V3RegisterOptions } from '../options/V3RegisterOptions';
import { SectionCard } from '../ui/SectionCard';

export function OptionsColumn() {
    const { sdkSource, sdkStatus, registerStatus } = useDemoState();
    const [tab, setTab] = useField('optionsTab');

    const initLocked = sdkStatus === 'ready' || sdkStatus === 'initializing';
    const registerLocked = registerStatus === 'registered' || registerStatus === 'registering';

    return (
        <SectionCard
            name='OptionsColumn'
            title='SDK Options'
            description='Full init() & register() option surface'
        >
            <Tabs
                selectedKey={tab}
                onSelectionChange={(key) => setTab(String(key))}
                className='w-full'
            >
                <Tabs.ListContainer>
                    <Tabs.List aria-label='Option group'>
                        <Tabs.Tab id='init'>
                            init()
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id='register'>
                            register()
                            <Tabs.Indicator />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>

                <Tabs.Panel
                    id='init'
                    className='p-0'
                >
                    {initLocked && (
                        <p className='mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700'>
                            SDK already initialized — Unregister &amp; reload the page (or switch SDK source) to change
                            init options.
                        </p>
                    )}
                    {sdkSource === 'v2' ? (
                        <V2InitOptions disabled={initLocked} />
                    ) : (
                        <V3InitOptions disabled={initLocked} />
                    )}
                </Tabs.Panel>

                <Tabs.Panel
                    id='register'
                    className='p-0'
                >
                    {registerLocked && (
                        <p className='mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700'>
                            Unregister to change register options.
                        </p>
                    )}
                    {sdkSource === 'v2' ? <V2RegisterOptions /> : <V3RegisterOptions disabled={registerLocked} />}
                </Tabs.Panel>
            </Tabs>
        </SectionCard>
    );
}
