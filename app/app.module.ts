import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotesComponent } from './editors/notes/notes.component';
import { SectionsComponent } from './editors/sections/sections.component';
import { EditorComponent } from './editors/editor.component';
import { ViewSectionComponent } from './views/section/viewSection.component';
import { UserFormComponent } from './forms/userForm.component';
import { LoginFormComponent } from './forms/loginForm.component';
import { PageNotFoundComponent } from './errorPages/pageNotFound/pageNotFound.component';

import { NotesService } from './services/api/note.service';
import { SectionService } from './services/api/section.service';
import { LoginService } from './services/api/login.service';

import { EqualToValidator } from './directives/EqualToValidator';
import { UserUniqueValidator } from './directives/UserUniqueValidator';

const appRoutes: Routes = [
  { path: '', component: EditorComponent },
  { path: 'register', component: UserFormComponent },
  { path: 'section/:name', component: ViewSectionComponent },
  { path: ':name', component: EditorComponent },
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
    EditorComponent,
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
    SectionService,
    LoginService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
