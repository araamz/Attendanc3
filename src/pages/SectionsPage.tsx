import {useState} from "react";

export default function SectionsPage() {

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row bg-white flex justify-between p-2 gap-2 rounded shadow mb-4">
                    <input inputMode="numeric" placeholder="Section # (eg. 1207)" className="grow border-none active:border-none focus:appearance-none focus:outline-none bg-neutral-100 p-1 rounded" />
                    <div className="flex flex-row items-center gap-2 items-stretch">
                        <button className="bg-green-500 px-2 rounded font-semibold text-sm text-white/90">
                            Create
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-row bg-white justify-between p-2 gap-2 rounded shadow gap-4">
                        <p>
                            1208
                        </p>
                        <button className="bg-red-500 px-2 rounded font-semibold text-sm text-white/90">
                            Delete
                        </button>
                    </div>
                    <div className="flex flex-row bg-white justify-between p-2 gap-2 rounded shadow gap-4">
                        <p>
                            1208
                        </p>
                        <button className="bg-red-500 px-2 rounded font-semibold text-sm text-white/90">
                            Delete
                        </button>
                    </div>
                    <div className="flex flex-row bg-white justify-between p-2 gap-2 rounded shadow gap-4">
                        <p>
                            1208
                        </p>
                        <button className="bg-red-500 px-2 rounded font-semibold text-sm text-white/90">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}