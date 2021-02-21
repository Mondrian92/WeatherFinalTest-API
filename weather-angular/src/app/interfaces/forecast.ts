    export interface Temp {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    }

    export interface Wea {
        main: string;
        description: string;
        icon: string;
    }

    export interface Wind {
        speed: number;
    }

    export interface Forecast {
        temp: Temp;
        wea: Wea;
        wind: Wind;
        time?: string;
    }

    export interface Coord {
        lat: number;
        lon: number;
    }

    export interface City {
        id: number;
        name: string;
        coord: Coord;
        country: string;
        population?: number;
        timezone?: number;
        sunrise: number;
        sunset: number;
    }

    export interface ForecastRes {
        forecast: Forecast[];
        city: City;
    }

    export interface CurrentRes {
        forecast: Forecast;
        city: City;
    }

    export interface mappedForecast { 
    [ key:string ]:Forecast[]
    }