import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAlbumTop = createAsyncThunk(
    'album/fetchAlbum',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_ZING}/albums/top/10`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchMusicBySlugAlbum = createAsyncThunk(
    'album/fetchMusicBySlugAlbum',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_ZING}/albums/by-music/${slug}`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const albumSlice = createSlice({
    name: 'album',
    initialState: {
        topAlbum: [],
        listMusicBySlugAlbum: [],
        error: '',
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumTop.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAlbumTop.fulfilled, (state, action) => {
            state.topAlbum = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchAlbumTop.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchMusicBySlugAlbum.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMusicBySlugAlbum.fulfilled, (state, action) => {
            state.listMusicBySlugAlbum = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchMusicBySlugAlbum.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default albumSlice.reducer;
