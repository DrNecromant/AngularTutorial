import { Component, Input, OnChanges } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NotesService } from './services/api/notes.service';
import { Note } from './interfaces'

@Component({
  selector: 'notes',
  templateUrl: 'app/notes.component.html',
})

export class NotesComponent implements OnChanges {
  private notesUrl = 'notes';
  notes: Note[];

  constructor(private http: Http, private notesService: NotesService) { }

  @Input() section: string;

  ngOnChanges() {
    this.read();
  }

  read() {
    this.notesService.getNotes(this.section).subscribe(notes => { this.notes = notes });
  }

  add(notetext: string) {
    if (!notetext) return;  // do not add note if input is empty
    let note = { text: notetext, section: this.section };
    this.notesService.addNote(note).subscribe(response => this.read());
  }

  remove(id:string) {
    this.notesService.removeNote(id).subscribe(response => this.read());
  }
}
