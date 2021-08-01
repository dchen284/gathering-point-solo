
export default function formatTime(strTime) {
    //template: 1998-05-24T23:22:37

    if (!strTime) {return null}

    const date = new Date(strTime);

    const objDays = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tues',
        3: 'Wed',
        4: 'Thurs',
        5: 'Fri',
        6: 'Sat',
    }


    const objMonths = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sept',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    }

    const strDate = `${objDays[date.getUTCDay()]}, ${objMonths[date.getUTCMonth()]} ${date.getUTCDate()}`;

    // const strDate = strTime.slice(0, 10);
    const strHour = strTime.slice(11, 13);
    const strMinutes = strTime.slice(14, 16);

    let strFormattedTime;

    if (+strHour <= 12) {
        strFormattedTime = `${strDate}, ${strHour}:${strMinutes} AM`;
    }
    else if (+strHour >= 13 && +strHour <= 21)
    {
        strFormattedTime = `${strDate}, 0${+strHour-12}:${strMinutes} PM`;
    }
    else {
        strFormattedTime = `${strDate}, ${+strHour-12}:${strMinutes} PM`;
    }

    return strFormattedTime
}