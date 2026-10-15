const TONE_DOT = {
    info: 'bg-sky-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-rose-400',
};

function formatTime(date) {
    return new Date(date).toLocaleTimeString([], { hour12: false });
}

export function EventLogPanel({ logs }) {
    return (
        <div
            data-name='EventLogPanel'
            style={{
                // keep log panel height within the viewport, even when the page is scrolled
                minHeight: '360px',
                maxHeight: 'calc(100vh - 452px)',
            }}
            className='thin-scroll flex flex-1 flex-col gap-1.5 overflow-y-auto rounded-lg bg-slate-900/95 p-3 font-mono text-xs text-slate-200'
        >
            {logs.length === 0 && <p className='text-slate-500'>No events yet — init the SDK to get started.</p>}
            {logs.map((entry) => (
                <div
                    key={entry.id}
                    className='flex items-start gap-2'
                >
                    <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[entry.level] || TONE_DOT.info}`}
                    />
                    <span className='shrink-0 text-slate-500'>{formatTime(entry.time)}</span>
                    <span className='break-all'>{entry.message}</span>
                </div>
            ))}
        </div>
    );
}
