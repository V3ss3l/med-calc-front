import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SofaParams} from "../models/sofa.params";
import {CalcService} from "../calc.service";
import {ResultEntity} from "../models/result.entity";
import {InfoEntity} from "../models/info.entity";

@Component({
  selector: 'app-sofa-calc',
  templateUrl: './sofa-calc.component.html',
  styleUrls: ['./sofa-calc.component.css']
})
export class SofaCalcComponent {
  isChecked: boolean = true;
  sliderWord = "Креатинин";
  liverString = "Креатинин крови, мкмоль/л";
  eyesOptions: string[];
  speechOptions: string[];
  moveOptions: string[];
  hypotensiaOptions: string[];
  calcResult: ResultEntity = new ResultEntity();
  infoResult: InfoEntity = new InfoEntity();
  sofaCalcForm : FormGroup = new FormGroup({
    "paO2": new FormControl(),
    "fio2": new FormControl(),
    "platelets": new FormControl(),
    "bilirubin": new FormControl(),
    "liver": new FormControl(),
    "eyes": new FormControl(),
    "speech": new FormControl(),
    "move": new FormControl(),
    "hypotensia": new FormControl(),
  });

  constructor(private service: CalcService) {
    this.eyesOptions = ['Произвольное', 'Реакция на голос', 'Реакция на боль', 'Отсутствует'];
    this.speechOptions = ['Пациент ориентирован, быстрый и правильный ответ на заданный вопрос', 'Пациент дезориентирован, спутанная речь',
      'Словесная окрошка, ответ по смыслу не соответствует вопросу', 'Нечленораздельный звуки в ответ на заданный вопрос',
      'Отсутствие речи'];
    this.moveOptions = ['Выполнение движений по команде', 'Целенаправленное движение в ответ на болевое раздражение (отталкивание)',
      'Отдёргивание конечности в ответ на болевое раздражение', 'Патологическое сгибание в ответ на болевое раздражение',
      'Патологическое разгибание в ответ на болевое раздражение', 'Отсутствие движений'];
    this.hypotensiaOptions = ['Нет', 'Среднее АД < 70 мм. рт. ст.', 'Вазопрессоры, дофамин <= 5 мкг/кг/мин или добутамин в любой дозе',
      'Вазопрессоры, дофамин > 5 мкг/кг/мин или эпи- норэпинефрин <= 0.1 мкг/кг/мин', 'Вазопрессоры, дофамин > 15 мкг/кг/мин или эпи- норэпинефрин > 0.1 мкг/кг/мин'];
  }

  slideToggleClick() {
    if(this.isChecked){
      this.sliderWord = "Креатинин";
      this.liverString = "Креатинин крови, мкмоль/л";
    } else {
      this.sliderWord = "Диурез";
      this.liverString = "Суточный диурез, мл/сут";
    }
  }

  submit(){
    console.log(this.sofaCalcForm.value);
    this.calculateScore();
  }

  getSofaInfo(){
    this.service.getSofaInfo().subscribe(result => this.infoResult = result );
    console.log(this.infoResult);
  }

  calculateScore(){
    let params: SofaParams = new SofaParams();
    params.paO2 = this.sofaCalcForm.value['paO2'];
    params.fio2 = this.sofaCalcForm.value['fio2'];
    params.platelets = this.sofaCalcForm.value['platelets'];
    params.bilirubin = this.sofaCalcForm.value['bilirubin'];
    params.liverCheck = this.isChecked;
    params.liverParam = this.sofaCalcForm.value['liver'];
    params.gcs = this.calculateComaGlasgow();
    params.hypotensia = this.sofaCalcForm.value['hypotensia'];
    console.log(params);
    this.calcResult = new ResultEntity();
    this.service.calculateSofa(params).subscribe(result => {
      this.calcResult.result = result.result;
      this.calcResult.info = result.info;
      this.calcResult.addInfo = result.addInfo;
    });
    console.log(this.calcResult.info);
  }

  calculateComaGlasgow(): number{
    let eyesValue; let speechValue; let moveValue;
    eyesValue = this.sofaCalcForm.value['eyes'] === this.eyesOptions[0] ? 4 :
      this.sofaCalcForm.value['eyes'] === this.eyesOptions[1] ? 3 :
        this.sofaCalcForm.value['eyes'] === this.eyesOptions[2] ? 2 : 1;

    speechValue = this.sofaCalcForm.value['speech'] === this.speechOptions[0] ? 5 :
      this.sofaCalcForm.value['speech'] === this.speechOptions[1] ? 4 :
        this.sofaCalcForm.value['speech'] === this.speechOptions[2] ? 3 :
          this.sofaCalcForm.value['speech'] === this.speechOptions[3] ? 2 : 1;

    moveValue = this.sofaCalcForm.value['move'] === this.moveOptions[0] ? 6 :
      this.sofaCalcForm.value['speech'] === this.moveOptions[1] ? 5 :
        this.sofaCalcForm.value['speech'] === this.moveOptions[2] ? 4 :
          this.sofaCalcForm.value['speech'] === this.moveOptions[3] ? 3 :
            this.sofaCalcForm.value['speech'] === this.moveOptions[4] ? 2 : 1;
    let res = eyesValue + speechValue + moveValue;

    if(res>14) return 0;
    else if(res>=13 && res<=14) return 1;
    else if(res>=10 && res<=12) return 2;
    else if(res>=6 && res<=9) return 3;
    else return 4;
  }

  clear(){

  }
}
