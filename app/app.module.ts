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
import { PageNotFoundComponent } from './pageNotFound.component';

import { NotesService } from './services/api/notes.service';

const appRoutes: Routes = [
  { path: '', component: NotesEditorComponent },
  { path: 'section/:name', component: ViewSectionComponent },
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
    PageNotFoundComponent,
  ],
  providers: [
    NotesService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
