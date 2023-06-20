import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultEntity} from "../models/result.entity";
import {InfoEntity} from "../models/info.entity";
import {CalcService} from "../calc.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SofaParams} from "../models/sofa.params";
import {ChildPhewParams} from "../models/child-phew.params";

@Component({
  selector: 'app-child-phew-calc',
  templateUrl: './child-phew-calc.component.html',
  styleUrls: ['./child-phew-calc.component.css']
})
export class ChildPhewCalcComponent {
  biliOptions: string[];
  albuminOptions: string[];
  mhoOptions: string[];
  ascitOptions: string[];
  encephalOptions: string[];
  resultNoun!: string;
  calcResult?: ResultEntity;
  infoResult!: InfoEntity;
  childPhewCalcForm!: FormGroup;

  constructor(private _service: CalcService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.biliOptions = ['<34.2', '34.2 - 51.3', '>51.3'];
    this.albuminOptions = ['>35', '28 - 35', '<28'];
    this.mhoOptions = ['<1.7', '1.7-2.2', '>2.2'];
    this.ascitOptions = ['Нет', 'Легкий', 'Средний или тяжелый'];
    this.encephalOptions = ['Нет', '1 - 2 степень', '3 - 4 степень'];
  }

  ngOnInit(){
    this.childPhewCalcForm = this._formBuilder.group({
      "bilirubin": new FormControl(),
      "albumin": new FormControl(),
      "mho": new FormControl(),
      "ascit": new FormControl(),
      "enceph": new FormControl()
    });
  }

  submit(){
    console.log(this.childPhewCalcForm.value);
    this.calculateScore();
  }

  buttonClickGetInfo(){
    this.getChildPhewInfo();
  }

  clear(){
    this.childPhewCalcForm.reset();
    this.calcResult = undefined;
  }

  calculateScore(){
    let params: ChildPhewParams = new ChildPhewParams();
    params.bilirubin = this.childPhewCalcForm.value['bilirubin'];
    params.albumin = this.childPhewCalcForm.value['albumin'];
    params.mho = this.childPhewCalcForm.value['mho'];
    params.ascit = this.childPhewCalcForm.value['ascit'];
    params.enceph = this.childPhewCalcForm.value['enceph'];
    console.log(params);
    this._service.calculateChildPhew(params).subscribe(result => {
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

  getChildPhewInfo(){
    this._service.getChildPhewInfo().subscribe(result => {
      this.infoResult = new InfoEntity();
      this.infoResult.info = result.info;
      this.openSnackBar(this.infoResult.info, 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
