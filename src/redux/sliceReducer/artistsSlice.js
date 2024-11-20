import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const intialState = {
    artists: [],
    loading: false,
    error: null,
};

export const fetchArtistsTop = createAsyncThunk(
    'artists/fetchArtists',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_ZING}/artists/top/10`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const artistsSlice = createSlice({
    name: 'artists',
    initialState: intialState,
    extraReducers: (builder) => {
        builder.addCase(fetchArtistsTop.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchArtistsTop.fulfilled, (state, action) => {
            state.artists = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchArtistsTop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default artistsSlice.reducer;
