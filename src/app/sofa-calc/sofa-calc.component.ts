import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SofaParams} from "../models/sofa.params";
import {CalcService} from "../calc.service";
import {ResultEntity} from "../models/result.entity";
import {InfoEntity} from "../models/info.entity";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sofa-calc',
  templateUrl: './sofa-calc.component.html',
  styleUrls: ['./sofa-calc.component.css']
})
export class SofaCalcComponent {
  isChecked: boolean = true;
  isInfectionChecked: boolean = false;
  sliderWord = "Креатинин";
  liverString = "Креатинин крови, мкмоль/л";
  infectionString = "Увеличение значения SOFA по сравнению с предыдущим на 2 и более баллов плюс наличие инфекции - клинические критерии СЕПСИСА";
  resultNoun!: string;
  eyesOptions: string[];
  speechOptions: string[];
  moveOptions: string[];
  hypotensiaOptions: string[];
  calcResult?: ResultEntity;
  infoResult!: InfoEntity;
  sofaCalcForm!: FormGroup;


  constructor(private _service: CalcService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
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

  ngOnInit(){
    this.sofaCalcForm = this._formBuilder.group({
      "paO2": new FormControl(Validators.required),
      "fio2": new FormControl(Validators.required),
      "platelets": new FormControl(Validators.required),
      "bilirubin": new FormControl(Validators.required),
      "liver": new FormControl(Validators.required),
      "eyes": new FormControl(),
      "speech": new FormControl(),
      "move": new FormControl(),
      "hypotensia": new FormControl(),
  });
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getSofaInfo(){
    this._service.getSofaInfo().subscribe(result => {
      this.infoResult = new InfoEntity();
      this.infoResult.info = result.info;
      this.openSnackBar(this.infoResult.info, 'OK');
    } );
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
    this._service.calculateSofa(params).subscribe(result => {
      console.log(result);
      this.calcResult = new ResultEntity();
      this.calcResult.result = result.result;
      console.log(this.calcResult.result);
      this.calcResult.info = result.info;
      console.log(this.calcResult.info);
      this.calcResult.addInfo = result.addInfo;
      console.log(this.calcResult.addInfo);
      this.resultNoun = this._service.configNoun(this.calcResult.result);
    });
    console.log(this.calcResult);
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

  buttonClickGetInfo(){
    this.getSofaInfo();
  }

  clear(){
    this.sofaCalcForm.reset();
    this.calcResult = undefined;
  }
}
