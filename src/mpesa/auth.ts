import request from 'request';

interface IToken {
    token: string;
}

const CONSUMER_KEY = 'zsAWNUbUkQoiLBYAMmEiWUGWM9OUhFKt';
const CONSUMER_SECRET = 'MTaWUHm8FDL1NpzS';
const URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

export const getAccessToken = (): Promise<IToken> => {
        let auth = `Basic ${Buffer.from(CONSUMER_KEY + ":" + CONSUMER_SECRET).toString("base64")}`;
        return new Promise<IToken>( (resolve, reject) =>{
            request({
                url: URL,
                headers: {"Authorization" : auth},
            },  (error, response, body) => {
                if (error) {reject(error); console.log;}
    
                const token  = JSON.parse(body).access_token;
                console.log('Access token: ', token);
                resolve({token: token});
            });
        }
        );
}
