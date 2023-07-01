import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import { getUserFromStorage } from './src/redux/actions';
import { getSetting } from './src/redux/actions/setting';
import { Main } from './src/services/rootnavigation';


function Apploader() {
    const dispatch = useDispatch()
    const loadingData = useSelector(state => state.user.loading);
    useEffect(() => {
        dispatch(getUserFromStorage());
        dispatch(getSetting());
    }, [getUserFromStorage])

    return (
        <>
            <ProgressLoader
                visible={loadingData}
                isModal={true} isHUD={true}
                hudColor={"#f22c4d"}
                color={"#FFFFFF"} />
            <Main />
        </>
    )
};

export default Apploader;