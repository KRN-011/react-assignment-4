import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/navbar.module.scss'

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
            <div className={styles.container}>
                {/* Logo Section */}
                <div className={styles.logo}>My Product Store</div>

                {/* Navigation Menu */}
                <div className="md:flex">
                    <ul className={styles.navLinks}>
                        <li>
                            <Link to="/" className={styles.navLink}>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/edit-profile" className={styles.navLink}>
                                Edit Profile
                            </Link>
                        </li>
                        {loggedInUser ? (
                            <li>
                                <Link
                                    to="/login"
                                    onClick={handleLogout}
                                    className={styles.navLink}
                                >
                                    Log out
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className={styles.navLink}>
                                    Log in
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Navbar