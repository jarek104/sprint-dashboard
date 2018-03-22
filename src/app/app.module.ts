import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { RepoTileComponent } from './repo-tile/repo-tile.component';
import { ConfigurationService } from './services/configuration.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BitbucketService } from './services/bitbucket.service';


@NgModule({
  declarations: [
    AppComponent,
    RepoTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ConfigurationService, BitbucketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
