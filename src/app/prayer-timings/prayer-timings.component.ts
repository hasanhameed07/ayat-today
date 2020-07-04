import { Component, OnInit } from '@angular/core';
import { PrayerTimingsService } from './prayer-timings.service';
import { NgxChromeStorageService } from 'ngx-chrome-storage';

@Component({
  selector: 'ayat-prayer-timings',
  templateUrl: './prayer-timings.component.html',
  styleUrls: ['./prayer-timings.component.css']
})
export class PrayerTimingsComponent implements OnInit {

  prayers: object[] = [];
  constructor(private prayer: PrayerTimingsService, private settings: NgxChromeStorageService) { }

  ngOnInit() {
    this.settings.onChange().subscribe((data) => {
      localStorage.removeItem('cachedprayer_timestamp'); // to reload the timings
    });
    this.loadPrayerTimings();
  }

  loadPrayerTimings() {
    this.prayer.getTimings(this.settings.config?.userLocation, this.settings.config?.userPrayerMethod)
    .subscribe(
      data => {
        this.prayers = data;
      },
      err => {
          console.log(err);
      });
  }

}
