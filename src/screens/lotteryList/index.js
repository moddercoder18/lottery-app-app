import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';
import { Card } from 'react-native-paper';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device';
import { navigate } from '../../services/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { getlottery, getlotteryDetail } from '../../redux/actions';
import { convertIntoMillions } from '../../utils/currencyhelper';
import CountDownTimer from '../../components/countDownTimer'
import StringsOfLanguages from '../../utils/localization';
import EmptyComponent from '../../components/empty';
import ProgressLoader from 'rn-progress-loader';


function LotteryList() {
    const dispatch = useDispatch();
    const lotteryListData = useSelector(state => state.user.lotteryData);
    const loadingData = useSelector(state => state.user.loading);
    console.log("lotteryListData>>", loadingData)

    useEffect(() => {
        dispatch(getlottery())
    }, [])

    const handleDetails = (id) => {
        dispatch(getlotteryDetail(id))
    }

    if (loadingData) {
        return (
            <ProgressLoader
                visible={loadingData}
                isModal={true} isHUD={true}
                hudColor={"#f22c4d"}
                color={"#FFFFFF"} />
        )
    }


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => new Date(item?.endDate) > new Date() ? handleDetails(item?._id) : ''}>
                <Card style={{ backgroundColor: item.backgroundColor, width: deviceWidth - 20, height: 90, marginVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25, }} />
                        <View style={{ paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                            {item?.winningPrice ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: theme.White, fontSize: 18, fontWeight: '700' }}>{item?.priceCurrency?.split('/')[item?.priceCurrency?.split('/').length - 1]}</Text>
                                <Text style={{ color: theme.White, fontSize: 24, fontWeight: '700', marginLeft: 2 }}>{convertIntoMillions(item?.winningPrice)}</Text>
                                <Text style={{ color: theme.White, fontSize: 24, fontWeight: '700', marginLeft: 8 }}>{StringsOfLanguages.million}</Text>
                            </View> : <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Text style={{ color: theme.White, fontSize: 18, fontWeight: '700', marginBottom: 5 }}>  {`${StringsOfLanguages.jackpotPending}`}</Text>
                            </View>}
                            <View style={{
                                 width: 100
                            }}>
                                {/* <CountDownTimer date={item?.endDate} /> */}
                                {/* <Text style={{ color: item.color }}>11:56:10</Text> */}
                                {new Date(item?.endDate) > new Date() ? <CountDownTimer
                                    date={item?.endDate}
                                /> : <Text style={{
                                    width: deviceWidth - 100,
                                    color: 'white',
                                }}>
                                    {`${StringsOfLanguages.waiting_msg}`}
                                </Text>}
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    return (
        <MainContainer>
            <Header isBack={false} showSearch={false} />
            {!loadingData && <FlatList
                data={lotteryListData}
                style={{ marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => item._id.toString()}
                ListEmptyComponent={() => <EmptyComponent />}
            />}


        </MainContainer>
    )
}

export default LotteryList;