import { unpersist, AUTH_KEYS, persist, hydrate, } from '../../utils/storage';
import { reset, goBack, replace, navigate } from '../../services/NavigationService';
import { axiosInstance, api } from '../../api';
import { showSuccessMessage, showErrorMessage } from '../../utils/toast';
import { isLoading } from './index';
import { GET_SETTING_FAILED, GET_SETTING_SUCCESS } from '../constant';

export function getSetting() {
    return (dispatch) => {
        try {
            api.get('/setting')
                .then((response) => {
                    console.log("Gett Setting  api >>>>", response.data);

                    dispatch({
                        type: GET_SETTING_SUCCESS,
                        payload: response.data,
                    });
                    dispatch(isLoading(false));
                })
                .catch((error) => {
                    console.log('error ===================', error)
                    dispatch(isLoading(false));
                    dispatch({
                        type: GET_SETTING_FAILED,
                        errorMessage: error.message
                    });

                });
        } catch (error) {
            console.log({ error });
            dispatch(isLoading(false));
            dispatch({
                type: GET_SETTING_FAILED,
                payload: error.message,
            });
        }
    }
}