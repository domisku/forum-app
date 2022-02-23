import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HeaderNavComponent } from './core/components/header/header-nav/header-nav.component';
import { HamburgerNavComponent } from './core/components/header/hamburger-nav/hamburger-nav.component';
import { SidebarLeftComponent } from './core/components/sidebar-left/sidebar-left.component';
import { SidebarLeftButtonComponent } from './core/components/sidebar-left/sidebar-left-button/sidebar-left-button.component';
import { SidebarLeftNavComponent } from './core/components/sidebar-left/sidebar-left-nav/sidebar-left-nav.component';
import { MediaLinksComponent } from './core/components/sidebar-left/media-links/media-links.component';
import { SidebarRightComponent } from './core/components/sidebar-right/sidebar-right.component';
import { StatsComponent } from './core/components/sidebar-right/stats/stats.component';
import { MostUsedTagsComponent } from './core/components/sidebar-right/most-used-tags/most-used-tags.component';
import { HotQuestionsComponent } from './core/components/sidebar-right/hot-questions/hot-questions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderNavComponent,
    HamburgerNavComponent,
    SidebarLeftComponent,
    SidebarLeftButtonComponent,
    SidebarLeftNavComponent,
    MediaLinksComponent,
    SidebarRightComponent,
    StatsComponent,
    MostUsedTagsComponent,
    HotQuestionsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
