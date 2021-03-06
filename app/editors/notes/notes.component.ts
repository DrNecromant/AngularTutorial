import { Component, Input, OnChanges } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NotesService } from '../../services/api/note.service';
import { Note } from '../../interfaces';

@Component({
  selector: 'notes',
  templateUrl: 'app/editors/notes/notes.component.html',
})

export class NotesComponent implements OnChanges {
  private notesUrl = 'notes';
  notetext: string;
  notes: Note[];
  @Input() section: string;

  constructor(private http: Http, private notesService: NotesService) { }

  ngOnChanges() {
    this.read();
  }

  read() {
    this.notesService.getNotes(this.section)
      .subscribe(notes => { this.notes = notes });
  }

  add() {
    if (!this.notetext) return;  // do not add note if input is empty
    let note = { text: this.notetext, section: this.section, created: new Date() };
    this.notesService.addNote(note).subscribe(response => this.read());
  }

  remove(id:string) {
    this.notesService.removeNote(id).subscribe(response => this.read());
  }
}
