export const getCurrentDateTimeInIST= () => {
    const now =new Date();
    const utcOffset = now.getTimezoneOffset() * 60000 ; //convert minutes to milisec
const istOffset =5.5*60*60*1000; //IST is UTC + 5:30
const isTime = new Date(now.getTime() + utcOffset + istOffset);
return isTime.toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
};