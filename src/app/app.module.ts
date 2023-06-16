import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppPageComponent } from './app-page/app-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuizPageComponent } from './app-page/quiz-page/quiz-page.component';
import { QuizPlayComponent } from './app-page/quiz-play/quiz-play.component';
import { MyQuizzesComponent } from './app-page/my-quizzes/my-quizzes.component';
import { QuizUpdateComponent } from './app-page/quiz-update/quiz-update.component';
import { QuizItemComponent } from './app-page/quiz-page/quiz-item/quiz-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppPageComponent,
    NavBarComponent,
    QuizPageComponent,
    QuizPlayComponent,
    MyQuizzesComponent,
    QuizUpdateComponent,
    QuizItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
