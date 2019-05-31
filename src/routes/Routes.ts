import {Router} from 'express';
import {MpesaController} from '../controllers/MpesaController';
import {validationMiddleware} from '../joi/middleware/middleware';
import {initPaymentSchema} from '../joi/schemas/schema';

class Routes {
    router: Router;
    mpesaCtlr: MpesaController;

    constructor() {
        this.router = Router();
        this.mpesaCtlr = new MpesaController();
        this.routes();
    }

    private routes(): void {
        this.router.post('/stkpush/init', validationMiddleware(initPaymentSchema.params,  'body'), this.mpesaCtlr.stkPush);
        this.router.post('/c2b/callback/register', this.mpesaCtlr.registerC2BCallback);
        this.router.post('/c2b/simulate', this.mpesaCtlr.simulateC2B);
    }
}

export default new Routes().router;