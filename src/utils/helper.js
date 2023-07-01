

export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email can't be empty."
    if (!re.test(email)) return 'Ooops! We need a valid email address.'
    return ''
}

export const nameValidator = (name, fieldName) => {
    if (!name || !name.trim().length) return `${fieldName} can't be empty.`
    return ''
}

export const passwordValidator = (password) => {
    if (!password || !password.trim().length) return "Password can't be empty."
    if (password.length < 5) return 'Password must be at least 5 characters long.'
    return ''
}

export const dobValidator = (dob, maxDate) => {
    if (moment(maxDate).diff(dob, 'days') < 0) {
        return 'Age should be more then 18 years'
    }
    return ''
}

export const tntValidator = (tnt) => {
    if (!tnt) {
        return 'Please accepted terms and conditions'
    }
    return ''
}

export const nFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
    if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(1) + "P";
    if (n >= 1e18) return +(n / 1e18).toFixed(1) + "E";
};
export const nListFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "Million";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
    if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(1) + "P";
    if (n >= 1e18) return +(n / 1e18).toFixed(1) + "E";
};


export const countryListFilter = (countryList) => {
    return countryList.map(ele => ({ label: ele?.countryName, value: ele?.countryCode }))
}