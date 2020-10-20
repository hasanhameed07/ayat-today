import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QazaPrayersComponent } from './qaza-prayers/qaza-prayers.component';
import { QuranComponent } from './quran/quran.component';
import { PrayerTimingsComponent } from './prayer-timings/prayer-timings.component';
import { SettingsComponent } from './settings/settings.component';
import { RootComponent } from './root/root.component';
import { AyatHistoryComponent } from './ayat-history/ayat-history.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: RootComponent,
    children: [
      {
        path: '',
        component: QuranComponent
      },
      {
        path: 'qazaPrayers',
        component: QazaPrayersComponent
      },
      {
        path: 'timings',
        component: PrayerTimingsComponent
      },
      {
        path: 'ayatHistory',
        component: AyatHistoryComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }


    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
