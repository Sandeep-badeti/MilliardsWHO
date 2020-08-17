import { Component, OnInit } from '@angular/core';
import { CloseoutList } from './models/CloseoutList';
import { DashboardService } from 'src/app/dashboard/service/dashboard.service';
import { AppConstants } from '../constants/app.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public closeoutList: CloseoutList[];
  public doneCloseoutExitScan: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private DashboardService: DashboardService)
  {
    this.closeoutList = [];
  }     
  ngOnInit(): void  {
    this.DashboardService.getFullCloseoutList().subscribe((CloseoutList) => {
      this.closeoutList = CloseoutList['data'];
    });

  }

}
