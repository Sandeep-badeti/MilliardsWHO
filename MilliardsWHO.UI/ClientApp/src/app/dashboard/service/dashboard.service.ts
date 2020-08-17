import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CloseoutList } from '../models/CloseoutList';
import { environment } from '../../../environments/environment';
import { AppConstants } from '../../constants/app.constants';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getFullCloseoutList() {
    return this.http.get<CloseoutList[]>(environment.base_url + AppConstants.CloseoutDashboardAPI)
      .pipe(map(data => {
        return data;
      }));
  }

}
