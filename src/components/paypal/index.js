import React, { Component, useEffect, useState } from 'react'
import {
    View,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { api, url } from '../../api'
import StringsOfLanguages from '../../utils/localization';
import theme from '../../theme/resources';

export default function Paypal({ isVisble, onClose, transactionData }) {
    const [approvalUrl, setApprovalUrl] = useState(null);
    const [userCancel, setUserCancel] = useState(false);
    const [userSuccess, setUserSuccess] = useState(false);


    useEffect(() => {
        console.log("transactionData >>>", transactionData)
        // var bodyData = {
        //     customerTicket: {
        //         hasMultiplier: false,
        //         lotteryId: "64395cb9ed5b3cdbeb61f4bb",
        //         tickets: [
        //             {
        //                 numbers: [1, 2, 3, 4, 5],
        //                 powerNumbers: [1, 2],
        //             },
        //             {
        //                 numbers: [1, 2, 3, 4, 6],
        //                 powerNumbers: [1, 3],
        //             },
        //             {
        //                 numbers: [1, 2, 3, 4, 7],
        //                 powerNumbers: [1, 5],
        //             },
        //             {
        //                 numbers: [1, 3, 4, 5, 8],
        //                 powerNumbers: [2, 5],
        //             },
        //         ],
        //         type: "one-time-entry",
        //         systematicNumber: null,
        //     },
        //     type: "multi-draw",
        //     customerCurrency: "KRW",
        //     multiDrawSelectedOption: 52
        // }

        api.post(`${url}/transaction/paypal-page`, transactionData).then((res) => {
            console.log("resss", res.data?.redirect_url)
            setApprovalUrl(res.data?.redirect_url)
        }).catch(err => {
            console.log('err', { ...err })
        })


    }, [])

    const _onNavigationStateChange = (webViewState) => {
        console.log("webViewState", webViewState)

        if (webViewState.url.includes(`${url}/payment/success.html`)) {
            setApprovalUrl(null)
            setUserCancel(false)
            setUserSuccess(true)
        } else if (webViewState.url.includes(`${url}/payment/cancel.html`)) {
            setApprovalUrl(null)
            setUserCancel(true)
            setUserSuccess(false)
        }

        console.log("webViewState", webViewState)

    }

    if (userSuccess) {
        return (
            <Modal style={styles.modalView} visible={isVisble} onDismiss={onClose}>
                <SafeAreaView style={styles.modalView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={onClose} style={styles.closeIcon} activeOpacity={0.9}>
                            <Image source={require('../../assets/images/closeIcon.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={styles.loaderView}>
                            <Image source={require('../../assets/images/done.gif')} />
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20, color: theme.TextBlack }}>{StringsOfLanguages.userTransactionDone}</Text>
                            </View>
                        </View>

                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
    if (userCancel) {
        return (
            <Modal style={styles.modalView} visible={isVisble} onDismiss={onClose}>
                <SafeAreaView style={styles.modalView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={onClose} style={styles.closeIcon} activeOpacity={0.9}>
                            <Image source={require('../../assets/images/closeIcon.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={styles.loaderView}>
                            <Image source={require('../../assets/images/cancelled.png')} />
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20, color: theme.TextBlack }}>{StringsOfLanguages.userTransactionCancel}</Text>
                            </View>
                        </View>

                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    return (
        <Modal style={styles.modalView} visible={isVisble} onDismiss={onClose}>
            <SafeAreaView style={styles.modalView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon} activeOpacity={0.9}>
                        <Image source={require('../../assets/images/closeIcon.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>


                    {
                        approvalUrl ? <WebView
                            style={{ height: 400, width: 300, marginTop: 30, }}
                            source={{ uri: approvalUrl }}
                            originWhitelist={['*']}
                            onNavigationStateChange={_onNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            style={{ paddingTop: 40, flex: 1 }}
                        /> : <View style={styles.loaderView}><ActivityIndicator size='large' /></View>
                    }
                </View>
            </SafeAreaView>
        </Modal>
    )

}

const styles = StyleSheet.create({
    modalView: { flex: 1 },
    closeIcon: { right: 10, alignItems: 'flex-end' },
    loaderView: { flex: 1, marginTop: 30, alignItems: 'center', justifyContent: 'center' },

})