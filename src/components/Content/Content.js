import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumTop } from '../../redux/sliceReducer/albumSlice';
import { fetchArtistsTop } from '../../redux/sliceReducer/artistsSlice';
import Container from '../Container/Container';
import Trending from './Trending/Trending';

function Content() {
    const { topAlbum } = useSelector((state) => state.albums);
    const { artists } = useSelector((state) => state.artists);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAlbumTop());
        dispatch(fetchArtistsTop());
    }, [dispatch]);

    console.log('topAlbum', topAlbum);
    console.log('artists', artists);
    return (
        <div>
            <div>
                <Trending />
            </div>
            <div>
                <Container
                    listData={artists}
                    titleSection="Nghệ Sĩ Thịnh Hành"
                />
            </div>
            <div>
                <Container listData={topAlbum} titleSection="Album Hot" />
            </div>
        </div>
    );
}

export default Content;
