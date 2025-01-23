import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import { changePasswordValidationScheam } from '../utils/changePasswordValidationSchema'
import { useNavigate } from 'react-router-dom';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}

interface changePasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState<string>("")

    // fetching user from localstorage and store it in state
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

    // handle submit function

    const handleSubmit = (values: changePasswordFormValues, { resetForm }:FormikHelpers<changePasswordFormValues>) => {
        if (!loggedInUser) return;

        // Hash the current password entered by user
        const hashedCurrentPassword = CryptoJS.SHA256(values.currentPassword).toString();

        // Check if currentPassword is correct or not
        if (loggedInUser.password !== hashedCurrentPassword) {
            setErrorMessage("Password is Incorrect!")
            return;
        }

        // hash the new password
        const hashedNewPassword = CryptoJS.SHA256(values.newPassword).toString()

        // update user password
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
        const updateUser = users.map((user) => user.email === loggedInUser.email ? { ...user, password: hashedNewPassword } : user)

        // save updated user into localstorage
        localStorage.setItem("users", JSON.stringify(updateUser));
        localStorage.setItem(
            "loggedUser", JSON.stringify({ ...loggedInUser, password: hashedNewPassword })
        )

        alert("Password changed successfully!")
        setErrorMessage("")
        resetForm();
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Change Password</h2>

                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmNewPassword: "",
                    }}
                    validationSchema={changePasswordValidationScheam}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            {/* Current Password */}
                            <div className="flex flex-col">
                                <label htmlFor="currentPassword" className="mb-2 font-medium">
                                    Current Password
                                </label>
                                <Field
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="currentPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* New Password */}
                            <div className="flex flex-col">
                                <label htmlFor="newPassword" className="mb-2 font-medium">
                                    New Password
                                </label>
                                <Field
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div className="flex flex-col">
                                <label htmlFor="confirmNewPassword" className="mb-2 font-medium">
                                    Confirm New Password
                                </label>
                                <Field
                                    type="password"
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="confirmNewPassword"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Change Password
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    )
}

export default ChangePassword