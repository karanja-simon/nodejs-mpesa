import request from 'request';
import moment from 'moment';

const URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

export const initSTKPush = (token: string, shortCode: string, amount: string, partyA: string, partyB: string, phoneNumber: string, callbackURL: string, accountReference="ref", transactionDesc = "__"): Promise<any> => {

    const auth = `Bearer ${token}`;
    const timestamp = moment(moment.now()).format("YYYYMMDDHHmmss");
    const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';//process.env.PASSKEY;

    return new Promise<any>((resolve, reject) => {
        request(
            {
              method: 'POST',
              url : URL,
              headers : {
                "Authorization" : auth
              },
              json : {
                "BusinessShortCode": shortCode,
                "Password": Buffer.from(shortCode + passkey + timestamp).toString("base64"),
                "Timestamp": moment(moment.now()).format("YYYYMMDDHHmmss"),
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": partyA,
                "PartyB": partyB,
                "PhoneNumber": phoneNumber,
                "CallBackURL": callbackURL,
                "AccountReference": accountReference,
                "TransactionDesc": transactionDesc
              }
            },
            (error, response, body) => {
                if (error) reject(error); 
                resolve(body);
            }
          );
    }); 
}
