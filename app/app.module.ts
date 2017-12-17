import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes.component';
import { SectionsComponent } from './sections.component';
import { NotesEditorComponent } from './notesEditor.component';
import { PageNotFoundComponent } from './pageNotFound.component';

const appRoutes: Routes = [
  { path: '', component: NotesEditorComponent },
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
    PageNotFoundComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
