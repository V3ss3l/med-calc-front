import { Component } from '@angular/core';
import {ResultEntity} from "../models/result.entity";
import {InfoEntity} from "../models/info.entity";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CalcService} from "../calc.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChildPhewParams} from "../models/child-phew.params";
import {HeartParams} from "../models/heart.params";

@Component({
  selector: 'app-heart-calc',
  templateUrl: './heart-calc.component.html',
  styleUrls: ['./heart-calc.component.css']
})
export class HeartCalcComponent {
  anamnezOptions: string[];
  ecgOptions: string[];
  riskOptions: string[];
  troponinOptions: string[];
  resultNoun!: string;
  calcResult?: ResultEntity;
  infoResult!: InfoEntity;
  heartCalcForm!: FormGroup;

  constructor(private _service: CalcService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.anamnezOptions = ['Вызывающий слабое подозрение', 'Средне подозрительный', 'Высокая степень подозрения'];
    this.ecgOptions = ['Норма', 'Неспецифические нарушения реполяризации', 'Выраженное отклонение сегмента ST'];
    this.riskOptions = ['Нет', '1 - 2 фактора риска', '>=3 фактора риска или атеросклероз в анамнезе'];
    this.troponinOptions = ['<= нормы', '1-3 х нормы', '>3 х нормы'];
  }

  ngOnInit(){
    this.heartCalcForm = this._formBuilder.group({
      "age": new FormControl(),
      "anamnez": new FormControl(),
      "ecg": new FormControl(),
      "risk": new FormControl(),
      "troponin": new FormControl()
    });
  }

  submit(){
    console.log(this.heartCalcForm.value);
    this.calculateScore();
  }

  buttonClickGetInfo(){
    this.getHeartInfo();
  }

  clear(){
    this.heartCalcForm.reset();
    this.calcResult = undefined;
  }

  calculateScore(){
    let params: HeartParams = new HeartParams();
    params.age = this.heartCalcForm.value['age'];
    params.anamnez = this.heartCalcForm.value['anamnez'];
    params.ecg = this.heartCalcForm.value['ecg'];
    params.riskFactor = this.heartCalcForm.value['risk'];
    params.troponin = this.heartCalcForm.value['troponin'];
    console.log(params);
    this._service.calculateHeart(params).subscribe(result => {
      console.log(result);
      if(result === null){
        this.openSnackBar("Проверьте правильность введенных данных", "ОК");
        return;
      }
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

  getHeartInfo(){
    this._service.getHeartInfo().subscribe(result => {
      this.infoResult = new InfoEntity();
      this.infoResult.info = result.info;
      this.openSnackBar(this.infoResult.info, 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
