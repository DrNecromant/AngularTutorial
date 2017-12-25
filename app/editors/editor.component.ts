import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotesComponent } from './notes/notes.component';

@Component({
    templateUrl: 'app/editors/editor.component.html',
})

export class EditorComponent {
  section: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params
      .map(params => params['name'])
      .subscribe(section => this.section = section);
  }

  @ViewChild(NotesComponent) notesComponent: NotesComponent;

  setSection(section: string) {
    this.router.navigate([section]);
  }
}
