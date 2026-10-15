import { Toast } from '@heroui/react';

import { CallColumn } from './components/columns/CallColumn';
import { ConnectionColumn } from './components/columns/ConnectionColumn';
import { OptionsColumn } from './components/columns/OptionsColumn';
import { ActionToolbar } from './components/layout/ActionToolbar';
import { Header } from './components/layout/Header';
import { DemoStoreProvider } from './state/context';

export function App() {
    return (
        <DemoStoreProvider>
            <div
                data-name='App'
                className='mx-auto flex min-h-screen max-w-360 flex-col gap-6 pb-6'
            >
                <Toast.Provider />
                <Header />
                <ActionToolbar />
                <main className='grid flex-1 grid-cols-1 gap-6 px-6 lg:grid-cols-3'>
                    <ConnectionColumn />
                    <OptionsColumn />
                    <CallColumn />
                </main>
            </div>
        </DemoStoreProvider>
    );
}
