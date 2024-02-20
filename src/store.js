// store.js
import {  legacy_createStore as createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Importez directement 'thunk' depuis 'redux-thunk'
import taskReducer from './reducers';
import { setupSocket } from './actions';

const store = createStore(taskReducer, applyMiddleware(thunk));

store.dispatch(setupSocket()); // Setup Socket.io

export default store;