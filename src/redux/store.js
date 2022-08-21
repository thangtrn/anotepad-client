import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import authReducer from './auth/authSlice';
import noteReducer from './note/noteSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer']
}  

const reducer = combineReducers({
    authReducer,
    noteReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store);

export default store;