import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';
import { Card } from 'react-native-paper';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device';
import closet from '../../assets/images/search.png';
import { navigate } from '../../services/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { format, compareAsc } from 'date-fns'
import { getlotteryHistory } from '../../redux/actions';
import EmptyComponent from '../../components/empty';




function ResultScreen() {

    const dispatch = useDispatch();
    const historyDetails = useSelector(state => state.user.historyDetails);
    const loadingData = useSelector(state => state.user.loading);

    console.log("historyDetails", historyDetails)

    useEffect(() => {
        dispatch(getlotteryHistory())
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('resultDetails', { lotteryDetials: item })}>
                <Card style={{ backgroundColor: theme.White, width: deviceWidth - 20, height: 100, marginVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 10 }}>
                        <View style={{ paddingLeft: 6, alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden', paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: deviceWidth - 50 }}>
                                <View style={{ paddingTop: 10 }}>
                                    <Text style={{ color: theme.TextBlack, fontSize: 18, fontWeight: '700' }}>{item?.name}</Text>
                                    <Text style={{ color: theme.gray, fontSize: 12, }}>{format(new Date(item?.createdAt), 'MMM - dd,yyyy hh:mm a')}</Text>
                                </View>
                                {/* <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#D8D8D8', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 4, }}>
                                <Image source={closet} resizeMode="contain" style={{ height: 16, width: 16, marginRight: 4 }} />
                                <Text>Check</Text>
                            </TouchableOpacity> */}
                            </View>
                            <View style={{ marginTop: 5, paddingBottom: 10 }}>
                                {!item?.markAsComplete && <Text style={{ color: item.color, fontSize: 16, fontWeight: '700' }}>Jackpot Pending</Text>}
                                {item?.markAsComplete && <View style={{ flexDirection: 'row' }}>
                                    {item?.winningNumbers.numbers.map((el, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            disabled={true}
                                            activeOpacity={0.9}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: theme.Primary,
                                                width: 30,
                                                height: 30,
                                                alignItems: 'center',
                                                borderRadius: 4,
                                                justifyContent: 'center',
                                                backgroundColor: theme.White,
                                                marginHorizontal: 6,
                                                marginVertical: 6,
                                            }}>
                                            <Text
                                                style={{
                                                    color: theme.Primary,
                                                    fontWeight: 'bold',
                                                }}>
                                                {el}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                    }
                                    {item?.winningNumbers.powerNumbers.map((el, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            disabled={true}
                                            activeOpacity={0.9}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: theme.Primary,
                                                width: 30,
                                                height: 30,
                                                alignItems: 'center',
                                                borderRadius: 4,
                                                justifyContent: 'center',
                                                backgroundColor: theme.White,
                                                marginHorizontal: 6,
                                                marginVertical: 6,
                                            }}>
                                            <Text
                                                style={{
                                                    color: theme.Primary,
                                                    fontWeight: 'bold',
                                                }}>
                                                {el}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                    }
                                </View>}

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
                data={historyDetails}
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

export default ResultScreen;