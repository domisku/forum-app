import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

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
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpErrorInterceptor } from './core/recources/interceptors/http-error.interceptor';

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
