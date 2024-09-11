import React from 'react';

const Footer = () => {
    return (
        <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full pb-4 md:pb-0 mt-auto">
            <div className="Logo font-bold text-2xl mb-2">
                <span className="text-green-500">&lt;</span>
                Pass
                <span className="text-green-500">OP /&gt;</span>
            </div>
            <div className="flex justify-center items-center text-sm">
                Created with <img className="w-5 mx-2" src="icons/heart.png" alt="heart" /> by M.Aleem
            </div>
        </div>
    );
};

export default Footer;
