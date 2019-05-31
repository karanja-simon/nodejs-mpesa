
import request from 'request';

const URL = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl';


  /**
   * registerCallbackUrl          Registers a call back url for a C2B Mpesa transactions.
   *                              This is the url that will be invoked by Mpesa API when
   *                              a transaction happens.
   *
   * @param {String} token        a valid Mpesa API token.
   * @param {String} shortCode    paybill number/till number, which you 
   *                              expect to receive payments notifications about.
   *
   *
   * @param {String} responseType This is the default action value that determines what M-Pesa 
   *                              will do in the scenario that your Validation endpoint is unreachable 
   *                              or is unable to respond on time. Only two values are allowed: 
   *                              Completed or Cancelled. Completed means M-Pesa will automatically 
   *                              complete your transaction, whereas Cancelled means M-Pesa will 
   *                              automatically cancel the transaction.
   *   
   * @param {String} confirmationURL
   * 
   * @param {String} validationURL
   * 
   * @returns {Promise}
   * 
   * @api public
   */

export const registerCallbackUrl = (token: string, shortCode: string, responseType: string, confirmationURL: string, validationURL: string): Promise<any> => {

    const auth = `Bearer ${token}`;

    return new Promise((resolve, reject) => {
    request(
        {
          method: 'POST',
          url : URL,
          headers : {
            "Authorization" : auth
          },
          json : {
            "ShortCode": shortCode,
            "ResponseType": responseType,
            "ConfirmationURL": confirmationURL,
            "ValidationURL": validationURL
          }
        },
        (error, response, body) => {
          if (error){ return reject(error)}
          resolve(body);
        }
      );
            
    });  
}
