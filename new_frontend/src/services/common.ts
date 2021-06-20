// common functions to be placed here

import jwt_decode from 'jwt-decode';

export function decodeJWT (params: any) {
    
    console.log(jwt_decode(params));
    return jwt_decode(params);
}