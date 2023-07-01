import { showMessage } from 'react-native-flash-message';

export const showSuccessMessage = (
    message,
    options,
) => {
    showMessage({
        message,
        type: 'success',
        ...options,
    });
};
export const showErrorMessage = (message, options) => {
    showMessage({
        message,
        type: 'danger',
        ...options,
    });
};
export const showWarnMessage = (message, options) => {
    showMessage({
        message,
        type: 'warning',
        ...options,
    });
};