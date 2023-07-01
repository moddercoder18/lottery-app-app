import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';
import { Card } from 'react-native-paper';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomerTicket } from '../../redux/actions';
import { nFormatter, nListFormatter } from '../../utils/helper';
import { navigate } from '../../services/NavigationService';
import WinningIcon from '../../assets/images/win.png'
import EmptyComponent from '../../components/empty';

const listItem = [
    { id: 1, color: theme.White, backgroundColor: theme.Primary, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 2, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
    { id: 3, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 4, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
    { id: 5, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 6, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
    { id: 7, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 8, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
]


function TicketsScreens() {
    const dispatch = useDispatch();
    const ticketDetails = useSelector(state => state.user.ticketDetails);
    const loadingData = useSelector(state => state.user.loading);
    console.log("ticketDetails", ticketDetails)

    useEffect(() => {
        dispatch(getCustomerTicket())
    }, [])

    const handleDetails = (item) => {
        navigate('ticketDetails', { details: item })
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleDetails(item)} activeOpacity={0.9}>
                <Card style={{ width: deviceWidth - 20, height: 90, marginVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', position: 'relative', }} >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 8, width: deviceWidth - 25 }}>
                        <Image source={{ uri: item?.lotteryId?.image }} style={{ width: 50, height: 50, borderRadius: 25, }} />
                        <View style={{ paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: item.color, fontSize: 18, fontWeight: '700' }} numberOfLines={1}>{item?.lotteryId?.name}</Text>
                                {/* <Text style={{ color: item.color, fontSize: 24, fontWeight: '700', marginLeft: 8 }}>{nListFormatter(item?.lotteryId?.winningPrice)}</Text> */}
                            </View>
                            <View>
                                <Text style={{ color: item.color, marginTop: 10, textTransform: 'capitalize' }}>Status:{item?.transactionId?.status}</Text>
                            </View>
                        </View>
                        {item?.isWinner && <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Image source={WinningIcon} style={{ width: 30, height: 30, }} />
                        </View>}
                    </View>
                </Card>
            </TouchableOpacity >
        )
    }

    return (
        <MainContainer>
            <Header showSearch={false} />

            {!loadingData && <FlatList
                data={ticketDetails}
                style={{ marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <EmptyComponent />}
            />}


        </MainContainer>
    )
}

export default TicketsScreens;