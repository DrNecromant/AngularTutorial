import { Component, Input, OnChanges } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Note } from './interfaces'

@Component({
  selector: 'notes',
  templateUrl: 'app/notes.component.html',
})

export class NotesComponent implements OnChanges {
  private notesUrl = 'notes';
  notes: Note[];

  constructor(private http: Http) { }

  @Input() section: string;

  ngOnChanges() {
    this.readNotes();
  }

  readNotes() {
    this.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  add(notetext: string) {
    if (!notetext) return;  // do not add note if input is empty
    let note = { text: notetext, section: this.section };
    this.addNote(note).subscribe(response => this.readNotes());
  }

  remove(id:string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    this.http.delete(this.notesUrl, { search: params })
      .subscribe(response => this.readNotes());
  }

  getNotes(): Observable<Note[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('section', this.section);
    return this.http.get(this.notesUrl, {search: params})
      .map(response => response.json() as Note[]);
  }

  addNote(note:Note): Observable<any> {
    return this.http.post(this.notesUrl, note);
  }
}
