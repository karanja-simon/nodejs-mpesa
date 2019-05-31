
import request from 'request';
import * as auth from './auth';

const URL = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate';

  /**
   * @function initiateC2B          Initiates a C2B transaction.           
   *
   * @param {String} token          A valid Mpesa API token.
   * 
   * @param {String} shortCode      Paybill number/till number, which you 
   *                                expect to receive payments notifications about.
   *
   * @param {String} commandID      This is a transaction type identifier, which Identifies 
   *                                the type of C2B transaction being made
   * 
   * @param {String} msisdn         This is the test phone number of the virtual customer 
   *                                paying to your paybill. Use the one given in your test 
   *                                credentials section (Test MSISDN) to test. Testing using 
   *                                your own phone numbers will not work with this API since 
   *                                the numbers need to be registered on the testbed first. 
   *                                The number should either begin with 07XX or 2547XX (for now). 
   *                                International numbers are not supported.
   * 
   * @param {String} billRefNumber  This simulates the account number that a user would have entered 
   *                                when making a Pay Bill request. This parameter is only required 
   *                                for CustomerPayBillOnline transaction type. It is sent as part of 
   *                                the validation and confirmation requests to you (3rd party) to 
   *                                validate and confirm. It has a maximum of 20 characters.
   *
   * 
   * @returns {Promise}            
   * @api public
 
   */

export const initiateC2B = (token:string, shortCode: string, amount: string, msisdn: string, billRefNumber = "account"): Promise<any> => {
  const auth = `Bearer ${token}`;
  return new Promise((resolve, reject) => {

  request(
    {
      method: 'POST',
      url: URL,
      headers: {
        "Authorization": auth
      },
      json : {
        "ShortCode": shortCode,
        "CommandID":"CustomerPayBillOnline",
        "Amount": amount,
        "Msisdn": msisdn,
        "BillRefNumber":billRefNumber
      }
    },
    (error, response, body) => {
      if (error) {return reject(error)}
      resolve(body);
    }
  );
      
});
}