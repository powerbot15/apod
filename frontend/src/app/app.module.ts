import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PictureListComponent } from './components/picture-list/picture-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    PictureListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
