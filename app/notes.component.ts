import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Note {
    text: string;
}

@Component({
    selector: 'notes',
    template: `
      <ul>
        <li *ngFor="let note of notes; let i=index">
          {{note.text}} <button (click)="remove(i)">remove</button>
        </li>
      </ul>
      <textarea #notetext></textarea>
      <button (click)="add(notetext.value); notetext.value=null">Add</button>
    `
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

  remove(idx) {
    this.notes.splice(idx, 1);
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
