export function LotteryDetails(ele) {
    return {
        customerTicket: {
            hasMultiplier: false,
            lotteryId: "64395cb9ed5b3cdbeb61f4bb",
            tickets: [
                {
                    numbers: [1, 2, 3, 4, 5],
                    powerNumbers: [1, 2],
                },
                {
                    numbers: [1, 2, 3, 4, 6],
                    powerNumbers: [1, 3],
                },
                {
                    numbers: [1, 2, 3, 4, 7],
                    powerNumbers: [1, 5],
                },
                {
                    numbers: [1, 3, 4, 5, 8],
                    powerNumbers: [2, 5],
                },
            ],
            type: "one-time-entry",
            systematicNumber: null,
        },
        type: "multi-draw",
        customerCurrency: "KRW",
        multiDrawSelectedOption: 52
    }
}