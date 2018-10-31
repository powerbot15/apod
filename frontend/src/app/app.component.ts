import { Component, ViewChild } from '@angular/core';
import { PictureListComponent } from "./components/picture-list/picture-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  @ViewChild('pictureList') pictureList: PictureListComponent;

  public requestPhotos (momentDate: any) {
    this.pictureList.getPhotos(momentDate);
  }
}
