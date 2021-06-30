import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITx } from './interfaces/tx.interface';
import { IBlock } from './interfaces/block.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  apiUrlBase = '/api'

  constructor(private http: HttpClient) { }

  sendCoins(address: string, amount: number): Observable<IBlock> {
    return this.http.get<IBlock>(`${this.apiUrlBase}/sendCoins/${address}/${amount}`).pipe(
      catchError(this.handleError)
    );
  }

  sendTx(address: string, amount: number): Observable<ITx> {
    return this.http.get<ITx>(`${this.apiUrlBase}/sendTx/${address}/${amount}`).pipe(
      catchError(this.handleError)
    );
  }
  
  mineNextBlock(): Observable<IBlock> {
    return this.http.get<IBlock>(`${this.apiUrlBase}/mineBlock`).pipe(
      catchError(this.handleError)
    );
  }
  

  getLastBlock(): Observable<IBlock> {
    return this.http.get<IBlock>(`${this.apiUrlBase}/lastBlock`).pipe(
      catchError(this.handleError)
    );
  }

  addPeer(addr: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrlBase}/addPeer/${addr}`).pipe(
      catchError(this.handleError)
    );
  }
  

  handleError(error) {
    return throwError(error.error);
  }
}
