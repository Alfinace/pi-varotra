import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly API_URL = environment.API_URL
  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${url}`)
  }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${url}`, data)
  }

  public put(url: string, data: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/${url}`, data)
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${url}`)
  }
}
