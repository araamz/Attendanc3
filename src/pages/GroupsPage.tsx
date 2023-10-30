export default function GroupsPage() {
    return (
        <div>
            <div>
                <span className='flex flex-col gap-0.5'>
                    <p className='font-semibold text-4xl'>
                        Sections
                    </p>
                    <p className='leading-snug'>
                        View available sections or create new sections to allow the creation of new teams.
                    </p>
                </span>
                <div>
                    <div className='bg-neutral-200 p-2 h-10'>
                        <input type='number' className='text-sm' />
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}