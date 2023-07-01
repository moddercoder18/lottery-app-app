import { GET_SETTING_SUCCESS, GET_SETTING_FAILED } from "../constant";

const initialstate = {
    loading: false,
    error: '',
    settingData: null
}

const Setting = (state = initialstate, action) => {
    switch (action.type) {
        case GET_SETTING_SUCCESS:
            return {
                ...state,
                settingData: action.payload,
                loading: false,
            };
        case GET_SETTING_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default Setting;