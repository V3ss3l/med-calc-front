import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultEntity} from "./models/result.entity";
import {InfoEntity} from "./models/info.entity";
import {SofaParams} from "./models/sofa.params";

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

  calculateHeart(params: SofaParams): Observable<ResultEntity>{
    const uri = `http://localhost:8081/calculator/heart`;
    return this.http.post<ResultEntity>(uri, params);
  }

  calculateChildPhew(params: SofaParams): Observable<ResultEntity>{
    const uri = `http://localhost:8081/calculator/child-phew`;
    return this.http.post<ResultEntity>(uri, params);
  }
}
