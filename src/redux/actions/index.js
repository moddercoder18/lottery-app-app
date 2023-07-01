import React from 'react';
import {
  IS_LOADING,
  IS_LOGIN_LOADING,
  USER_LOGOUT,
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  FORGOT_FAILED,
  FORGOT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  IS_AUTH_SUCCESS,
  IS_AUTH_FAILED,
  PROFILE_IMAGE_SUCCESS,
  PROFILE_IMAGE_FAILED,
  GET_LOTTRY_SUCCESS,
  GET_LOTTRY_FAILED,
  GET_LOTTRY_DETAILS_SUCCESS,
  GET_LOTTRY_DETAILS_FAILED,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
  CHANGE_USER_PASSWORD_FAILED,
  CHANGE_USER_PASSWORD_SUCCESS,
  GET_LOTTRY_HISTORY_SUCCESS,
  GET_LOTTRY_HISTORY_FAILED,
  GET_CUSTOMER_TICKET_SUCCESS,
  GET_CUSTOMER_TICKET_FAILED,
  SELECT_LANGUAGE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_WALLET_TRANSACTION_SUCCESS,
  GET_WALLET_TRANSACTION_FAILED,
} from '../constant';

import { unpersist, AUTH_KEYS, persist, hydrate } from '../../utils/storage';
import {
  reset,
  goBack,
  replace,
  navigate,
} from '../../services/NavigationService';
import { axiosInstance, api } from '../../api';
import { showSuccessMessage, showErrorMessage } from '../../utils/toast';
import StringsOfLanguages from '../../utils/localization';

export function isLoading(isLoading = false) {
  return {
    type: IS_LOADING,
    isLoading: isLoading,
  };
}
export function isAuthLoading(isLoading = false) {
  return {
    type: IS_LOGIN_LOADING,
    isLoading: isLoading,
  };
}

export function getUserFromStorage() {
  return async dispatch => {
    dispatch(isAuthLoading(true));
    dispatch(isLoading(true));
    console.log("hii getUserFromStorage",)
    const token = await hydrate(AUTH_KEYS.token);
    const storedUserData = await hydrate(AUTH_KEYS.user);
    const countryLanguage = await hydrate(AUTH_KEYS.countryLang)
    console.log("local LNg", countryLanguage)
    if (token && storedUserData) {
      dispatch(isLoading(false));
      await enabledHeadersFromStorage();
      dispatch(getUser(token));
    } else {
      dispatch(setSelectedLanguage(countryLanguage))
      StringsOfLanguages.setLanguage(countryLanguage || 'en');
      dispatch(isAuthLoading(false));
      dispatch(isLoading(false));

      dispatch({
        type: IS_AUTH_FAILED,
        payload: { isLoggedIn: false },
      });
    }
  };
}

export function userLogout() {
  return async (dispatch) => {
    await unpersist(AUTH_KEYS.token);
    await unpersist(AUTH_KEYS.user);
    dispatch({
      type: USER_LOGOUT,
      isLoading: false,
    })
    replace('HomeTabs')
    reset({
      index: 0,
      routes: [{ name: 'HomeTabs' }],
    })
  }
}

export const enabledHeadersFromStorage = async () => {
  const token = await hydrate(AUTH_KEYS.token);
  console.log('Tokens', JSON.stringify(token));
  if (!token) {
    return;
  }
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export function loginUser(userDetails, transactionPayload) {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      console.log('loginApi', userDetails);
      api
        .post('/customer/login', userDetails)
        .then(response => {
          console.log('response login', response.data);
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: response.data,
          });
          showSuccessMessage('User Log in sucessfully!');
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          dispatch(getUser(response.data.token, transactionPayload));
          persist(AUTH_KEYS.token, response.data.token);
        })
        .catch(error => {
          console.log('error 1 ===', error);
          dispatch(isLoading(false));
          dispatch({
            type: SIGNIN_FAILED,
            errorMessage: error,
          });
        });
    } catch (error) {
      console.log('error 2  ===', error);
      dispatch(isLoading(false));
      dispatch({
        type: SIGNIN_FAILED,
        payload: error,
      });
    }
  };
}

export function forgotUserPassword(userDetails) {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      console.log('forgotApi', userDetails);
      api
        .post('/customer/forgotten-password', userDetails)
        .then(response => {
          console.log('response login', response.data);
          dispatch(isLoading(false));
          dispatch({
            type: FORGOT_SUCCESS,
            payload: response.data,
          });
          showSuccessMessage('Link is send on your email');
          goBack();
        })
        .catch(error => {
          console.log('error 1 ===', error);
          dispatch(isLoading(false));
          dispatch({
            type: FORGOT_FAILED,
            errorMessage: error,
          });
        });
    } catch (error) {
      console.log('error 2  ===', error);
      dispatch(isLoading(false));
      dispatch({
        type: FORGOT_FAILED,
        payload: error,
      });
    }
  };
}

export function registerUser(userDetails) {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      api
        .post('/customer/signup', userDetails) // user signup
        .then(response => {
          console.log('response>>:>:>:>>:>:>', JSON.stringify(response));
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          persist(AUTH_KEYS.token, response.data.token);
          showSuccessMessage('User signed up sucessfully!');
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data,
          });
          dispatch(getUser(response.data.token));
        })
        .catch(error => {
          console.log('error', error);
          dispatch(isLoading(false));
          dispatch({
            type: SIGNUP_FAILED,
            errorMessage: error.message
          });
        });
    } catch (error) {
      console.log('error', error);
      dispatch(isLoading(false));
      dispatch({
        type: SIGNUP_FAILED,
        payload: error.message,
      });
    }
  };
}

export function getUser(token, transactionPayload = null) {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      api
        .get('/customer/me')
        .then(response => {
          console.log('UserDetails api get >>>>', response.data);
          persist(AUTH_KEYS.user, response.data.customer);
          StringsOfLanguages.setLanguage(response.data.customer?.language || 'en');
          dispatch({
            type: GET_USER_SUCCESS,
            payload: response.data.customer,
          });
          dispatch(isLoading(false));
          dispatch({
            type: IS_AUTH_SUCCESS,
            payload: response.data.customer
          });
          console.log('transactionPayload ======', transactionPayload);
          replace('HomeTabs', {
            transactionPayload,
          });
        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(false));
          dispatch({
            type: GET_USER_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_USER_FAILED,
        payload: error.message,
      });
    }
  };
}

export function getlottery() {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      api
        .get('/lottery')
        .then(response => {
          console.log('getlottery api get >>>>', response.data);

          dispatch(isLoading(true));
          dispatch({
            type: GET_LOTTRY_SUCCESS,
            payload: response.data,
          });
        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(true));
          dispatch({
            type: GET_LOTTRY_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_LOTTRY_FAILED,
        payload: error.message,
      });
    }
  };
}
export function getlotteryHistory() {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      api
        .get('/lottery/history')
        .then(response => {
          dispatch({
            type: GET_LOTTRY_HISTORY_SUCCESS,
            payload: response.data,
          });
          dispatch(isLoading(false));
        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(false));
          dispatch({
            type: GET_LOTTRY_HISTORY_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_LOTTRY_HISTORY_FAILED,
        payload: error.message,
      });
    }
  };
}

export function getCustomerTicket() {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      api
        .get('/customer-ticket')
        .then(response => {
          // console.log("getlottery api history get >>>>", response.data);

          dispatch({
            type: GET_CUSTOMER_TICKET_SUCCESS,
            payload: response.data,
          });
          dispatch(isLoading(false));
        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(false));
          dispatch({
            type: GET_CUSTOMER_TICKET_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_CUSTOMER_TICKET_FAILED,
        payload: error.message,
      });
    }
  };
}

export function getlotteryDetail(id) {
  return dispatch => {
    dispatch(isLoading(true));
    try {
      api
        .get(`/lottery/${id}`)
        .then(response => {
          console.log('getlottery api get >>>>', response.data);

          dispatch(isLoading(false));
          dispatch({
            type: GET_LOTTRY_DETAILS_SUCCESS,
            payload: response.data,
          });
          navigate('lotteryDetails');
        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(false));
          dispatch({
            type: GET_LOTTRY_DETAILS_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_LOTTRY_DETAILS_FAILED,
        payload: error.message,
      });
    }
  };
}

export function deleteUser() {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      api
        .delete('/customer')
        .then(async response => {
          console.log('UserDetails Delete >>>>', response.data);
          await unpersist(AUTH_KEYS.token);
          await unpersist(AUTH_KEYS.user);
          dispatch({
            type: DELETE_USER_SUCCESS,
            payload: response.data,
          });
          dispatch(isLoading(false));
          reset({
            index: 0,
            routes: [{ name: 'login' }],
          });
        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(false));
          dispatch({
            type: DELETE_USER_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_USER_FAILED,
        payload: error.message,
      });
    }
  };
}

export function changeUserPassword(userDetails) {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      console.log('reset', userDetails);
      api
        .put('/customer/change-password', userDetails)
        .then(response => {
          console.log('response login', response.data);
          dispatch({
            type: CHANGE_USER_PASSWORD_SUCCESS,
            payload: response.data,
          });
          showSuccessMessage('Password Change Successfully');
          dispatch(userLogout());
        })
        .catch(error => {
          console.log('error 1 ===', error);
          dispatch(isLoading(false));
          dispatch({
            type: CHANGE_USER_PASSWORD_FAILED,
            errorMessage: error,
          });
        });
    } catch (error) {
      console.log('error 2  ===', error);
      // dispatch(getProductsSortingFailed(err));
      dispatch(isLoading(false));
      dispatch({
        type: CHANGE_USER_PASSWORD_FAILED,
        payload: error,
      });
    }
  };
}

export function setSelectedLanguage(selectedLanguage = 'en') {
  persist(AUTH_KEYS.countryLang, selectedLanguage);
  return {
    type: SELECT_LANGUAGE,
    selectedLanguage,
  };
}


export const getPageContent = (slug) => {
  return api.get(`/page-content/${slug}`)
}

export const validateCoupon = (couponCode) => {
  return api.get(`/coupon/validate-coupon/${couponCode}`)
}

export function uploadProfilePicture(value, token) {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      console.log("cover image", value);
      api.put('/customer/profile-picture', value, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      }) // /api/login url 
        .then((response) => {
          console.log("response cover image", response.data)
          dispatch(isLoading(false));
          dispatch({
            type: PROFILE_IMAGE_SUCCESS,
            payload: response.data,
          });
          showSuccessMessage('User Image Uploaded!')

        })
        .catch((error) => {
          console.log('error 1 ===', error)
          dispatch(isLoading(false));
          dispatch({
            type: PROFILE_IMAGE_FAILED,
            errorMessage: error
          });
        });
    } catch (error) {
      console.log('error 2  ===', error)
      dispatch(isLoading(false));
      dispatch({
        type: PROFILE_IMAGE_FAILED,
        payload: error,
      });
    }
  };
}

export function updateUser(data) {
  return (dispatch) => {
    try {
      console.log("update user", data)
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.put('/customer', data)
        .then((response) => {
          console.log("userUpdate api get >>>>", response.data);
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: response.data,
          });
          dispatch(isLoading(false));

          // navigate
          // goBack();

        })
        .catch((error) => {
          console.log('error ===================', error)
          dispatch(isLoading(false));
          dispatch({
            type: UPDATE_USER_FAILED,
            errorMessage: error.message
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: UPDATE_USER_FAILED,
        payload: error.message,
      });
    }
  }
}

export function getWalletTransaction() {
  return dispatch => {
    try {
      dispatch(isLoading(true));
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      api
        .get('/customer-wallet-transaction')
        .then(response => {
          // console.log('UserDetails customer-wallet-transaction >>>>', response.data);

          dispatch(isLoading(false));
          dispatch({
            type: GET_WALLET_TRANSACTION_SUCCESS,
            payload: response.data
          });

        })
        .catch(error => {
          console.log('error ===================', error);
          dispatch(isLoading(false));
          dispatch({
            type: GET_WALLET_TRANSACTION_FAILED,
            errorMessage: error.message,
          });
        });
    } catch (error) {
      console.log({ error });
      dispatch(isLoading(false));
      dispatch({
        type: GET_WALLET_TRANSACTION_FAILED,
        payload: error.message,
      });
    }
  };
}