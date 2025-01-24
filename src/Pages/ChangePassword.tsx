import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import { changePasswordValidationScheam } from '../utils/changePasswordValidationSchema'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/changePassword.module.scss'

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
            <div className={styles.changePasswordContainer}>
    <h2>Change Password</h2>
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
            <Form className={styles.form}>
                {/* Current Password */}
                <div className={styles.formGroup}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <Field
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                    />
                    <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className={styles.errorMessage}
                    />
                </div>

                {/* New Password */}
                <div className={styles.formGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <Field
                        type="password"
                        id="newPassword"
                        name="newPassword"
                    />
                    <ErrorMessage
                        name="newPassword"
                        component="div"
                        className={styles.errorMessage}
                    />
                </div>

                {/* Confirm New Password */}
                <div className={styles.formGroup}>
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <Field
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                    />
                    <ErrorMessage
                        name="confirmNewPassword"
                        component="div"
                        className={styles.errorMessage}
                    />
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className={styles.errorMessageGlobal}>
                        {errorMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
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