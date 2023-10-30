const plus_circle_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
    </svg>
)

const x_circle_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
)

export default function GroupsPage() {
    return (
        <div className=' '>
            <div className='flex flex-col gap-1'>
                <span className='flex flex-col gap-1'>
                    <p className='font-semibold text-4xl'>
                        Sections
                    </p>
                    <p className='leading-snug'>
                        View available sections or create new sections to allow the creation of new teams.
                    </p>
                </span>
                <div className='bg-neutral-100 rounded-lg'>
                    <div className='flex flex-row items-center gap-3 pr-3'>
                        <input type='number' inputMode='numeric' placeholder='Section # (ex. 1207)' className='p-3 text-md font-semibold w-full bg-neutral-100 focus:border-0 focus:outline-0 focus-visible:appearance-none focus-visible:border-0 focus-visible:outline-0 focus' />
                        <div className='flex flex-row gap-1 items-center bg-green-400 rounded-full shadow-md'>
                            <span className='text-white/80'>
                                { plus_circle_icon }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}