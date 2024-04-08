import { Settings } from 'ngx-chrome-storage';

export class SettingsConfig extends Settings {
  storeKey = 'ayattodaysettings';    // identifier to be used as a key for storage
  data = {
    backgroundImage: false,
    translation: 'ur.jalandhry',
    showEnglish: true,
    userLocation: 'Karachi, Pakistan',
    userPrayerMethod: 1,
    audioVoice: 'ar.alafasy'
  };
}
