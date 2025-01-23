import { Field, Form, Formik, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react'
import { editProfileValidationSchema } from '../utils/editProfielValidationSchema';
import { useNavigate } from 'react-router-dom';

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
            <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={editProfileValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            <div className="flex flex-col">
                                <label htmlFor="firstName" className="mb-2 font-medium">First Name</label>
                                <Field
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="lastName" className="mb-2 font-medium">Last Name</label>
                                <Field
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2 font-medium">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="mobile" className="mb-2 font-medium">Mobile Number</label>
                                <Field
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className='flex justify-center mt-6 cursor-pointer underline text-blue-700 hover:text-blue-500' onClick={() => {window.location.href = "/change-password"}}>
                    Change Password
                </div>
            </div>

        </>
    )
}

export default EditProfile