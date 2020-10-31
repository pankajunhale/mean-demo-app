import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  public httpOptions;
  API_URL = environment.API_BASE_URL;

  post(url: string, body: any): any {
    url = environment.API_BASE_URL + url;
    return this.http.post(url, body);
  }
  get(url: string): any {
    url = environment.API_BASE_URL + url;
    console.log(url);
    return this.http.get(url);
  }
}
