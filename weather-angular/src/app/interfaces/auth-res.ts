export interface AuthRes {    
    message?: string,
    token?: string,
    city?:string,
    country?:string,
    unit?:string,
    error?: string,
    isLogged?: boolean
}
