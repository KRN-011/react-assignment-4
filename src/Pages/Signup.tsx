import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { signUpValidationSchema } from '../utils/signUpValidationSchema'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/signup.module.scss'

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
            <div className={styles.signupContainer}>
                <div className={styles.formContainer}>
                    <h2>Sign Up</h2>
                    <Formik
                        initialValues={initialFormValues}
                        validationSchema={signUpValidationSchema}
                        onSubmit={submitHandler}
                    >
                        {() => (
                            <Form className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field type="text" id="firstName" name="firstName" />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field type="text" id="lastName" name="lastName" />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" id="email" name="email" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile">Mobile Number</label>
                                    <Field type="text" id="mobile" name="mobile" />
                                    <ErrorMessage
                                        name="mobile"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" id="password" name="password" />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    Sign Up
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div
                        className={styles.loginLink}
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </div>
                </div>
            </div>


        </>
    )
}

export default Signup