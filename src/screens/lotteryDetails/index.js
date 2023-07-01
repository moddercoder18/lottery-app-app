import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';
import { Card, RadioButton } from 'react-native-paper';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device';
import Divider from '../../components/divider';
import QuestionMarkModal from '../../components/questionMarkModal';
import TicketNumberModal from '../../components/ticketNumberModal';
import ChooseYourNumberModal from '../../components/chooseYourNumberModal';
import { useSelector } from 'react-redux';
import CountDownTimer from '../../components/countDownTimer';
import ActionSheet from '../../components/actionsheet';
import {
  convertIntoMillions,
  countLines,
  generateUniqueRandomNumbers,
  maxNumberOfCombinations,
} from '../../utils/currencyhelper';
import SelectInputComponent from '../../components/select';
import Paypal from '../../components/paypal';
import { navigate } from '../../services/NavigationService';
import StringsOfLanguages from '../../utils/localization';
import TextInputComponent from '../../components/input';
import { validateCoupon } from '../../redux/actions';
import { showSuccessMessage, showErrorMessage } from '../../utils/toast';
import { nFormatter } from '../../utils/helper';
import { Checkbox } from 'react-native-paper';

const ticketNumber = [2, 3, 5, 8, 15, 20, 25];
const rateCurrency = {
  en: 'USD',
  fil: 'PHP',
  hi: 'INR',
  ja: 'JPY',
  ko: 'KRW',
  ms: 'MYR',
  vi: 'VND',
  zh: 'CNY',
  id: 'IDR'
};
const mainFillArr = new Array(25).fill(1);
const multiDrawList = [
  {
    label: '5 Draws',
    value: 5,
  },
  {
    label: '10 Draws',
    value: 10,
  },
  {
    label: '15 Draws',
    value: 15,
  },
  {
    label: '25 Draws',
    value: 25,
  },
  {
    label: '52 Draws',
    value: 52,
  },
];
const isMultiDraw = [2, 3, 5];




function LotteryDetails() {
  const actionSheet = useRef('')
  const CANCEL_INDEX = 4
  const DESTRUCTIVE_INDEX = 4
  const [options, setOptions] = useState(['Pay with Paypal', 'Cancel'])
  const title = 'Select the payment method'
  const message = ''




  const [couponCode, setCouponCode] = useState({
    couponCode: '',
    error: '',
    isValid: false
  });
  const [isWalletAmount, setIsWalletAmount] = useState(false);
  const lotteryDetailsData = useSelector(state => state?.user?.lotteryDetails);
  const enableCustomerPickNumber = useSelector(
    state => state?.setting?.settingData?.setting?.enableCustomerPickNumber,
  );
  const referralDiscount = useSelector(
    state => state?.setting?.settingData?.setting?.referralDiscount,
  );
  const serviceFee = useSelector(
    state => state?.setting?.settingData?.setting?.serviceFee,
  );
  const rates = useSelector(
    state => state?.setting?.settingData?.currency?.rates,
  );
  const isLoggedIn = useSelector(state => state?.user?.isLoggedIn);
  const userDetails = useSelector(state => state?.user?.userData?.user);
  console.log('userDetails', userDetails);
  const [selectTicket, setSelectTicket] = useState([
    {
      numbers: {},
      powerNumbers: {},
    },
    {
      numbers: {},
      powerNumbers: {},
    },
  ]);
  const [systematicNumbers, setSystematicNumbers] = useState([]);
  const [isSystematicActive, setIsSystematicActive] = useState({
    active: false,
    maxSelectTotalNumber: 0,
    maxSelectTotalPowerNumber:
      lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber,
    maxLines: 0,
  });
  const [paymentType, setPaymentType] = useState('one-time-entry');
  const [checked, setChecked] = useState(false);
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const [isShowTickets, setIsShowTickets] = useState(false);
  const [isShowYourNumberTickets, setIsShowYourNumberTickets] = useState(false);
  const [multiDraw, setMultiDraw] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionPayloadData, setTransactionPayload] = useState(null);
  const selectedLanguage =
    useSelector(state => state.user.selectedLanguage) || 'en';

  const handleChooseTicket = el => {
    let tickets = [...selectTicket];
    if (isSystematicActive?.active) {
      tickets = [];
    }
    if (tickets.length < el) {
      for (let i = tickets.length; i < el; i++) {
        tickets.push({
          numbers: {},
          powerNumbers: {},
        });
      }
    } else {
      tickets.splice(el, 500);
    }
    setSelectTicket([...tickets]);
    setIsSystematicActive({
      active: false,
      maxSelectTotalNumber: 0,
      maxSelectTotalPowerNumber:
        lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber,
      maxLines: 0,
    });
  };

  const handleSystematicTicket = (el, maxLines) => {
    setSelectTicket([
      {
        numbers: {},
        powerNumbers: {},
      },
    ]);
    setIsSystematicActive({
      active: true,
      maxSelectTotalNumber: el,
      maxSelectTotalPowerNumber:
        lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber,
      maxLines,
    });
  };
  const handleCloseQuestion = () => {
    setIsShowQuestion(false);
  };
  const handleCloseTicket = () => {
    setIsShowTickets(false);
  };
  const handleCloseYourNumberTicket = () => {
    setIsShowYourNumberTickets(false);
  };

  const handleOneTimePayment = async () => {
    console.log("userDetails?.wallet?.amount > 0", userDetails?.wallet?.amount)
    if (userDetails?.wallet?.amount > 0) {
      actionSheet.current.show();
      // setOptions(['Pay with Paypal + wallet', 'Pay with Wallet', 'Pay with Paypal', 'Cancel'])
    } else {
      let hasValidCoupon = false;
      if (couponCode.couponCode) {
        const data = await validateCoupon(couponCode.couponCode);
        if (data.data?.message) {
          showErrorMessage(data.data?.message);
          return;
        }
        hasValidCoupon = true;
      }
      const lines = [...selectTicket];
      if (enableCustomerPickNumber) {
        const newLines = [];
        const maxSelectTotalNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber;
        const maxSelectTotalPowerNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalPowerNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber;

        const showLines = lines.map(({ numbers, powerNumbers }) => {
          let showNumbers = Object.keys(numbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          if (showNumbers.length < maxSelectTotalNumber) {
            for (let i = showNumbers.length; i < maxSelectTotalNumber; i++) {
              showNumbers.push('');
            }
          }
          showNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowNumber,
            maxSelectTotalNumber,
            [...showNumbers],
          );
          let showPowerNumbers = Object.keys(powerNumbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          showPowerNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber,
            maxSelectTotalPowerNumber,
            [...showPowerNumbers],
          );
          if (showPowerNumbers.length < maxSelectTotalPowerNumber) {
            for (
              let i = showPowerNumbers.length;
              i < maxSelectTotalPowerNumber;
              i++
            ) {
              showPowerNumbers.push('');
            }
          }
          newLines.push({
            numbers: showNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
            powerNumbers: showPowerNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
          });
          return {
            numbers: showNumbers,
            powerNumbers: showPowerNumbers,
          };
        });
        setSelectTicket([...newLines]);
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: isSystematicActive.active ? [] : showLines,
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: isWalletAmount,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      } else {
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: lines.map(() => ({
              numbers: [],
              powerNumbers: [],
            })),
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: isWalletAmount,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      }
    }
  };

  const handleActionSheet = async (index) => {
    console.log("index>>>", index)
    if (index == 0) {
      setIsWalletAmount(false)
      let hasValidCoupon = false;
      if (couponCode.couponCode) {
        const data = await validateCoupon(couponCode.couponCode);
        if (data.data?.message) {
          showErrorMessage(data.data?.message);
          return;
        }
        hasValidCoupon = true;
      }
      const lines = [...selectTicket];
      if (enableCustomerPickNumber) {
        const newLines = [];
        const maxSelectTotalNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber;
        const maxSelectTotalPowerNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalPowerNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber;

        const showLines = lines.map(({ numbers, powerNumbers }) => {
          let showNumbers = Object.keys(numbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          if (showNumbers.length < maxSelectTotalNumber) {
            for (let i = showNumbers.length; i < maxSelectTotalNumber; i++) {
              showNumbers.push('');
            }
          }
          showNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowNumber,
            maxSelectTotalNumber,
            [...showNumbers],
          );
          let showPowerNumbers = Object.keys(powerNumbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          showPowerNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber,
            maxSelectTotalPowerNumber,
            [...showPowerNumbers],
          );
          if (showPowerNumbers.length < maxSelectTotalPowerNumber) {
            for (
              let i = showPowerNumbers.length;
              i < maxSelectTotalPowerNumber;
              i++
            ) {
              showPowerNumbers.push('');
            }
          }
          newLines.push({
            numbers: showNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
            powerNumbers: showPowerNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
          });
          return {
            numbers: showNumbers,
            powerNumbers: showPowerNumbers,
          };
        });
        setSelectTicket([...newLines]);
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: isSystematicActive.active ? [] : showLines,
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: false,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      } else {
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: lines.map(() => ({
              numbers: [],
              powerNumbers: [],
            })),
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: false,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      }

    } else if (index == 1) {
      setIsWalletAmount(false)
      let hasValidCoupon = false;
      if (couponCode.couponCode) {
        const data = await validateCoupon(couponCode.couponCode);
        if (data.data?.message) {
          showErrorMessage(data.data?.message);
          return;
        }
        hasValidCoupon = true;
      }
      const lines = [...selectTicket];
      if (enableCustomerPickNumber) {
        const newLines = [];
        const maxSelectTotalNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber;
        const maxSelectTotalPowerNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalPowerNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber;

        const showLines = lines.map(({ numbers, powerNumbers }) => {
          let showNumbers = Object.keys(numbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          if (showNumbers.length < maxSelectTotalNumber) {
            for (let i = showNumbers.length; i < maxSelectTotalNumber; i++) {
              showNumbers.push('');
            }
          }
          showNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowNumber,
            maxSelectTotalNumber,
            [...showNumbers],
          );
          let showPowerNumbers = Object.keys(powerNumbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          showPowerNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber,
            maxSelectTotalPowerNumber,
            [...showPowerNumbers],
          );
          if (showPowerNumbers.length < maxSelectTotalPowerNumber) {
            for (
              let i = showPowerNumbers.length;
              i < maxSelectTotalPowerNumber;
              i++
            ) {
              showPowerNumbers.push('');
            }
          }
          newLines.push({
            numbers: showNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
            powerNumbers: showPowerNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
          });
          return {
            numbers: showNumbers,
            powerNumbers: showPowerNumbers,
          };
        });
        setSelectTicket([...newLines]);
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: isSystematicActive.active ? [] : showLines,
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: true,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      } else {
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: lines.map(() => ({
              numbers: [],
              powerNumbers: [],
            })),
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: true,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      }
    } else if (index == 2) {
      setIsWalletAmount(false)
      let hasValidCoupon = false;
      if (couponCode.couponCode) {
        const data = await validateCoupon(couponCode.couponCode);
        if (data.data?.message) {
          showErrorMessage(data.data?.message);
          return;
        }
        hasValidCoupon = true;
      }
      const lines = [...selectTicket];
      if (enableCustomerPickNumber) {
        const newLines = [];
        const maxSelectTotalNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber;
        const maxSelectTotalPowerNumber = isSystematicActive.active
          ? isSystematicActive?.maxSelectTotalPowerNumber
          : lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber;

        const showLines = lines.map(({ numbers, powerNumbers }) => {
          let showNumbers = Object.keys(numbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          if (showNumbers.length < maxSelectTotalNumber) {
            for (let i = showNumbers.length; i < maxSelectTotalNumber; i++) {
              showNumbers.push('');
            }
          }
          showNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowNumber,
            maxSelectTotalNumber,
            [...showNumbers],
          );
          let showPowerNumbers = Object.keys(powerNumbers)
            .map(n => Number(n))
            .sort((a, b) => a - b);
          showPowerNumbers = generateUniqueRandomNumbers(
            1,
            lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber,
            maxSelectTotalPowerNumber,
            [...showPowerNumbers],
          );
          if (showPowerNumbers.length < maxSelectTotalPowerNumber) {
            for (
              let i = showPowerNumbers.length;
              i < maxSelectTotalPowerNumber;
              i++
            ) {
              showPowerNumbers.push('');
            }
          }
          newLines.push({
            numbers: showNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
            powerNumbers: showPowerNumbers.reduce((numbers, n) => {
              if (n) {
                numbers[n] = true;
              }
              return numbers;
            }, {}),
          });
          return {
            numbers: showNumbers,
            powerNumbers: showPowerNumbers,
          };
        });
        setSelectTicket([...newLines]);
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: isSystematicActive.active ? [] : showLines,
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: true,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      } else {
        const transactionPayload = {
          customerTicket: {
            hasMultiplier: false,
            lotteryId: lotteryDetailsData._id,
            tickets: lines.map(() => ({
              numbers: [],
              powerNumbers: [],
            })),
            type: 'one-time-entry',
            systematicNumber: isSystematicActive.active ? showLines[0] : null,
          },
          type: paymentType,
          customerCurrency: 'KRW',
          multiDrawSelectedOption: 25,
          hasWallet: true,
          couponCode: hasValidCoupon ? couponCode.couponCode : '',
        };
        setTransactionPayload(transactionPayload);
        if (isLoggedIn) {
          // console.log("transactionPayload", transactionPayload)
          setShowPaymentModal(!showPaymentModal);
        } else {
          navigate('login', {
            transactionPayload,
          });
        }
      }
    }
  }



  const handleClose = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const handleQuickPickAll = () => {
    if (isSystematicActive.active) {
      const newTickets = [];
      selectTicket.forEach(selectedLine => {
        const numbers = generateUniqueRandomNumbers(
          1,
          lotteryDetailsData?.numbersPerLine?.totalShowNumber,
          isSystematicActive?.maxSelectTotalNumber,
          [
            ...Object.keys(selectedLine.numbers)
              .map(i => Number(i))
              .sort((a, b) => a - b),
          ],
        );
        const powerNumbers = generateUniqueRandomNumbers(
          1,
          lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber,
          isSystematicActive?.maxSelectTotalPowerNumber,
          [
            ...Object.keys(selectedLine.powerNumbers)
              .map(i => Number(i))
              .sort((a, b) => a - b),
          ],
        );
        newTickets.push({
          numbers: numbers.reduce((numbers, n) => {
            numbers[n] = true;
            return numbers;
          }, {}),
          powerNumbers: powerNumbers.reduce((numbers, n) => {
            numbers[n] = true;
            return numbers;
          }, {}),
        });
      });
      setSelectTicket([...newTickets]);
    } else {
      const newTickets = [];
      selectTicket.forEach(selectedLine => {
        const numbers = generateUniqueRandomNumbers(
          1,
          lotteryDetailsData?.numbersPerLine?.totalShowNumber,
          lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber,
          [
            ...Object.keys(selectedLine.numbers)
              .map(i => Number(i))
              .sort((a, b) => a - b),
          ],
        );
        const powerNumbers = generateUniqueRandomNumbers(
          1,
          lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber,
          lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber,
          [
            ...Object.keys(selectedLine.powerNumbers)
              .map(i => Number(i))
              .sort((a, b) => a - b),
          ],
        );
        newTickets.push({
          numbers: numbers.reduce((numbers, n) => {
            numbers[n] = true;
            return numbers;
          }, {}),
          powerNumbers: powerNumbers.reduce((numbers, n) => {
            numbers[n] = true;
            return numbers;
          }, {}),
        });
      });
      setSelectTicket([...newTickets]);
    }
  };

  const applyCoupon = async () => {
    if (couponCode.couponCode) {
      const data = await validateCoupon(couponCode.couponCode);
      if (data.data?.message) {
        showErrorMessage(data.data?.message);
      } else {
        showSuccessMessage('Coupon applied successfully');
        setCouponCode({
          ...couponCode,
          isValid: true
        })
      }
    } else {
      showErrorMessage('Please enter coupon code');
    }
  };
  useEffect(() => {
    if (lotteryDetailsData?.ticketLines) {
      let maxLines = 0,
        i = 7;
      const systematicNumbers = [];
      while (lotteryDetailsData?.ticketLines > maxLines) {
        maxLines = maxNumberOfCombinations(
          i,
          lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber,
        );
        if (lotteryDetailsData?.ticketLines > maxLines) {
          systematicNumbers.push({
            number: i,
            maxLines,
          });
        }
        i = i + 1;
      }
      setSystematicNumbers([...systematicNumbers]);
    }
  }, [lotteryDetailsData]);
  const serviceFeeDisplay = selectTicket.length * lotteryDetailsData.ticketPricePerLine *
    rates[rateCurrency[selectedLanguage || 'en']] * serviceFee;
  const discountDisplay = ((selectTicket.length * lotteryDetailsData.ticketPricePerLine *
    rates[rateCurrency[selectedLanguage || 'en']] * referralDiscount) / 100);
  const subTotalDisplay = selectTicket.length * lotteryDetailsData.ticketPricePerLine *
    rates[rateCurrency[selectedLanguage || 'en']];

  const totalDisplay = subTotalDisplay + serviceFeeDisplay - (couponCode.isValid ? discountDisplay : 0)
  return (
    <>
      <MainContainer>
        <Header isBack={true} showSearch={false} />
        {lotteryDetailsData && (
          <ScrollView style={{ paddingBottom: 120 }}>
            <Card
              style={{
                backgroundColor: lotteryDetailsData?.backgroundColor,
                width: deviceWidth,
                height: 90,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 0,
              }}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                <Image
                  source={{ uri: lotteryDetailsData?.image }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <View
                  style={{
                    paddingLeft: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        color: theme.White,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      {
                        lotteryDetailsData?.priceCurrency?.split('/')[
                        lotteryDetailsData?.priceCurrency?.split('/').length -
                        1
                        ]
                      }
                    </Text>
                    <Text
                      style={{
                        color: theme.White,
                        fontSize: 24,
                        fontWeight: '700',
                        marginLeft: 8,
                      }}>
                      {convertIntoMillions(lotteryDetailsData?.winningPrice)}
                    </Text>
                    <Text
                      style={{
                        color: theme.White,
                        fontSize: 24,
                        fontWeight: '700',
                        marginLeft: 8,
                      }}>
                      {`${StringsOfLanguages.million}`}
                    </Text>
                  </View>
                  <View>
                    <CountDownTimer date={lotteryDetailsData?.endDate} />
                  </View>
                </View>
              </View>
            </Card>
            {/* Select Card  NUmber*/}

            <View>
              <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.TextBlack }}>
                  {StringsOfLanguages.chooseLine}:
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 8,
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {ticketNumber.map((el, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChooseTicket(el)}
                    activeOpacity={0.7}
                    style={{
                      borderWidth: 1,
                      borderColor: theme.Primary,
                      width: 36,
                      height: 36,
                      alignItems: 'center',
                      borderRadius: 4,
                      justifyContent: 'center',
                      backgroundColor:
                        selectTicket.length == el ? theme.Primary : theme.White,
                    }}>
                    <Text
                      style={{
                        color:
                          selectTicket.length == el
                            ? theme.White
                            : theme.Primary,
                        fontWeight: 'bold',
                      }}>
                      {el}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {systematicNumbers.length && enableCustomerPickNumber ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() =>
                        handleSystematicTicket(
                          systematicNumbers[0].number,
                          systematicNumbers[0].maxLines,
                        )
                      }
                      style={{
                        width: 180,
                        borderWidth: 1,
                        borderColor: theme.Primary,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        backgroundColor: isSystematicActive
                          ? theme.Primary
                          : theme.White,
                      }}>
                      <Text
                        style={{
                          color: isSystematicActive
                            ? theme.White
                            : theme.Primary,
                          fontWeight: 'bold',
                        }}>
                        {StringsOfLanguages.systematic}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() =>
                        navigate('staticPage', {
                          slug: 'about-systematic-page',
                        })
                      }>
                      <Image
                        source={require('../../assets/images/questionmarkIcon.png')}
                        style={{ width: 25, height: 25 }}
                      />
                    </TouchableOpacity>
                  </View>
                  {isSystematicActive?.active && (
                    <>
                      <View
                        style={{
                          width: 'auto',
                          marginTop: 10,
                          borderWidth: 1,
                          borderColor: theme.Primary,
                          borderRadius: 4,
                          paddingVertical: 2,
                          position: 'relative',
                          paddingHorizontal: 2,
                        }}>
                        <View style={styles.baseTop} />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          {isSystematicActive?.active &&
                            systematicNumbers.map(
                              ({ maxLines, number }, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() =>
                                    handleSystematicTicket(number, maxLines)
                                  }
                                  activeOpacity={0.7}
                                  style={{
                                    borderWidth: 1,
                                    borderColor: theme.Primary,
                                    width: 30,
                                    height: 30,
                                    alignItems: 'center',
                                    borderRadius: 4,
                                    justifyContent: 'center',
                                    backgroundColor:
                                      isSystematicActive.maxSelectTotalNumber ==
                                        number
                                        ? theme.Primary
                                        : theme.White,
                                    marginLeft: 2,
                                    marginRight: 2,
                                  }}>
                                  <Text
                                    style={{
                                      color:
                                        isSystematicActive.maxSelectTotalNumber ==
                                          number
                                          ? theme.White
                                          : theme.Primary,
                                      fontWeight: 'bold',
                                    }}>
                                    {number}
                                  </Text>
                                </TouchableOpacity>
                              ),
                            )}
                        </View>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: theme.TextBlack }}>
                          {isSystematicActive.maxSelectTotalNumber} Numbers ={' '}
                          {isSystematicActive.maxLines}{' '}
                          {StringsOfLanguages.lines}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              ) : (
                <></>
              )}
              <Divider />
            </View>
            {/*  Dynamic Table View */}
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                {selectTicket.map((ele, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ marginHorizontal: 8, marginTop: 10 }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: theme.Primary,
                        width: 60,
                        height: 71,
                        borderRadius: 4,
                        position: 'relative',
                        zIndex: -1,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          height: 20,
                          backgroundColor: theme.Primary,
                        }}>
                        <Text style={{ color: theme.White }}>{index + 1}</Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: theme.Primary,
                          height: 50,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          overflow: 'hidden',
                        }}>
                        {mainFillArr.map((_, index) => (
                          <>
                            <View
                              key={index}
                              style={{
                                width: 11,
                                height: 12,
                                borderLeftWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: theme.Primary,
                              }}
                            />
                          </>
                        ))}
                      </View>
                    </View>
                    {/* <Image source={require('../../assets/images/checkIcon.png')} style={{ position: 'absolute', alignItems: 'center', bottom: -8, width: 15, height: 15, zIndex: 999, left: 22 }} /> */}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Pick your Number */}
            {enableCustomerPickNumber && (
              <View style={{ marginTop: 16, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setIsShowTickets(true)}
                  style={{
                    width: 160,
                    borderWidth: 1,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 90,
                    backgroundColor: theme.lightGray,
                    borderColor: theme.lightGray,
                  }}>
                  <Text style={{ color: theme.TextBlack }}>{StringsOfLanguages.pickYourNumber}</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Quick Pick Number */}
            {enableCustomerPickNumber && (
              <View style={{ marginTop: 16, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => handleQuickPickAll()}
                  style={{
                    width: 160,
                    borderWidth: 1,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 90,
                    backgroundColor: theme.Primary,
                    borderColor: theme.Primary,
                  }}>
                  <Text style={{ color: theme.White }}>
                    {StringsOfLanguages.quickPlay}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* View Your Number */}
            {enableCustomerPickNumber && (
              <View style={{ marginTop: 16, alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setIsShowYourNumberTickets(true)}
                  style={{
                    width: 160,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: theme.Primary,
                      textDecorationLine: 'underline',
                      marginRight: 5,
                    }}>
                    {StringsOfLanguages.viewYourNumber}
                  </Text>
                  <Image
                    source={require('../../assets/images/eyeIcon.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View>
              <Divider />
              <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.TextBlack }}>
                  {StringsOfLanguages.entry}:
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10, paddingBottom: 40 }}>
                <RadioButton.Group
                  onValueChange={newValue => {
                    setPaymentType(newValue);
                  }}
                  value={paymentType}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton.Android value="one-time-entry" />
                    <Text style={{ color: theme.TextBlack }}>{StringsOfLanguages.oneTimeEntry}</Text>
                  </View>
                  {/* {isMultiDraw.includes(selectTicket.length) && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton.Android value="multi-draw" />
                      <View>
                        <Text style={{color:theme.TextBlack }}>Multi-Draw</Text>
                        <Text style={{ fontSize: 10, color: theme.gray }}>
                          Up to 52 Draws,up to 25% Discount
                        </Text>
                      </View>
                    </View>
                  )} */}
                  {/* {paymentType == 'multi-draw' &&
                    isMultiDraw.includes(selectTicket.length) && (
                      <View style={{ marginHorizontal: 10 }}>
                        <SelectInputComponent
                          placeholder="MultiDraw"
                          returnKeyType="next"
                          setPaymentType={setMultiDraw}
                          value={multiDraw}
                          showDropDown={() => setShowDropDown(true)}
                          onDismiss={() => setShowDropDown(false)}
                          handleshowDropDown={() =>
                            setShowDropDown(!showDropDown)
                          }
                          list={multiDrawList}
                        />
                      </View>
                    )} */}
                  {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton.Android value="subscription" />
                    <Text >Subscription</Text>
                  </View> */}
                </RadioButton.Group>
                {isLoggedIn && (
                  <View
                    style={{
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <View style={{ width: '40%' }}>
                      <TextInputComponent
                        placeholder={StringsOfLanguages.couponCode}
                        returnKeyType="next"
                        onChangeText={text =>
                          setCouponCode({
                            couponCode: text,
                            isValid: false
                          })
                        }
                        value={couponCode.couponCode}
                        error={couponCode.error}
                        errorText={couponCode.error || ''}
                        autoCapitalize="none"
                        autoCompleteType="couponCode"
                        textContentType="couponCode"
                        keyboardType="email-address"
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => applyCoupon()}
                      style={{
                        width: 160,
                        borderWidth: 1,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 90,
                        backgroundColor: theme.Primary,
                        borderColor: theme.Primary,
                      }}>
                      <Text style={{ color: theme.White }}>
                        {StringsOfLanguages.applyCoupon}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {lotteryDetailsData.type == "MegaMillions" && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Checkbox.Android
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <Text style={{ fontSize: 16, color: theme.Black }}>Multiply your prize up to 5 times</Text>
                </View>}
                <Card style={{ paddingVertical: 10, paddingHorizontal: 12, paddingBottom: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{StringsOfLanguages.priceSummary}</Text>
                  <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                    <Text style={{ color: theme.TextBlack, fontWeight: '800', fontSize: 14 }}>{StringsOfLanguages.subTotal}:</Text>
                    <Text style={{ color: theme.TextBlack, fontSize: 14, fontWeight: '600' }}>
                      {StringsOfLanguages.symbol}{parseFloat(nFormatter(subTotalDisplay)).toFixed(2)}
                    </Text>
                  </View>
                  {couponCode.isValid && <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                    <Text style={{ color: theme.TextBlack, fontWeight: '800', fontSize: 14 }}>{StringsOfLanguages.discount}:</Text>
                    <Text style={{ color: theme.TextBlack, fontSize: 14, fontWeight: '600' }}>
                      {StringsOfLanguages.symbol}{nFormatter(parseFloat(discountDisplay).toFixed(2))}
                    </Text>
                  </View>}
                  <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                    <Text style={{ color: theme.TextBlack, fontWeight: '800', fontSize: 14 }}>{StringsOfLanguages.serviceFee}:</Text>
                    <Text style={{ color: theme.TextBlack, fontSize: 14, fontWeight: '600' }}>
                      {StringsOfLanguages.symbol} {nFormatter(parseFloat(serviceFeeDisplay).toFixed(2))}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                    <Text style={{ color: theme.TextBlack, fontWeight: '800', fontSize: 14 }}>{StringsOfLanguages.total}:</Text>
                    <Text style={{ color: theme.TextBlack, fontSize: 14, fontWeight: '600' }}>
                      {StringsOfLanguages.symbol}{parseFloat(nFormatter(totalDisplay)).toFixed(2)}
                    </Text>
                  </View>
                </Card>
                <View style={{ paddingVertical: 10 }}>
                  <TouchableOpacity
                    onPress={handleOneTimePayment}
                    style={{
                      width: deviceWidth - 20,
                      borderWidth: 1,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 90,
                      backgroundColor: theme.Primary,
                      borderColor: theme.Primary,
                    }}>
                    <Text style={{ color: theme.White }}>
                      {StringsOfLanguages.play}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        <QuestionMarkModal
          isVisible={isShowQuestion}
          handleClose={handleCloseQuestion}
        />
        {isSystematicActive.active ? (
          <TicketNumberModal
            isVisible={isShowTickets}
            handleClose={handleCloseTicket}
            selectTicket={selectTicket}
            totalShowNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowNumber
            }
            totalShowPowerNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber
            }
            maxSelectTotalNumber={isSystematicActive?.maxSelectTotalNumber}
            maxSelectTotalPowerNumber={
              isSystematicActive?.maxSelectTotalPowerNumber
            }
            setSelectTicket={setSelectTicket}
          />
        ) : (
          <TicketNumberModal
            isVisible={isShowTickets}
            handleClose={handleCloseTicket}
            selectTicket={selectTicket}
            totalShowNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowNumber
            }
            totalShowPowerNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber
            }
            maxSelectTotalNumber={
              lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber
            }
            maxSelectTotalPowerNumber={
              lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber
            }
            setSelectTicket={setSelectTicket}
          />
        )}
        {isSystematicActive.active ? (
          <ChooseYourNumberModal
            isVisible={isShowYourNumberTickets}
            handleClose={handleCloseYourNumberTicket}
            selectTicket={selectTicket}
            setSelectTicket={setSelectTicket}
            totalShowNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowNumber
            }
            totalShowPowerNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber
            }
            maxSelectTotalNumber={isSystematicActive?.maxSelectTotalNumber}
            maxSelectTotalPowerNumber={
              isSystematicActive?.maxSelectTotalPowerNumber
            }
          />
        ) : (
          <ChooseYourNumberModal
            isVisible={isShowYourNumberTickets}
            handleClose={handleCloseYourNumberTicket}
            selectTicket={selectTicket}
            setSelectTicket={setSelectTicket}
            totalShowNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowNumber
            }
            totalShowPowerNumber={
              lotteryDetailsData?.numbersPerLine?.totalShowPowerNumber
            }
            maxSelectTotalNumber={
              lotteryDetailsData?.numbersPerLine?.maxSelectTotalNumber
            }
            maxSelectTotalPowerNumber={
              lotteryDetailsData?.numbersPerLine?.maxSelectTotalPowerNumber
            }
          />
        )}
      </MainContainer>
      {showPaymentModal && (
        <Paypal
          isVisible={showPaymentModal}
          onClose={handleClose}
          transactionData={transactionPayloadData}
        />
      )}
      <ActionSheet
        ref={actionSheet}
        title={title}
        message={message}
        options={userDetails?.wallet?.amount > 0 ? ['Pay with Paypal', 'Pay with Paypal + wallet', 'Pay with Wallet', 'Cancel'] : ['Pay with Paypal', 'Cancel']}
        cancelButtonIndex={userDetails?.wallet?.amount > 0 ? 3 : 2}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={handleActionSheet}
      />
    </>
  );
}
export default LotteryDetails;

const styles = StyleSheet.create({
  base: {},
  baseTop: {
    borderBottomWidth: 10,
    borderBottomColor: theme.White,
    borderBottomColor: theme.Primary,
    borderLeftWidth: 15,
    borderTopColor: theme.White,
    borderLeftColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    height: 0,
    width: 0,
    left: 65,
    top: -10,
    position: 'absolute',
  },
});
