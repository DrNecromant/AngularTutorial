import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes.component';
import { SectionsComponent } from './sections.component';
import { NotesEditorComponent } from './notesEditor.component';
import { ViewSectionComponent } from './viewSection.component';
import { UserFormComponent } from './forms/userForm.component';
import { LoginFormComponent } from './forms/loginForm.component';
import { PageNotFoundComponent } from './pageNotFound.component';

import { NotesService } from './services/api/note.service';
import { LoginService } from './services/api/login.service';

import { EqualToValidator } from './directives/EqualToValidator';
import { UserUniqueValidator } from './directives/UserUniqueValidator';

const appRoutes: Routes = [
  { path: '', component: NotesEditorComponent },
  { path: 'register', component: UserFormComponent },
  { path: 'section/:name', component: ViewSectionComponent },
  { path: ':name', component: NotesEditorComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    NotesComponent,
    NotesEditorComponent,
    SectionsComponent,
    ViewSectionComponent,
    UserFormComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    EqualToValidator,
    UserUniqueValidator,
  ],
  providers: [
    NotesService,
    LoginService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
