import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
function Manager() {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let password = localStorage.getItem("password")
        if (password) {
            setpasswordArray(JSON.parse(password))
        }

    }, [])

    // ShowPassword
    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"

        }
    }
    // savePassword
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else{
        toast('Error: Password not saved!');
    }
    }
    // editPassword
    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    // deletePassword
    const deletePassword = (id) => {
        let c = confirm("Do you want to delete this password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    // handleChange
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    // copyText
    const copyText = (text) => {
        toast('Copied To ClipBoard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2  md:mycontainer">
                <h1 className='text-4xl font-bold text-center'><span className="text-green-500">&gt;</span>
                    Pass
                    <span className="text-green-500">OP/ &gt;</span>
                </h1>
                <p className='text-lg text-center text-green-900'>Your own Password Manager</p>
                <div className="text-black flex flex-col items-center p-4 gap-8">
                    <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL..' name='site' id='site' className='rounded-full border border-green-500 w-full py-1 p-4' />
                    <div className="md:flex-row flex-col flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} type="text" placeholder='Enter Username' name='username' id='username' className='rounded-full border border-green-500 w-full py-1 p-4' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} type="password" placeholder='Enter Password' name='password' id='password' className='rounded-full border border-green-500 w-full py-1 p-4' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showPassword}>
                                <img ref={ref} src="icons/eye.png" alt="eye" width={26} className='p-1' />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex items-center bg-green-400 hover:bg-green-300 rounded-full px-8 gap-4 border  border-green-900 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save</button>

                </div>
                <div className="passwords px-4 sm:px-8 md:px-12 lg:px-16">
                    <h2 className="font-bold py-4 text-xl sm:text-2xl">Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='p-0 '>No Passwords To Show</div>}
                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-md mb-10">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="py-2 px-4 text-sm sm:text-base">Site</th>
                                        <th className="py-2 px-4 text-sm sm:text-base">Username</th>
                                        <th className="py-2 px-4 text-sm sm:text-base">Password</th>
                                        <th className="py-2 px-4 text-sm sm:text-base">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-green-100">
                                    {passwordArray.map((item, index) => (
                                        <tr key={index} className="border-b border-green-200">
                                            <td className="py-2 px-4 text-center">
                                                <div className="flex items-center justify-center">
                                                    <a href={item.site} target="_blank" className="text-blue-500 hover:underline">{item.site}</a>
                                                    <div className="lordiconcopy size-7 cursor-pointer ml-2" onClick={() => copyText(item.site)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <div className="flex items-center justify-center">
                                                    <span>{item.username}</span>
                                                    <div className="lordiconcopy size-7 cursor-pointer ml-2" onClick={() => copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <div className="flex items-center justify-center">
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className="lordiconcopy size-7 cursor-pointer ml-2" onClick={() => copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <div className="flex justify-center">
                                                    <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                    <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager
