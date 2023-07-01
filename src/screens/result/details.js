import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../../components/header';
import MainContainer from '../../components/mainContainer';
import { format, compareAsc } from 'date-fns'
import theme from '../../theme/resources';
import PendingIcon from '../../assets/images/pending.png' // replace pending icon
import { useRoute } from '@react-navigation/native';


function ResultDetailsScreen() {
    const route = useRoute();
    const { lotteryDetials } = route?.params;
    return (
        <MainContainer>
            <Header isBack={true} />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={{ marginTop: 20, }}>
                    <View style={{ paddingLeft: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.TextBlack }}>{lotteryDetials?.name}</Text>
                        <Text style={{ fontSize: 16, color: theme.gray, marginTop: 20 }}>{format(new Date(lotteryDetials?.endDate), 'MMM - dd,yyyy hh:mm a')}</Text>
                        {lotteryDetials?.markAsComplete && <View
                            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, marginLeft: -10 }}>
                            {lotteryDetials?.winningNumbers.numbers
                                .map((el, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.7}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: theme.Primary,
                                            width: 30,
                                            height: 30,
                                            alignItems: 'center',
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            backgroundColor: theme.Primary,
                                            marginHorizontal: 6,
                                            // marginVertical: 6,
                                        }}>
                                        <Text
                                            style={{
                                                color: theme.White,
                                                fontWeight: 'bold',
                                            }}>
                                            {el}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            {lotteryDetials?.winningNumbers.powerNumbers.map((el, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: theme.Primary,
                                        width: 30,
                                        height: 30,
                                        alignItems: 'center',
                                        borderRadius: 4,
                                        justifyContent: 'center',
                                        backgroundColor: theme.Primary,
                                        marginHorizontal: 6,
                                        // marginVertical: 6,
                                    }}>
                                    <Text
                                        style={{
                                            color: theme.White,
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
                {!lotteryDetials?.markAsComplete && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={PendingIcon} />
                </View>}
                {lotteryDetials?.markAsComplete && <View style={{ marginTop: 30 }}>
                    <View>
                        <View style={{ flexDirection: 'row', paddingLeft: 24, borderBottomWidth: 1, borderBottomColor: theme.gray, paddingBottom: 20 }}>
                            <Text style={{ fontSize: 18, color: theme.Black, fontWeight: '600', width: '40%' }}>Match</Text>
                            <Text style={{ fontSize: 18, color: theme.Black, fontWeight: '600' }}>Payout</Text>
                        </View>
                        <View>
                            {Array.isArray(lotteryDetials?.prizeBreakDown) && lotteryDetials?.prizeBreakDown.map((el, index) => (
                                <View key={index} style={{ flexDirection: 'row', paddingLeft: 24, paddingVertical: 10, paddingBottom: 20, backgroundColor: ((index + 1) % 2) == 0 ? theme.lightGray : theme.White }}>
                                    <Text style={{ fontSize: 18, color: theme.Black, fontWeight: '600', width: '40%' }}>{el.number} + {el.powerNumber}</Text>
                                    <Text style={{ fontSize: 18, color: theme.Black, fontWeight: '600' }}>{el.price}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>}
            </ScrollView>
        </MainContainer>
    )
}

export default ResultDetailsScreen;