import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { QuranService } from './quran.service';
import { NgxChromeStorageService } from 'ngx-chrome-storage';
declare var domtoimage: any;

@Component({
  selector: 'ayat-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.css']
})
export class QuranComponent implements OnInit, OnDestroy {
  ayah: any;
  showEnglishTranslation = true;
  translation: string;
  audio: HTMLAudioElement;
  isPlaying = false;
  duration = 0;

  constructor(private quran: QuranService, private settings: NgxChromeStorageService, private zone: NgZone) {}

  ngOnDestroy() {
    this.pauseAyah();
  }

  ngOnInit() {
    this.showEnglishTranslation = this.settings.config?.showEnglish;
    this.translation = this.settings.config?.translation;
    this.loadAyah();
  }

  loadAyah() {
    this.pauseAyah();
    this.ayah = {
      text: '',
      number: 0,
      surah: '',
      translationText: '',
      secondTranslationText: ''
    };
    const ayahNum = this.quran.randomAyahNum();
    this.quran.getAyah(ayahNum, this.showEnglishTranslation, this.translation)
          .subscribe(
              ayah => {
                this.ayah = ayah;
              },
              err => {
                  console.log(err);
              });
    this.audio = this.quran.getAudio(ayahNum);
    // Gets audio file duration
    this.audio.addEventListener('canplaythrough', () => this.zone.run(() => {
      this.duration = this.audio.duration;
    }), false);
    this.audio.addEventListener('timeupdate', () => this.zone.run(() => {
       if (this.audio.currentTime === this.duration) {
         this.isPlaying = false;
       }
    }), true);
  }

  capture() {
    const origEl = document.getElementById('coverContainer');
    const srcEl = origEl.cloneNode(true).firstChild.parentElement;
    srcEl.id = 'coverContainerDup';
    srcEl.className += ' pattern-bg';
    // srcEl.style.width = '650px';
    srcEl.style.padding = '80px 20px';
    srcEl.style.background = 'url("assets/flowers.png") repeat';
    srcEl.style.opacity = '0';
    origEl.parentElement.appendChild(srcEl);
    // Save original size of element
    const originalWidth = srcEl.offsetWidth;
    const originalHeight = srcEl.offsetHeight;
    // Force px size (no %, EMs, etc)
    srcEl.style.width = originalWidth + 'px';
    srcEl.style.height = originalHeight + 'px';
    srcEl.style.position = 'absolute';
    srcEl.style.top = '0';
    srcEl.style.left = '0';
    srcEl.style.opacity = '1';

    domtoimage.toPng(srcEl, { quality: 1, bgcolor: 'rgba(5, 9, 26)' })
    .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'ayat-today.png';
        link.href = dataUrl;
        link.click();
        srcEl.parentNode.removeChild(srcEl);
    });
  }


  playAyah() {
    if (this.audio) {
      this.audio.play();
    }
    this.isPlaying = true;
  }

  pauseAyah() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
  }
}
