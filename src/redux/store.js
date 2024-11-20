import { configureStore } from '@reduxjs/toolkit';
import {
    featureSlice,
    loginSlice,
    radioSlice,
    sidebarSlice,
    statusSlice,
    themeSlice,
} from './sliceReducer';
import albumReducer from './sliceReducer/albumSlice';
import artistsReducer from './sliceReducer/artistsSlice';
const store = configureStore({
    reducer: {
        feature: featureSlice.reducer,
        status: statusSlice.reducer,
        sidebar: sidebarSlice.reducer,
        theme: themeSlice.reducer,
        login: loginSlice.reducer,
        radio: radioSlice.reducer,
        albums: albumReducer,
        artists: artistsReducer,
    },
});
export default store;
