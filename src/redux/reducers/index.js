import { combineReducers } from 'redux';
import User from './user';
import Setting from './setting'



export default combineReducers({
    user: User,
    setting: Setting
});