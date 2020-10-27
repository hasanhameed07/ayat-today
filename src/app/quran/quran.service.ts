import { Injectable } from '@angular/core';
import { NgxChromeStorageService } from 'ngx-chrome-storage';
import * as _ from 'lodash';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class QuranService {

  ayahUrl = 'http://api.alquran.cloud/ayah/';

  quranList = [
    {key: 'az.mammadaliyev', name: 'Azerbaijani: Vasim Mammadaliyev and Ziya Bunyadov'},
    {key: 'bn.bengali', name: 'Bengali: Muhiuddin Khan'},
    {key: 'cs.hrbek', name: 'Czech: A. R. Nykl'},
    {key: 'de.aburida', name: 'German: Abu Rida Muhammad ibn Ahmad ibn Rassoul'},
    {key: 'dv.divehi', name: 'Divehi: Office of the President of Maldives'},
    {key: 'en.daryabadi', name: 'English: Abdul Majid Daryabadi'},
    {key: 'en.sahih', name: 'English: Saheeh International'},
    {key: 'fr.hamidullah', name: 'French: Muhammad Hamidullah'},
    {key: 'ha.gumi', name: 'Hausa: Abubakar Mahmoud Gumi'},
    {key: 'hi.hindi', name: 'Hindi: Suhel Farooq Khan and Saifur Rahman Nadwi'},
    {key: 'id.indonesian', name: 'Indonesia: Bahasa Indonesia'},
    {key: 'ro.grigore', name: 'Romanian: George Grigore'},
    {key: 'ru.osmanov', name: 'Russian: Magomed-Nuri Osmanovich Osmanov'},
    {key: 'ru.porokhova', name: 'Russian: V. Porokhova'},
    {key: 'sd.amroti', name: 'Sindhi: Taj Mehmood Amroti'},
    {key: 'so.abduh', name: 'Somali: Mahmud Muhammad Abduh'},
    {key: 'sq.ahmeti', name: 'Albanian: Sherif Ahmeti'},
    {key: 'sv.bernstrom', name: 'Swedish: Knut Bernström'},
    {key: 'sw.barwani', name: 'Swahili: Ali Muhsin Al-Barwani'},
    {key: 'ta.tamil', name: 'Tamil: Jan Turst Foundation'},
    {key: 'tg.ayati', name: 'Tajik: AbdolMohammad Ayati'},
    {key: 'th.thaii', name: 'Thai: King Fahad Quran Complex'},
    {key: 'tr.golpinarli', name: 'Turkish: Abdulbaki Golpinarli'},
    {key: 'tr.vakfi', name: 'Turkish: Diyanet Vakfi'},
    {key: 'tr.yazir', name: 'Turkish: Elmalili Hamdi Yazir'},
    {key: 'tr.yildirim', name: 'Turkish: Suat Yildirim'},
    {key: 'tt.nugman', name: 'Tatar: Yakub Ibn Nugman'},
    {key: 'ug.saleh', name: 'Uyghur: Muhammad Saleh'},
    {key: 'ur.jalandhry', name: 'Urdu: Fateh Muhammad Jalandhry'},
    {key: 'uz.sodik', name: 'Uzbek: Muhammad Sodik Muhammad Yusuf'},
    {key: 'es.cortes', name: 'Spanish: Julio Cortes'},
    {key: 'es.asad', name: 'Spanish: Muhammad Asad - Abdurrasak Pérez'},
    {key: 'bg.theophanov', name: 'Bulgarian: Tzvetan Theophanov'},
    {key: 'fa.mojtabavi', name: 'Persian: Sayyed Jalaloddin Mojtabavi'},
    {key: 'id.muntakhab', name: 'Indonesian: Quraish Shihab'},
    {key: 'ms.basmeih', name: 'Malay: Abdullah Muhammad Basmeih'},
    {key: 'ru.muntahab', name: 'Russian: Ministry of Awqaf, Egypt'},
    {key: 'ur.junagarhi', name: 'Urdu: Maulana Muhammad Junagarhi'},
    {key: 'zh.jian', name: 'Chinese: Ma Jian'},
    {key: 'zh.majian', name: 'Chinese: Ma Jian (Traditional)'},
    {key: 'fa.khorramdel', name: 'Persian: Mostafa Khorramdel'},
    {key: 'fa.moezzi', name: 'Persian: Mohammad Kazem Moezzi'},
    {key: 'bs.korkut', name: 'Bosnian: Besim Korkut'},
    {key: 'zh.mazhonggang', name: 'Chinese: Ma Zhong Gang'},
    {key: 'nl.keyzer', name: 'Dutch: Salomo Keyzer'},
    {key: 'pt.elhayek', name: 'Portuguese: Samir El-Hayek'}
  ];

  audioVoices =  `[{
      "identifier": "ar.abdulbasitmurattal",
      "language": "ar",
      "name": "Abdul Basit",
      "englishName": "Abdul Basit",
      "format": "audio",
      "type": "translation"
    }, {
      "identifier": "ar.abdullahbasfar",
      "language": "ar",
      "name": "Abdullah Basfar",
      "englishName": "Abdullah Basfar",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.abdurrahmaansudais",
      "language": "ar",
      "name": "Abdurrahmaan As-Sudais",
      "englishName": "Abdurrahmaan As-Sudais",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.abdulsamad",
      "language": "ar",
      "name": "Abdul Samad",
      "englishName": "Abdul Samad",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.shaatree",
      "language": "ar",
      "name": "Abu Bakr Ash-Shaatree",
      "englishName": "Abu Bakr Ash-Shaatree",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.ahmedajamy",
      "language": "ar",
      "name": "Ahmed ibn Ali al-Ajamy",
      "englishName": "Ahmed ibn Ali al-Ajamy",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.alafasy",
      "language": "ar",
      "name": "Alafasy",
      "englishName": "Alafasy",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.hanirifai",
      "language": "ar",
      "name": "Hani Rifai",
      "englishName": "Hani Rifai",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.husary",
      "language": "ar",
      "name": "Husary",
      "englishName": "Husary",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.husarymujawwad",
      "language": "ar",
      "name": "Husary (Mujawwad)",
      "englishName": "Husary (Mujawwad)",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.hudhaify",
      "language": "ar",
      "name": "Hudhaify",
      "englishName": "Hudhaify",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.ibrahimakhbar",
      "language": "ar",
      "name": "Ibrahim Akhdar",
      "englishName": "Ibrahim Akhdar",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.mahermuaiqly",
      "language": "ar",
      "name": "Maher Al Muaiqly",
      "englishName": "Maher Al Muaiqly",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.minshawi",
      "language": "ar",
      "name": "Minshawi",
      "englishName": "Minshawi",
      "format": "audio",
      "type": "translation"
    }, {
      "identifier": "ar.minshawimujawwad",
      "language": "ar",
      "name": "محمد صديق المنشاوي (المجود)",
      "englishName": "Minshawy (Mujawwad)",
      "format": "audio",
      "type": "translation",
      "direction": null
    }, {
      "identifier": "ar.muhammadayyoub",
      "language": "ar",
      "name": "Muhammad Ayyoub",
      "englishName": "Muhammad Ayyoub",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.muhammadjibreel",
      "language": "ar",
      "name": "Muhammad Jibreel",
      "englishName": "Muhammad Jibreel",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.saoodshuraym",
      "language": "ar",
      "name": "Saood bin Ibraaheem Ash-Shuraym",
      "englishName": "Saood bin Ibraaheem Ash-Shuraym",
      "format": "audio",
      "type": "versebyverse"
    },{
      "identifier": "en.walk",
      "language": "en",
      "name": "Ibrahim Walk",
      "englishName": "Ibrahim Walk",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "fa.hedayatfarfooladvand",
      "language": "fa",
      "name": "Fooladvand - Hedayatfar",
      "englishName": "Fooladvand - Hedayatfar",
      "format": "audio",
      "type": "translation"
    }, {
      "identifier": "ar.parhizgar",
      "language": "ar",
      "name": "Parhizgar",
      "englishName": "Parhizgar",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ur.khan",
      "language": "ur",
      "name": "Shamshad Ali Khan",
      "englishName": "Shamshad Ali Khan",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "zh.chinese",
      "language": "zh",
      "name": "\u4e2d\u6587",
      "englishName": "Chinese",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "fr.leclerc",
      "language": "fr",
      "name": "Youssouf Leclerc",
      "englishName": "Youssouf Leclerc",
      "format": "audio",
      "type": "versebyverse"
    }, {
      "identifier": "ar.aymanswoaid",
      "language": "ar",
      "name": "أيمن سويد",
      "englishName": "Ayman Sowaid",
      "format": "audio",
      "type": "versebyverse",
      "direction": null
    }]`;


  constructor(private http: HttpClient, private settings: NgxChromeStorageService) {}

  randomAyahNum() {
    return Math.floor(Math.random() * (6236 - 0 + 1)) + 0;
  }

  getAyah(verse: number, showEnglish: boolean, secondTranslation: string): Observable<any> {

    // check if offline
    if (navigator.onLine === false) {
      const returnObj = JSON.parse(localStorage.getItem('cached_ayah'));
      return of(returnObj);
    }

    secondTranslation = (secondTranslation && secondTranslation !== 'none') ? secondTranslation : '';
    const englishTranslation = (showEnglish) ? 'en.daryabadi,' : '';
    // let apiKey = '?key=51a75480bdb990d041a1f32cdb607002';
    // ...using get request
    return this.http.get(this.ayahUrl + verse + '/editions/quran-simple,' + englishTranslation + secondTranslation)
    .pipe(
      map((res: any) => {
        const data: any = res;
        const arabicQuran = data.data[0];
        const returnObj = {
          text: arabicQuran.text,
          textArr: arabicQuran.text.split(' '),
          number: arabicQuran.numberInSurah,
          surah: arabicQuran.surah.englishName,
          translationText: englishTranslation ? data.data[1].text : '',
          secondTranslationText:  secondTranslation ? englishTranslation ? data.data[2].text : data.data[1].text : ''
        };
        localStorage.setItem('cached_ayah', JSON.stringify(returnObj));
        return returnObj;
      })
    );
  }

  getAyahTranslations(verse: number, ayahTextAr, showEnglish: boolean, secondTranslation: string) {
    if (navigator.onLine === false) {
      return of([]);
    }
    const ayahWords = ayahTextAr.split(' ').filter(word => word.length > 1);
    secondTranslation = (secondTranslation && secondTranslation !== 'none') ? secondTranslation : '';
    const englishTranslation = (showEnglish) ? 'en.daryabadi,' : '';
    return this.http.get<{
      data: { text: string }
    }>(this.ayahUrl + verse + '/editions/quran-wordbyword,' + englishTranslation + secondTranslation)
    .pipe(
      map(response => {
        const { text } = response.data[0];
        const translationsHash = {};
        const wordsChunk = text.split('$');
        wordsChunk.map((chunk, index) => {
          const chunkElements = chunk.split('|');
          const key = chunkElements[0]?.trim();
          const val = chunkElements[1]?.trim();
          const ayahWord = ayahWords[index];
          if (key && val) {
            translationsHash[ayahWord] = val;
          }
        })
        return translationsHash;
      })
    )
  }

  getTranslations(): object[] {
    return _.sortBy(this.quranList, 'name');
  }

  getAudioVoices() {
    return JSON.parse(this.audioVoices);
  }

  getAudio(ayahNum: number) {
    return new Audio('http://cdn.alquran.cloud/media/audio/ayah/' + this.settings.config?.audioVoice + '/' + ayahNum);
  }

}
