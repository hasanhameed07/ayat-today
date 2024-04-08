import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { QuranService } from './quran.service';
import { NgxChromeStorageService } from 'ngx-chrome-storage';
import { ActivatedRoute } from '@angular/router';
declare var domtoimage: any;

@Component({
  selector: 'ayat-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.css'],
})
export class QuranComponent implements OnInit, OnDestroy {
  ayah: any;
  showEnglishTranslation = true;
  translation: string;
  audio: HTMLAudioElement;
  isPlaying = false;
  duration = 0;
  prefetchAyah = null;
  translationsHash = {};
  constructor(
    private quran: QuranService,
    private settings: NgxChromeStorageService,
    private zone: NgZone,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy() {
    this.pauseAyah();
  }

  ngOnInit() {
    this.showEnglishTranslation = this.settings.config?.showEnglish;
    this.translation = this.settings.config?.translation;
    this.settings.getChrome('prefetchAyah', null).then((data) => {
      if (data) {
        this.prefetchAyah = data;
      }
      const ayahNumQuery = this.route.snapshot.queryParams.ayahNum;
      this.loadAyah(Number(ayahNumQuery) || null);
    });
  }

  loadAyah(sequenceNum: number) {
    this.pauseAyah();
    this.ayah = {
      sequenceNum: 0,
      text: '',
      number: 0,
      surah: '',
      translationText: '',
      secondTranslationText: '',
    };

    if (this.prefetchAyah && !sequenceNum) {
      this.ayah = this.prefetchAyah.ayah;
      sequenceNum = this.prefetchAyah.sequenceNum;
      this.translationsHash = this.ayah.wordByWord;
      this.prefetchAyah = null;
      this.settings.setAll(null, 'prefetchAyah');
      this.setHistory(sequenceNum, this.ayah);
    } else {
      if (!sequenceNum) sequenceNum = this.quran.randomAyahNum();
      this.quran
        .getAyah(sequenceNum, this.showEnglishTranslation, this.translation)
        .subscribe(
          (ayah) => {
            this.ayah = ayah;
            this.translationsHash = this.ayah.wordByWord;
            this.setHistory(sequenceNum, ayah);
          },
          (err) => {
            console.log(err);
          }
        );
    }

    this.audio = this.quran.getAudio(sequenceNum);
    // Gets audio file duration
    this.audio.addEventListener(
      'canplaythrough',
      () =>
        this.zone.run(() => {
          this.duration = this.audio.duration;
        }),
      false
    );
    this.audio.addEventListener(
      'timeupdate',
      () =>
        this.zone.run(() => {
          if (this.audio.currentTime === this.duration) {
            this.isPlaying = false;
          }
        }),
      true
    );

    // prefetching random ayah
    this.prefetchNextAyah();
  }

  private prefetchNextAyah() {
    const sequenceNum = this.quran.randomAyahNum();
    this.quran
      .getAyah(sequenceNum, this.showEnglishTranslation, this.translation)
      .subscribe(
        (ayah) => {
          this.prefetchAyah = { sequenceNum, ayah };
          this.settings.setAll(this.prefetchAyah, 'prefetchAyah');
        },
        (err) => {
          console.log(err);
        }
      );
    return sequenceNum;
  }

  private setHistory(sequenceNum: number, ayah: any) {
    this.settings.getChrome('ayatHistory', []).then((data: any[]) => {
      if (!data.some(histAyah => histAyah.sequenceNum === sequenceNum)) {
        const historyObj = {
          text: ayah.text,
          number: ayah.number,
          surah: ayah.surah,
          sequenceNum,
        };
        if (data.length > 9) {
          data.pop();
        }
        this.settings.setAll([historyObj, ...data], 'ayatHistory');
      }
    });
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

    domtoimage
      .toPng(srcEl, { quality: 1, bgcolor: 'rgba(5, 9, 26)' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'ayat-today.png';
        link.href = dataUrl;
        link.click();
        srcEl.parentNode.removeChild(srcEl);
      });
  }

  previousAyah() {
    this.loadAyah( this.ayah.sequenceNum-1 );
  }

  nextAyah() {
    this.loadAyah( this.ayah.sequenceNum+1 );
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
