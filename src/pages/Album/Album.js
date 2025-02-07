import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RenderFullListSong } from '../../Feature/HandleEvent/handleEvent';
import TitlePage from '../../layouts/components/TitlePage/TitlePage';
import { sidebarSlice, statusSlice } from '../../redux/sliceReducer';
import { getSingerDataApi } from '../../services';
import styles from './Album.module.scss';

const cx = classNames.bind(styles);

function Album() {
    const dispatch = useDispatch();
    const { nickname } = useParams();
    const [dataFullSongs, setDataSinger] = useState([]);
    const [currentSinger, setCurrentSinger] = useState('');

    useEffect(() => {
        const fetch = async () => {
            if (dataFullSongs.length === 0) {
                dispatch(statusSlice.actions.isPageLoadingChange(true));

                const result = await getSingerDataApi(nickname);
                if (Array.isArray(result)) {
                    setDataSinger(result);
                    setCurrentSinger(result[result.length - 1].name_singer);
                    dispatch(statusSlice.actions.isPageLoadingChange(false));
                }
            }
        };
        fetch();
    }, [nickname, dispatch]);

    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null)); // not active sidebar
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <TitlePage title={`${currentSinger} - Tất Cả Bài Hát`} data={dataFullSongs} />

            <div className={cx('container_listsong_full')}>
                <RenderFullListSong data={dataFullSongs} />
            </div>
        </div>
    );
}

export default Album;
