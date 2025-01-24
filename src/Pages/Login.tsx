import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { logInValidationSchema } from '../utils/logInValidationSchema';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.scss'

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
        const user = users.find((user) => user.email === values.email)

        if (!user) {
            setErrorMessage("Email not Registered!")
            return;
        }

        //  hash the password entered by user and compare it with the stored hashed password
        const hashedInputPassword = CryptoJS.SHA256(values.password).toString();
        if (hashedInputPassword !== user.password) {
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
            <div className={styles.loginContainer}>
                <div className={styles.formContainer}>
                    <h2>Login</h2>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={logInValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.input}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={styles.input}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className={styles.errorMessage}
                                    />
                                </div>
                                {errorMessage && (
                                    <div className={styles.errorGlobal}>
                                        {errorMessage}
                                    </div>
                                )}
                                <button type="submit" className={styles.submitButton}>
                                    Login
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div
                        className={styles.signupLink}
                        onClick={() => {
                            window.location.href = "/signup";
                        }}
                    >
                        Sign up
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login