import { Component } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Note {
    text: string;
}

@Component({
    selector: 'notes',
    templateUrl: 'app/notes.component.html',
})

export class NotesComponent {
  private notesUrl = 'notes';
  notes: Note[];

  constructor(private http: Http) {
    this.readNotes();
  }

  readNotes() {
    this.getNotes().then(notes=>{
      this.notes = notes;
    });
  }

  add(notetext: string) {
    if (!notetext) return;  // do not add note if input is empty
    let note = { text: notetext };
    this.notes.push(note);
    this.addNote(note);
  }

  remove(id:string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    this.http.delete(this.notesUrl, { search: params })
      .toPromise()
      .then(response => {
        this.readNotes();
      });
  }

  getNotes(): Promise<Note[]> {
    return this.http.get(this.notesUrl)
      .toPromise()
      .then(response => response.json() as Note[]);
  }

  addNote(note:Note) {
    this.http.post(this.notesUrl, note)
      .toPromise()
      .then(response => console.log("note sent, response", response));
  }
}
