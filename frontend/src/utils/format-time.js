
export default function formatTime(strTime) {
       //template: 1998-05-24T23:22:37

       const strDate = strTime.slice(0, 10);
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