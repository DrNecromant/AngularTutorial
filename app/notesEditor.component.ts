import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'app/notesEditor.component.html',
})

export class NotesEditorComponent {
  section: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params
      .map(params => params["name"])
      .subscribe(section => this.section = section);
  }

  setSection(section: string) {
    this.section = section;
    this.router.navigate([section]);
  }
}
