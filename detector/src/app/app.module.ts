import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ExternalWebsiteDetectorService } from './shared/services/external-website-detector.service';
import { FileService } from './shared/services/file.service';
import { SiteDetectorComponent } from './components/site-detector/site-detector.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    SiteDetectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    ExternalWebsiteDetectorService,
    FileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
