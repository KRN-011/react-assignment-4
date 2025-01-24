import { Field, Form, Formik, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react'
import { editProfileValidationSchema } from '../utils/editProfielValidationSchema';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/editProfile.module.scss'

const EditProfile: React.FC = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState<string>("");

    interface User {
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
    }

    useEffect(() => {
        const loggedInUser: User = JSON.parse(localStorage.getItem("loggedUser") || "{}")

        if (!loggedInUser) {
            alert("No user is logged in. Redirecting to Log in...")
            navigate("/login")
            return;
        }
    }, [navigate])

    const loggedInUser: User = JSON.parse(localStorage.getItem("loggedUser") || "{}")

    // checking if email Exist
    const isEmailExist = (email: string, currentEmail: string): boolean => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
        return users.some((user) => user.email === email && user.email !== currentEmail)
    }

    // handle Submit function

    const handleSubmit = (values: User) => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

        // check if new email already exist (excluding current email)
        if (isEmailExist(values.email, loggedInUser.email)) {
            setErrorMessage("This email is already exist. Please enter different email!")
            return;
        }

        const updatedUser = {
            ...loggedInUser,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobile: values.mobile
        }

        const updatedUsers = users.map((user) =>
            user.email === loggedInUser.email ? updatedUser : user
        )

        // save the updated users list and logged-in user to local storage
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser))

        alert("Profile updated successfully!")
        setErrorMessage("");
    }

    const initialValues = {
        firstName: loggedInUser.firstName || "",
        lastName: loggedInUser.lastName || "",
        email: loggedInUser.email || "",
        mobile: loggedInUser.mobile || "",
    }

    return (
        <>
            <div className={styles.editProfileContainer}>
                <h2>Edit Profile</h2>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={editProfileValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">First Name</label>
                                <Field
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <Field
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="mobile">Mobile Number</label>
                                <Field
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                />
                                <ErrorMessage
                                    name="mobile"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            {errorMessage && (
                                <div className={styles.errorMessageGlobal}>
                                    {errorMessage}
                                </div>
                            )}

                            <button type="submit" className={styles.submitButton}>
                                Save Changes
                            </button>
                        </Form>
                    )}
                </Formik>
                <div
                    className={styles.changePasswordLink}
                    onClick={() => {
                        window.location.href = '/change-password';
                    }}
                >
                    Change Password
                </div>
            </div>


        </>
    )
}

export default EditProfile