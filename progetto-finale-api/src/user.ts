export class User{
    constructor(
        private name: string,
        private surname: string,
        private username: string,
        private email: string,
        private password: string,
        private country: string,
        private city: string,
        private unit: string
    ){}
    

    getName = () => this.name;
    getSurname = () => this.surname;
    getUsername = () => this.username;
    getEmail = () => this.email;
    getPassword = () => this.password;
    getCountry = () => this.country;
    getCity = () => this.city;
    getUnit = () => this.unit;

    setName = () => this.name;
    setSurname = () => this.surname;
    setUsername = () => this.username;
    setEmail = () => this.email;
    setPassword = () => this.password;
    setCountry = () => this.country;
    setCity = () => this.city;
    setUnit = () => this.unit;





}