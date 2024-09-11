import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="Logo font-bold text-2xl">
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/ &gt;</span>
                </div>
                <button className='text-white bg-green-700 flex justify-between items-center my-5 rounded-full hover:bg-green-900 ring-white ring-1'>
                    <img className='invert p-1 w-10' src="icons/github.svg" alt="github" />
                    <span className='font-bold px-2'>GitHub</span>
                </button>
            </div>
        </nav>)
}

export default Navbar