import { Component } from '@angular/core';

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
  notes: Note[] = [
    {text: "Note one"},
    {text: "Note two"}
  ]

  add(notetext: string) {
    if (!notetext) return;  // do not add note if input is empty
    let note = { text: notetext };
    this.notes.push(note);
  }

  remove(idx) {
    this.notes.splice(idx, 1);
  }

}
