import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface User {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}

const Navbar: React.FC = () => {

    const navigate = useNavigate()

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

    // check if user is logged in
    useEffect(() => {
        const user = localStorage.getItem("loggedUser")
        if (!user) {
            alert("No user is logged in. Redirecting to Log in...")
            navigate("/login")
            return;
        }
        setLoggedInUser(JSON.parse(user))
    }, [navigate])

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("loggedUser")
        setLoggedInUser(null)
    }

    return (
        <>
            <div className="w-[100vw] z-0 bg-blue-600 text-zinc-100 h-[10vh] flex items-center justify-between px-5 md:px-10">
                {/* Logo Section */}
                <div className="text-2xl md:text-3xl font-bold">My Product Store</div>

                {/* Navigation Menu */}
                <div className="md:flex">
                    <ul className="flex gap-5 md:gap-10 font-semibold">
                        <Link
                            to={"/"}
                            className="border-b hover:border-b-2 border-blue-600 hover:border-white duration-100"
                        >
                            Products
                        </Link>
                        <Link
                            to={"/edit-profile"}
                            className="border-b hover:border-b-2 border-blue-600 hover:border-white duration-100"
                        >
                            Edit Profile
                        </Link>
                        {loggedInUser ? (
                            <Link
                                to={"/login"}
                                onClick={handleLogout}
                                className="border-b hover:border-b-2 border-blue-600 hover:border-white duration-100"
                            >
                                Log out
                            </Link>
                        ) : (
                            <Link
                                to={"/login"}
                                className="border-b hover:border-b-2 border-blue-600 hover:border-white duration-100"
                            >
                                Log in
                            </Link>
                        )}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Navbar