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
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_LOTTRY_SUCCESS,
  GET_LOTTRY_FAILED,
  GET_LOTTRY_DETAILS_SUCCESS,
  GET_LOTTRY_DETAILS_FAILED,
  GET_LOTTRY_HISTORY_SUCCESS,
  GET_LOTTRY_HISTORY_FAILED,
  GET_CUSTOMER_TICKET_SUCCESS,
  GET_CUSTOMER_TICKET_FAILED,
  SELECT_LANGUAGE,
  GET_WALLET_TRANSACTION_SUCCESS,
  GET_WALLET_TRANSACTION_FAILED
} from '../constant';

const initialstate = {
  loading: false,
  error: '',
  userData: null,
  walletTransaction: [],
  isLoggedIn: false,
  loginLoading: true,
  lotteryData: [],
  lotteryDetails: null,
  historyDetails: null,
  ticketDetails: null,
  selectedLanguage: 'en',
};

const User = (state = initialstate, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, loading: action.isLoading };
    case IS_LOGIN_LOADING:
      return { ...state, loginLoading: action.isLoading };
    case IS_AUTH_SUCCESS:
      console.log('IS_AUTH_SUCCESS', action.payload);
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true,
        loginLoading: false,
      };
    case PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };
    case PROFILE_IMAGE_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        walletTransaction: action.payload,
        loading: false,
      };
    case GET_WALLET_TRANSACTION_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case IS_AUTH_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: false,
      };
    case GET_LOTTRY_SUCCESS:
      return {
        ...state,
        lotteryData: action.payload,
        loading: false,
      };
    case GET_LOTTRY_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_LOTTRY_DETAILS_SUCCESS:
      return {
        ...state,
        lotteryDetails: action.payload,
        loading: false,
      };
    case GET_LOTTRY_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_USER_SUCCESS:
      console.log('GET_USER_SUCCESS', action.payload);
      return {
        ...state,
        userData: action.payload,
        loading: false,
        loginLoading: false,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loginLoading: false,
      };
    case GET_LOTTRY_HISTORY_SUCCESS:
      return {
        ...state,
        historyDetails: action.payload,
        loading: false,
        loginLoading: false,
      };
    case GET_LOTTRY_HISTORY_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loginLoading: false,
      };
    case GET_CUSTOMER_TICKET_SUCCESS:
      return {
        ...state,
        ticketDetails: action.payload,
        loading: false,
        loginLoading: false,
      };
    case GET_CUSTOMER_TICKET_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loginLoading: false,
      };
    case PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };
    case PROFILE_IMAGE_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userData: null,
        isLoggedIn: false,
        loading: false,
      };
    case SIGNIN_FAILED:
      console.log(action.errorMessage);
      return {
        ...state,
        error: action.errorMessage,
        loading: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        error: action.errorMessage,
        loading: false,
      };
    case SELECT_LANGUAGE:
      return { ...state, selectedLanguage: action.selectedLanguage };
    default:
      return state;
  }
};

export default User;
