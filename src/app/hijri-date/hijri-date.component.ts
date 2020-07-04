import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hijri-date',
  templateUrl: './hijri-date.component.html',
  styleUrls: ['./hijri-date.component.css']
})
export class HijriDateComponent implements OnInit {

  date: string;
  constructor() { }

  ngOnInit() {
    let formatter = new Intl.DateTimeFormat('ar-PK-u-ca-islamic');
    let  dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 1);
    this.date = formatter.format(dateObj);
  }

}
