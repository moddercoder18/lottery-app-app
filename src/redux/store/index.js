import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reducers from '../reducers';


const middleWare = [thunk];
const store = createStore(Reducers, compose(applyMiddleware(...middleWare)));

export default store;