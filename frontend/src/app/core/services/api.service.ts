import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getPhoto (date: string): Observable<any> {
    return this.http.get('/api/photo?date=' + date);
  }

  public getPhotos (momentDate: any): Observable<any> {
    const startDate = momentDate.startOf('month').format('YYYY-MM-DD');
    const endDate = momentDate.endOf('month').format('YYYY-MM-DD');
    const url = `/api/photos?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url);
  }

}
