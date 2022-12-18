import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBar } from './components/navBar/navBar';
import { SideBar } from './components/sideBar/sideBar';
import { RecordWindow } from './components/recordWindow/recordWindow';


@NgModule({
  declarations: [
    AppComponent,
    NavBar,
    SideBar,
    RecordWindow
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl("https://unpkg.com/@mdi/angular-material/mdi.svg")
    );
  }
 }
