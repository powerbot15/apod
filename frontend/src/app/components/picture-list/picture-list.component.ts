import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/core/services/api.service";

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this._apiService.getPhoto('2005-04-04')
      .subscribe((data) => {console.dir(data)});
  }

}
