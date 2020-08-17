import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FulfillCloseoutList } from '../Models/FulfillCloseoutList';
import { AppConstants } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CloseOutProcessService {

  constructor(private http: HttpClient) { }
getCloseOutProcessDetails(warehouseId: number, closeOutType: number) {
  let params = new HttpParams()
  .set("warehouseId", '' + warehouseId)
      .set("closeOutType", '' + closeOutType);
      return this.http.get<FulfillCloseoutList>(environment.base_url +  AppConstants.CloseoutProcessAPI,{params: params})
      .pipe(map(data => {
        return data;
      }));
}

}
