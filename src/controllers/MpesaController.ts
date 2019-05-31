import { Request, Response } from 'express';
import request from 'request';
import * as Util from '../utils/Utils';
import * as auth from './../mpesa/auth';
import * as callback from './../mpesa/callback.register';
import * as c2b from './../mpesa/c2b';
import * as stk from './../mpesa/stkpush';
import {config} from './../config/config';


const VALIDATION_URL = config.validation_url;
const CONFIRMATION_URL = config.confirmation_url;
const CALLBACK_URL = config.callback_url;
let   token = '';

class MpesaController {

    constructor() {
        auth.getAccessToken().then(data => {
            token = data.token;
        }).catch(err => {
            console.log('Err: ', err);
        }) ;
     }

    registerC2BCallback(req: Request, res: Response): void {
        callback.registerCallbackUrl(token, '601426', 'Completed', CONFIRMATION_URL, VALIDATION_URL).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            console.error(error);
            res.status(400).json({erros: {id: 1, message: 'Unable to register C2B callback. Try again later!'}});
        });
    }

    simulateC2B(req: Request, res: Response): void {
        c2b.initiateC2B(token, '601426', '5', '254708374149').then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            console.error(error);
            res.status(400).json({erros: {id: 2, message: 'Unable to simulate a C2B. Try again later!'}});
        });
    }

    stkPush(req: Request, res: Response): void {
        const {phoneNo, amount} = req.body;
            console.log('Initiating CB2');
            const shortCode = config.short_code;
            stk.initSTKPush(token, shortCode, amount, phoneNo, shortCode, phoneNo, CALLBACK_URL).then(data => {
                console.log('Data: ', data);
                res.status(200).json(data);
            }).catch(error => {
                console.log('Error: ', error);
                res.status(400).json({erros: {id: 3, message: 'Unable to initialize STK Push. Try again later!'}});
            });
    }
}

export { MpesaController };