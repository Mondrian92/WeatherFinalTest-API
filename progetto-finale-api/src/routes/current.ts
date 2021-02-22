import { Request, Response, Router } from "express";
import { weather as weatherApi } from "../main";
import { param, query, header } from "express-validator";
import { validationHandler } from "../validation";
import { CountryCode } from "openweathermap-ts/dist/types/CountryCode"
import { Unit } from "openweathermap-ts/dist/types/Unit"
import { isLogged } from '../isLogged'
import cors from "cors"

const router = Router();
router.use(cors());

router.get(
  "/cities/:cityName",
  isLogged,
  param("cityName").isString(),
  header("unit").custom( ( value ) => value != 'metric' || value != 'imperial' || value != 'standard'),
  validationHandler,
  async ({ params: { cityName }, headers: { unit } }: Request, res: Response) => {
    try {
      weatherApi.setUnits(<Unit>unit);
      const {weather, 
        main: {temp, temp_min, temp_max, pressure, humidity}, 
        wind, 
        name, 
        sys, 
        coord, 
        id} = await weatherApi.getCurrentWeatherByCityName({ cityName })
      var forecast = {
        temp :{
          temp,
          temp_min,
          temp_max,
          pressure,
          humidity
        },
        wea:{
          main:weather[0].main,
          description:weather[0].description,
          icon:weather[0].icon
        },
        wind:{
          speed:wind.speed
        }
      }
      var city = {
        id,
        name,
        coord: {
            lat:coord.lat,
            lon:coord.lon,
        },
        country:sys.country,
        sunrise:sys.sunrise,
        sunset:sys.sunset
      }
      res.status(200).json({forecast, city});
    } catch (error) {
      res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

router.get(
  "/id/:cityId",
  isLogged,
  param("cityId").isNumeric(),
  header("unit").custom( ( value ) => value != 'metric' || value != 'imperial' || value != 'standard'),
  validationHandler,
  async ({ params: { cityId }, headers: { unit } }: Request, res: Response) => {
    try {
      weatherApi.setUnits(<Unit>unit);
      const {weather,main,wind,name,sys,coord,id} = await weatherApi.getCurrentWeatherByCityId(Number(cityId))
      var forecast = {
        temp :{
          temp:main.temp,
          temp_min:main.temp_min,
          temp_max:main.temp_max,
          pressure:main.pressure,
          humidity:main.humidity
        },
        wea:{
          main:weather[0].main,
          description:weather[0].description,
          icon:weather[0].icon
        },
        wind:{
          speed:wind.speed
        }
      }
      var city = {
        id,
        name,
        coord: {
            lat:coord.lat,
            lon:coord.lon,
        },
        country:sys.country,
        sunrise:sys.sunrise,
        sunset:sys.sunset
      }
      res.status(200).json({forecast, city});
    } catch (error) {
      res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

router.get(
  "/coutries/:countryCode/zipcodes/:zipCode",
  isLogged,
  param("zipCode").isNumeric(),
  param("countryCode").isString().isLength({ min: 2, max: 2 }),
  header("unit").custom( ( value ) => value != 'metric' || value != 'imperial' || value != 'standard'),
  validationHandler,
  async ({ params: { zipCode, countryCode }, headers: { unit } }: Request, res: Response) => {
    try {
      weatherApi.setUnits(<Unit>unit);
      const {weather,main,wind,name,sys,coord,id} = await weatherApi.getCurrentWeatherByZipcode(
        Number(zipCode), 
        <CountryCode>countryCode
        )
      var forecast = {
        temp :{
          temp:main.temp,
          temp_min:main.temp_min,
          temp_max:main.temp_max,
          pressure:main.pressure,
          humidity:main.humidity
        },
        wea:{
          main:weather[0].main,
          description:weather[0].description,
          icon:weather[0].icon
        },
        wind:{
          speed:wind.speed
        }
      }
      var city = {
        id,
        name,
        coord: {
            lat:coord.lat,
            lon:coord.lon,
        },
        country:sys.country,
        sunrise:sys.sunrise,
        sunset:sys.sunset
      }
      res.status(200).json({forecast, city});
    } catch (error) {
      res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

router.get(
  "/coordinates",
  isLogged,
  query("long").isNumeric(),
  query("lat").isNumeric(),
  header("unit").custom( ( value ) => value != 'metric' || value != 'imperial' || value != 'standard'),
  validationHandler,
  async ({ query: { long, lat }, headers: { unit } }: Request, res: Response) => {
    try {
      weatherApi.setUnits(<Unit>unit);
      const {weather,main,wind,name,sys,coord,id} = await weatherApi.getCurrentWeatherByGeoCoordinates(
        Number(lat),
        Number(long)
      )
      var forecast = {
        temp :{
          temp:main.temp,
          temp_min:main.temp_min,
          temp_max:main.temp_max,
          pressure:main.pressure,
          humidity:main.humidity
        },
        wea:{
          main:weather[0].main,
          description:weather[0].description,
          icon:weather[0].icon
        },
        wind:{
          speed:wind.speed
        }
      }
      var city = {
        id,
        name,
        coord: {
            lat:coord.lat,
            lon:coord.lon,
        },
        country:sys.country,
        sunrise:sys.sunrise,
        sunset:sys.sunset
      }
      res.status(200).json({forecast, city});
    } catch (error) {
      res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

export { router as current };
