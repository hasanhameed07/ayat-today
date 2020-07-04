import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {

  urls: string[];

  constructor(private http: HttpClient) { }

  getImages() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const timestamp = Math.ceil(startOfDay.getTime() / 1000);
    const cachedTimestamp = localStorage.getItem('cached_images_timestamp');
    if (cachedTimestamp !== null && timestamp === +cachedTimestamp) {
      this.urls = JSON.parse(localStorage.getItem('cached_images'));
      if (this.urls) {
        return  of(this.getRandomImage());
      }
    } else {
      localStorage.setItem('cached_images_timestamp', timestamp + '');
    }

    const url = `https://firebasestorage.googleapis.com/v0/b/ayattoday-19ac3.appspot.com/o/background.json?alt=media`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          if (!res.urls) {
            return null;
          }
          this.urls = res.urls;
          localStorage.setItem('cached_images', JSON.stringify(this.urls));
          return this.getRandomImage();
        })
      );
  }

  getRandomImage() {
    if (!(this.urls && this.urls.length)) {
      return null;
    }
    return this.urls[Math.floor(Math.random() * this.urls.length)];
  }

}
