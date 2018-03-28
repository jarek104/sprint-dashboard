import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { ProjectTileComponent } from './project-tile/project-tile.component';
import { ConfigurationService } from './services/configuration.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BitbucketService } from './services/bitbucket.service';
import { CommitService } from './services/commit.service';
import { JenkinsService } from './services/jenkins.service';
import { StatsTileComponent } from './stats-tile/stats-tile.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectTileComponent,
    StatsTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ConfigurationService,
    BitbucketService,
    CommitService,
    JenkinsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
