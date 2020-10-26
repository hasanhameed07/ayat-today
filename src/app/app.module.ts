import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxChromeStorageModule } from "ngx-chrome-storage";
import { RootComponent } from "./root/root.component";
import { QuranComponent } from "./quran/quran.component";
import { GsearchComponent } from "./gsearch/gsearch.component";
import { HijriDateComponent } from "./hijri-date/hijri-date.component";
import { QazaPrayersComponent } from "./qaza-prayers/qaza-prayers.component";
import { CounterInputComponent } from "./qaza-prayers/counter-input.component";
import { PrayerTimingsComponent } from "./prayer-timings/prayer-timings.component";
import { SettingsComponent } from "./settings/settings.component";
import { SettingsConfig } from "./settings/settings.class";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AyatHistoryComponent } from "./ayat-history/ayat-history.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipModule } from "ngx-bootstrap/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    QuranComponent,
    GsearchComponent,
    HijriDateComponent,
    QazaPrayersComponent,
    CounterInputComponent,
    PrayerTimingsComponent,
    SettingsComponent,
    AyatHistoryComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxChromeStorageModule.forRoot(new SettingsConfig()),
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
