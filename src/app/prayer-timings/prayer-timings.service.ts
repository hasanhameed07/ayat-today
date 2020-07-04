import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
/** Dummy version of an authenticated user service */
export class PrayerTimingsService {


  constructor(private http: HttpClient) {}

  getTimings(address: string, method: number): Observable<any> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const timestamp = Math.ceil(startOfDay.getTime() / 1000);
    const cachedTimestamp = localStorage.getItem('cached_prayer_timestamp');
    if (cachedTimestamp !== null && timestamp === +cachedTimestamp) {
      const prayers = JSON.parse(localStorage.getItem('cached_prayer_timings'));
      if (prayers) {
        return  of(prayers);
      }
    } else {
      localStorage.setItem('cached_prayer_timestamp', timestamp + '');
    }

    const url = `http://api.aladhan.com/timingsByAddress/${timestamp}?&method=${method}&school=1&address=${address}`;

    return this.http.get(url)
    .pipe(
      map((res: any) => {
        const data = res.data.timings;
        const prayers = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            prayers.push({key, val: data[key]});
          }
        }
        localStorage.setItem('cached_prayer_timings', JSON.stringify(prayers));
        return prayers;
      })
    );
  }

}
