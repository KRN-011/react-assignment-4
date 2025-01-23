import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { signUpValidationSchema } from '../utils/signUpValidationSchema'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'

interface User {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string
}

interface SignUpFormValues {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string,
    confirmPassword: string
}

const Signup: React.FC = () => {

    const navigate = useNavigate()

    // check if email already exist
    const isEmailExist = (email: string): boolean => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
        return users.some((user) => user.email === email)
    }

    // submit Handler
    const submitHandler = (values: SignUpFormValues, { resetForm }: FormikHelpers<SignUpFormValues>) => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        // check if Email already exist initialization
        if (isEmailExist(values.email)) {
            alert("Email already exist!")
            return;
        }

        // Hash the password
        const hashedPassword = CryptoJS.SHA256(values.password).toString();

        // Create new user object
        const newUser: User = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobile: values.mobile,
            password: hashedPassword,
        }

        // Add new user to the list
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users))

        alert("User Registered Successfully!");
        resetForm();

        navigate("/login")
    }

    // Initial Values
    const initialFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    }

    return (
        <>
            <div className="flex items-center h-[100vh]">
                <div className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] flex flex-col mx-auto justify-center p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="flex justify-center text-3xl font-bold mb-10">Sign Up</h2>
                    <Formik initialValues={initialFormValues} validationSchema={signUpValidationSchema} onSubmit={submitHandler}>
                        {() => (
                            <Form className="space-y-6">
                                <div className="flex flex-col">
                                    <label htmlFor="firstName" className="mb-2 font-medium">First Name</label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="lastName" className="mb-2 font-medium">Last Name</label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email" className="mb-2 font-medium">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="mobile" className="mb-2 font-medium">Mobile Number</label>
                                    <Field
                                        type="text"
                                        id="mobile"
                                        name="mobile"
                                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="password" className="mb-2 font-medium">Password</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="confirmPassword" className="mb-2 font-medium">Confirm Password</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Sign Up
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div
                        className="flex justify-center mt-6 cursor-pointer underline text-blue-700 hover:text-blue-500"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup