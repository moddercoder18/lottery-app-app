import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import theme from "../../theme/resources";



const CountDownTimer = ({ date }) => {
    const COUNTDOWN_DATE = new Date(date).getTime();
    const [remainingTime, setRemainingTime] = useState(
        new Date(date).getTime()
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function getRemainingTime() {
        const now = new Date().getTime();
        const distance = COUNTDOWN_DATE - now;

        if (distance < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    return (
        <View>
            {remainingTime.days > 0 ? (
                <Text style={{ color: theme.White }}>{`${remainingTime.days}${remainingTime.days > 1 ? 'days' : 'day'} ${remainingTime.hours}: ${remainingTime.minutes}:${remainingTime.seconds}s`}</Text>
            ) : (
                <Text style={{ color: theme.White }}>{`${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}s`}</Text>
            )}
        </View>
    );
};

export default CountDownTimer;
