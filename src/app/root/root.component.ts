import { Component, OnInit } from '@angular/core';
import { FlickrService } from './../flickr/flickr.service';
import { NgxChromeStorageService } from 'ngx-chrome-storage';
import {Router, Event, NavigationEnd} from '@angular/router';

@Component({
  selector: 'ayat-root-container',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {

  backgroundUrl = '';
  backgroundImage: boolean;
  styleProperty: object;
  routerUrl: string;
  backgroundImages: string[] = [];
  imagesLoaded = 0;
  appEvent = 'install';
  appVersion = '';

  constructor(private settings: NgxChromeStorageService, private flickr: FlickrService, public router: Router) {}

  ngOnInit() {
    const version = localStorage.getItem('app_version');
    this.appVersion = (chrome.runtime.getManifest) ? chrome.runtime.getManifest().version : null;
    if (version === null) {
      this.appEvent = 'install';
      localStorage.setItem('app_version', this.appVersion);
    } else if (version !== this.appVersion) {
      this.appEvent = 'updated';
      localStorage.setItem('app_version', this.appVersion);
    } else {
      this.appEvent = '';
    }

    this.routerUrl = this.router.url;
    this.router.events.subscribe((url: any) => this.routerUrl = url.url);
    this.router.events.subscribe(
          (event: Event) => {
              if (event instanceof NavigationEnd) {
                // ga('send', 'pageview', event.urlAfterRedirects);
              }
          });

    this.backgroundImage = this.settings.config?.backgroundImage;
    this.setBackground();
    this.settings.onChange().subscribe((data) => {
      if (data) {
        // detect background change only
        if (this.backgroundImage !== data.backgroundImage) {
          this.setBackground();
        }
        this.backgroundImage = data.backgroundImage;
      }
    });
  }

  setBackground() {
    if (this.settings.config?.backgroundImage && navigator.onLine) {
      this.flickr.getImages()
        .subscribe((image: any) => {
          if (image) {
            this.backgroundUrl = image;
            const style = {};
            style['background-image'] = 'url(' + this.backgroundUrl + ')';
            this.styleProperty = style;
          }
        }, err => console.log(err));
    } else {
      this.styleProperty = {};
    }
  }

  backgroundLoaded() {
    this.backgroundImages = this.flickr.urls;
  }

  whatsNewRead() {
    this.appEvent = '';
  }

  anImageLoaded() {
    this.imagesLoaded++;
  }

}
