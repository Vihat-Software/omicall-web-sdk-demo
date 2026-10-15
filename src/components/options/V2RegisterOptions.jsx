export function V2RegisterOptions() {
    return (
        <div
            data-name='V2RegisterOptions'
            className='rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500'
        >
            The v2 SDK's <code className='rounded bg-white px-1 py-0.5 text-xs'>register()</code> method only takes
            <code className='mx-1 rounded bg-white px-1 py-0.5 text-xs'>domain / username / password</code>— set those
            in the <span className='font-medium text-slate-600'>SIP Connection</span> column, then hit Register.
        </div>
    );
}
