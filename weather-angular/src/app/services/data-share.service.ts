import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  constructor() { }
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //public isForecastAvaible: BehaviorSubject<Promise<Object>> = new BehaviorSubject<Promise<Object>>(<Promise<Object>>());
}
