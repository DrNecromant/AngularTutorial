import { Component } from '@angular/core';

@Component({
    selector: 'notes-editor',
    templateUrl: 'app/notesEditor.component.html',
})

export class NotesEditorComponent {
  section: string;

  setSection(section: string) {
    this.section = section;
  }
}
