import express, {Request, Response, NextFunction} from "express";
import OpenWeatherMap from 'openweathermap-ts';
import {weather} from '../main'
//const weather = new OpenWeatherMap({apiKey: '340269648576eaaff42a70eb35325e3a'});
const router = express.Router();

router.get('/cities/:cityName', async ({ params: {cityName}} : Request, res: Response) => {
    try {
        const wea = await weather.getThreeHourForecastByCityName({cityName});
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

router.get('/id/:cityId', async ({ params: {cityId}} : Request, res: Response) => {
    try {
        const wea = await weather.getThreeHourForecastByCityId(Number(cityId));
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

router.get('/zipcodes/:zipCode', async ({ params: {zipCode}} : Request, res: Response) => {
    try {
        const wea = await weather.getThreeHourForecastByZipcode(Number(zipCode));
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

router.get('/coordinates', async ({ query: {long, lat}} : Request, res: Response) => {
    try {
        const wea = await weather.getThreeHourForecastByGeoCoordinates(Number(lat), Number(long));
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

export { router as forecast }