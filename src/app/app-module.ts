import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PackageComponent } from './components/package-component/package-component';
// ✅ Required Modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Package2 } from './components/package2/package2';
import { Package3 } from './components/package3/package3';
import { Package4 } from './components/package4/package4'
@NgModule({
  declarations: [
    App,
    PackageComponent,
    Package2,
    Package3,
    Package4
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
