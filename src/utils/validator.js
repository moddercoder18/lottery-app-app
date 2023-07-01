import * as yup from 'yup';


export const onlyNumber = /^[0-9]*$/;
export const floatNumber = /^((\+|-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/;
export const cardsExpireMonthRegExp = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
export const monthExp = /^(0[1-9]|1[012])$/;
export const yearExp = /^\d{4}$/;
export const expiryDateRegExp = /((0{1}[1-9]{1})|(1{1}[0-2]{1}))([2-9]{1}[0-9]{1})/;
export const nameRegExp = /^(?=.{1,60}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/;
export const passwordRegExp = /^(?:(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
export const insta = /(?:http:\/\/)?(?:www\.)?instagram\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
export const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
export const instaRegex = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm
export const FbRegex = /(?:(?:http|https):\/\/)?(?:www.|m.)?facebook.com\/(?!home.php)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]+)/gm
export const ifscRegex = /^[A-Za-z]{4}\d{7}$/
export const accountNumber = /^[0-9]{9,18}$/
export const panNumber = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
// export const snapRegex = /^(?:https?:)?\/\/(?:www\.)?snapchat\.com\/add\/(?P<username>[A-z0-9\.\_\-]+)\/?/im

export const validateRequired = (messages = { required }) =>
    yup
        .string()
        .required(messages?.required || 'Field is required')
        .max(15, "Not more than 15 character's");

export const validateInstaURL = () =>
    yup.string().matches(usernameRegex, 'invalid url').optional();

export const validateRequiredEmail = () =>
    yup
        .string()
        .trim()
        .email('Email is not valid')
        .required('Email is required');

export const validateRequiredPassword = () =>
    yup
        .string()
        .matches(noSpaceRegExp, 'Space not allowed')
        .matches(passwordRegExp, 'Should contain lowercase, uppercase and number')
        .min(8, 'Password must be 8+ characters')
        .max(15, "Password not more than 15 character's")
        .required('Password is required');

export const validateRequiredPasswordLogin = () =>
    yup
        .string()
        .required('Password is required')
        .min(3, 'Password must be 3+ characters');

export const validateName = () =>
    yup.string().matches(nameRegExp, "Invalid Name");

export const validateFacebookUserName = () =>
    yup.string()
        .matches(FbRegex, "Invalid Facebook Profile Name").required('Facebook Profile is required');

export const validateInstaUserName = () =>
    yup.string()
        .matches(instaRegex, "Invalid Instgram Profile Name").required('Instgram Profile is required');

export const validateAccountNumber = () =>
    yup.string()
        .matches(accountNumber, "Invalid Account Number").required('Account Number is required');

export const validateIfsc = () =>
    yup.string()
        .matches(ifscRegex, "Invalid IFSC ").required('IFSC is required');

export const validatePanNumber = () =>
    yup.string()
        .matches(panNumber, "Invalid Pan Number ").required('Pan Number is required');

export const validateSnapChatUserName = () =>
    yup.string().required('Snapchat Profile is required')
// .matches(snapRegex, "Invalid Snapchat Profile Name");

export const validateRequiredName = () =>
    validateName()
        .required("Name is required")
        .max(25, "Not more than 25 character's");

export const validateRequiredCountry = () =>
    validateName()
        .required("Country is required")
        .max(25, "Not more than 25 character's");

export const userBio = () => {
    yup.string().max(20, "Bio not more than 200 character's").optional();
}
export const validatePhone = () =>
    yup
        .string()
        // .required('Phone is required')
        .matches(onlyNumber, "Phone is not valid")
        .max(10, "Max 10 digits allowed")
        .min(10, "Min 10 digits required").optional();


export const validateRequiredCity = () =>
    yup
        .string()
        .required("City is required")
        .max(50, "Not more than 50 character's")
        .matches(nameRegExp, "City is invalid");

export const validateRequiredState = () =>
    yup
        .string()
        .required("State is required")
        .max(50, "Not more than 50 character's")
        .matches(nameRegExp, "State is invalid");

export const validateRequiredPincode = () =>
    yup
        .string()
        .matches(onlyNumber, "Must be numeric")
        .required("Pin code is required")
        .max(6, "Must be 6 digits")
        .min(5, "Must be 5 digits");

export const validateRequiredStreet = () =>
    yup.string().required("Address is required");