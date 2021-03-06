import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProtectedImagePipe } from './protected-image.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AssetDetailsComponent,
    HomeComponent,
    SearchBarComponent,
    ProtectedImagePipe,
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
