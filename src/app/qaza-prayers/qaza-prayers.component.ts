import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Prayer } from './prayer.interface';
import { NgxChromeStorageService } from 'ngx-chrome-storage';

@Component({
  selector: 'ayat-qaza-prayers',
  templateUrl: './qaza-prayers.component.html',
  styleUrls: ['./qaza-prayers.component.css']
})
export class QazaPrayersComponent implements OnInit {

  form: FormGroup;
  counterValue = 0;
  minValue = 0;
  maxValue = 9999;
  prayers: Prayer[] = [
      {name: 'Fajr', value: 0},
      {name: 'Zuhr', value: 0},
      {name: 'Asar', value: 0},
      {name: 'Maghrib', value: 0},
      {name: 'Isha', value: 0},
      {name: 'Witr', value: 0},
    ];
  constructor(private fb: FormBuilder, private zone: NgZone, private settings: NgxChromeStorageService) { }

  ngOnInit() {
    this.settings.getChrome('qazaData', this.prayers).then((data: Prayer[]) => {
       this.prayers = data;
     });
    this.form = this.fb.group({
        counter: this.counterValue
      });
  }

  onChange(prayer: Prayer): void {
    this.prayers.forEach((target, i) => {
      if (target.name === prayer.name) {
        this.prayers[i] = prayer;
      }
    });
    this.settings.setAll(this.prayers, 'qazaData');
  }

}
