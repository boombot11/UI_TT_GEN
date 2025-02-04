import React from 'react'

const Navbar = () => {
    return (
        <div className="w-full bg-black/40 fixed px-5 lg:px-8 overflow-x-hidden xl:px-[8%] pt-1 flex z-50">
    
          <div className="relative z-10">
            <nav className="flex p-6 text-white">
                <ul className="flex justify-between w-[80vw] ">
                    <li className="cursor-pointer text-md font-semibold text-xl text-white/90">TimeTable Generator</li>
                    {/* <li className="cursor-pointer text-md border-none duration-500 flex justify-center items-center px-3 rounded-lg hover:bg-gray-800 font-semibold">Instructions</li> */}
                    <li className="cursor-pointer text-md border border-white/70 px-6 opacity-80 hover:bg-white hover:text-black duration-500 font-semibold rounded-md p-2"><a href="/upload">Get Started</a></li>
                </ul>
            </nav>
          </div>
        </div>
      );
}

export default Navbar
