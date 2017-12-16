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

  constructor(private http: Http) {
    this.getNotes().then(notes => {
      this.notes = notes;
      console.log(notes);
    });
  }

  notes: Note[] = [
    {text: "Note one"},
    {text: "Note two"}
  ]

  getNotes(): Promise<Note[]> {
    return this.http.get(this.notesUrl)
      .toPromise()
      .then(response => response.json() as Note[]);
  }

  add(notetext: string) {
    if (!notetext) return;  // do not add note if input is empty
    let note = { text: notetext };
    this.notes.push(note);
  }

  remove(idx) {
    this.notes.splice(idx, 1);
  }

}
