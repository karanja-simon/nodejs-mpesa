
const PhoneNumber = require( 'awesome-phonenumber' );

interface ICallbackData {
    amount: number;
    mpesaReceiptNumber: string;
    transactionDate: string;
    phoneNumber: string;
}

export let getISOPhoneNo = (number: string): string => {
    const phoneNumber = new PhoneNumber( number, 'KE' );
    return phoneNumber.getNumber( 'e164' );
};

export const formatCallbackData = (data: any[]) : ICallbackData => {
    const callbackData: ICallbackData = {amount: data[0].Value, mpesaReceiptNumber: data[1].Value, transactionDate: data[3].Value, phoneNumber: data[4].Value};
    return callbackData;
}