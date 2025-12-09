import React, { useState } from 'react'
import { LuCheck, LuPencil } from "react-icons/lu";

const TitleInput = ({ title, setTitle }) => {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className=''>
            {showInput ? (
                <>
                    <input
                        type="text"
                        placeholder='Resume title'
                        className='text-sm md:text-[17px] bg-transparent outline-none text-black font-semibold border-b border-gray-300 pb-1'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <button className='cursor-pointer' onClick={() => setShowInput((prevState) => !prevState)}>
                        <LuCheck className='text-[16px] text-blue-600' />
                    </button>
                </>
            ) : (
                <>
                    <h2 className='text-sm md:text-[17px] font-semibold flex items-center gap-2'>
                      {title}
                      <button className='cursor-pointer' onClick={() => setShowInput((prevState) => !prevState)}>
                        <LuPencil className='text-sm text-blue-600' />
                      </button>
                    </h2>
                </>
            )}
        </div>
    );
}

export default TitleInput