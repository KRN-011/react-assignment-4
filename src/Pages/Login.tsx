import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { logInValidationSchema } from '../utils/logInValidationSchema';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

interface logInFormValues {
    email: string;
    password: string;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}

const Login: React.FC = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState<string>("");

    // handle Submit function

    const handleSubmit = (values: logInFormValues) => {

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        // check if email is registered
        const user = users.find((user) => user.email === values.email )

        if( !user ) {
            setErrorMessage("Email not Registered!")
            return;
        }

        //  hash the password entered by user and compare it with the stored hashed password
        const hashedInputPassword = CryptoJS.SHA256(values.password).toString();
        if( hashedInputPassword !== user.password ) {
            setErrorMessage("Incorrect Credentials!")
            return;
        }

        // If login successful
        localStorage.setItem("loggedUser", JSON.stringify(user))
        alert("Login Successfully!")
        setErrorMessage("")

        // redirect after login successfully
        navigate("/")
    }
    

    return (
        <>
            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={logInValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
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
                                <label htmlFor="password" className="mb-2 font-medium">Password</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className='flex justify-center mt-6 cursor-pointer underline text-blue-700 hover:text-blue-500' onClick={() => {window.location.href = "/signup"}}>
                    Sign up
                </div>
            </div>

        </>
    )
}

export default Login