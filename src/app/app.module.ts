import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MoistSensorComponent } from './moist-sensor/moist-sensor.component';
import { SmartmeterComponent } from './smartmeter/smartmeter.component';
import {MatMenuModule} from '@angular/material/menu';
import { MenuComponent } from './menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SmartmeterDetailComponent } from './smartmeter-detail/smartmeter-detail.component';
import { MoistmeterDetailComponent } from './moistmeter-detail/moistmeter-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MoistSensorComponent,
    SmartmeterComponent,
    MenuComponent,
    SmartmeterDetailComponent,
    MoistmeterDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
