import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultEntity} from "./models/result.entity";
import {InfoEntity} from "./models/info.entity";
import {SofaParams} from "./models/sofa.params";
import {HeartParams} from "./models/heart.params";
import {ChildPhewParams} from "./models/child-phew.params";

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  getSofaInfo(): Observable<InfoEntity>{
    const uri = `http://localhost:8081/calculator/sofa/info`;
    return this.http.get<InfoEntity>(uri);
  }

  getHeartInfo(): Observable<InfoEntity>{
    const uri = `http://localhost:8081/calculator/heart/info`;
    return this.http.get<InfoEntity>(uri);
  }

  getChildPhewInfo(): Observable<InfoEntity>{
    const uri = `http://localhost:8081/calculator/child-phew/info`;
    return this.http.get<InfoEntity>(uri);
  }

  calculateSofa(params: SofaParams): Observable<ResultEntity>{
    const uri = "http://localhost:8081/calculator/sofa";
    return this.http.post<ResultEntity>(uri, params);
  }

  calculateHeart(params: HeartParams): Observable<ResultEntity>{
    const uri = `http://localhost:8081/calculator/heart`;
    return this.http.post<ResultEntity>(uri, params);
  }

  calculateChildPhew(params: ChildPhewParams): Observable<ResultEntity>{
    const uri = `http://localhost:8081/calculator/child-phew`;
    return this.http.post<ResultEntity>(uri, params);
  }

  configNoun(result: number): string{
    if(result === 1) return 'балл';
    if(result === 0 || result >= 5) return 'баллов';
    if(result > 0 && result < 5) return 'балла';
    return '';
  }
}
