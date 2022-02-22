import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { QuestionComponent } from './shared/question/question.component';
import { QuestionsComponent } from './shared/questions/questions.component';
import { FormComponent } from './shared/form/form.component';
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
import { AlertComponent } from './shared/UI/alert/alert.component';
import { LoadingSpinnerComponent } from './shared/UI/loading-spinner/loading-spinner.component';
import { OverlayComponent } from './shared/UI/overlay/overlay.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollButtonsComponent } from './shared/UI/scroll-buttons/scroll-buttons.component';
import { AllQuestionsHeaderComponent } from './all-questions/all-questions-header/all-questions-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AllQuestionsComponent,
    NewQuestionComponent,
    AskQuestionComponent,
    EditQuestionComponent,
    PaginationComponent,
    QuestionComponent,
    QuestionsComponent,
    FormComponent,
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
    AlertComponent,
    LoadingSpinnerComponent,
    OverlayComponent,
    ScrollButtonsComponent,
    AllQuestionsHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
