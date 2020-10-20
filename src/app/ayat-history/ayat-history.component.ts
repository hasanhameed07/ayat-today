import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChromeStorageService } from 'ngx-chrome-storage';

@Component({
  selector: 'ayat-ayat-history',
  templateUrl: './ayat-history.component.html',
  styleUrls: ['./ayat-history.component.scss']
})
export class AyatHistoryComponent implements OnInit {

  constructor(private settings: NgxChromeStorageService, private router: Router) { }
  history: [];
  ngOnInit(): void {
    this.settings.getChrome('ayatHistory', []).then(data => {
      this.history = data;
    });
  }

  getAyah(ayahNum) {
    this.router.navigate(['/app/'], { queryParams: { ayahNum } });
  }

}
