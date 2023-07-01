import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from 'react-native';
import Header from '../../components/header';
import MainContainer from '../../components/mainContainer';
import theme from '../../theme/resources';
import StringsOfLanguages from '../../utils/localization';
import { Card, DataTable } from 'react-native-paper';
import WalletIcon from '../../assets/images/wallet.png';
import { useDispatch, useSelector } from 'react-redux';
import { nFormatter } from "../../utils/helper";
import { getWalletTransaction } from "../../redux/actions";
import { format } from "date-fns";

const optionsPerPage = [2, 3, 4];

function MyWalletScreen() {
    const [page, setPage] = useState(0);
    const userDetails = useSelector(state => state.user.userData);
    const walletTransactionData = useSelector(state => state.user.walletTransaction);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        setPage(0);

    }, [itemsPerPage]);

    useEffect(() => {
        dispatch(getWalletTransaction())
    }, [])


    console.log("walletTransactionData", walletTransactionData)

    return (
        <MainContainer>
            <Header isBack={true} />
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Card style={{ paddingVertical: 10, paddingHorizontal: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: '30%', }}>
                            <Image source={WalletIcon} style={{ width: 80, height: 80 }} />
                        </View>

                        <View style={{ flexDirection: 'row', width: '60%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 26, fontWeight: '600', color: theme.TextBlack }}>{StringsOfLanguages.symbol}{nFormatter(userDetails?.wallet?.amount).toFixed(2)}</Text>
                        </View>
                    </View>
                </Card>
                <View style={{ marginTop: 20, height: '70%' }}>
                    <Card>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, height: 40, alignItems: 'center', borderBottomWidth: 0.4 }}>
                            <Text style={{ color: theme.TextBlack, fontWeight: 'bold' }}>Transaction Data</Text>
                            <Text style={{ color: theme.TextBlack, fontWeight: 'bold' }}>Amount</Text>
                            <Text style={{ color: theme.TextBlack, fontWeight: 'bold' }}>Transaction Type</Text>
                        </View>
                        <ScrollView>
                            {Array.isArray(walletTransactionData) && walletTransactionData.map((ele, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, height: 40, alignItems: 'center', backgroundColor: (index + 1) % 2 == 0 ? theme.lighterGray : theme.White }}>
                                    <Text style={{ color: theme.TextBlack, }}> {format(new Date(ele?.createdAt), 'MMM - dd,yyyy hh:mm a')}</Text>
                                    <Text style={{ color: theme.TextBlack, fontSize: 12, color: (ele?.transactionType == 'withdrawal' || ele?.transactionType == 'purchased') ? theme.Red : theme.Green }}>{(ele?.transactionType == 'withdrawal' || ele?.transactionType == 'purchased') ? '-' : '+'} {StringsOfLanguages.symbol}{nFormatter(ele?.amount)}</Text>
                                    <Text style={{ color: theme.TextBlack, textTransform: 'capitalize', width: '25%', fontSize: 12, }}>{ele?.transactionType}</Text>
                                </View>
                            ))}
                            {Array.isArray(walletTransactionData) && walletTransactionData.length == 0 && (
                                <View style={{ alignItems: 'center', height: 40, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700' }}>No Data Found</Text>
                                </View>
                            )}
                        </ScrollView>
                    </Card>

                </View>
            </View>
        </MainContainer>
    )
}

export default MyWalletScreen;