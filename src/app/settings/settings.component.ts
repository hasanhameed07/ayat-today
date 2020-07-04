import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuranService } from '../quran/quran.service';
import { NgxChromeStorageService } from 'ngx-chrome-storage';


@Component({
  selector: 'ayat-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  translations: object[];
  prayerMethods: object[];
  audioVoices: object[];

  constructor(private fb: FormBuilder, private quran: QuranService, private settings: NgxChromeStorageService) {
  }

  ngOnInit() {
    this.translations = this.quran.getTranslations();
    this.translations.unshift({ key: 'none', name: 'Hide' });
    this.prayerMethods = [
      { key: 1, name: 'University of Islamic Sciences, Karachi' },
      { key: 2, name: 'Islamic Society of North America (ISNA)' },
      { key: 3, name: 'Muslim World League (MWL)' },
      { key: 4, name: 'Umm al-Qura, Makkah' },
      { key: 5, name: 'Egyptian General Authority of Survey' },
      { key: 7, name: 'Institute of Geophysics, University of Tehran' }
    ];
    this.audioVoices = this.quran.getAudioVoices();
    this.form = this.fb.group({
      backgroundImage: [this.settings.config?.backgroundImage],
      translation: [this.settings.config?.translation],
      showEnglish: [this.settings.config?.showEnglish],
      userLocation: [this.settings.config?.userLocation],
      userPrayerMethod: [this.settings.config?.userPrayerMethod],
      audioVoice: [this.settings.config?.audioVoice]
    });
    this.subcribeToFormChanges();
  }

  subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.form.valueChanges;
    // subscribe to the stream
    myFormValueChanges$.subscribe(settings => {
      this.settings.setAll(settings);
    });
  }
}
