export interface AuthRes {    
    message: string,
    user:{
        name: string,
        surname: string,
        username: string,
        email: string,
        password: string,
        unit: string
    }
    token: string,
    error: string,
    isLogged: boolean
}
