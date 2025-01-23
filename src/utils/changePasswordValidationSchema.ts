import * as Yup from 'yup';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

export const changePasswordValidationScheam = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .matches(
      passwordRegex,
      'Password must be 8-32 characters, include uppercase, lowercase, number, and special character.'
    ),
  confirmNewPassword: Yup.string()
    .required('Confirm New Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
