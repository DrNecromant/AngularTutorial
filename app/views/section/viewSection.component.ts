import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotesService } from '../../services/api/note.service';
import { Note } from '../../interfaces'

@Component({
    templateUrl: 'app/views/section/viewSection.component.html',
})

export class ViewSectionComponent implements OnInit {
  sectiontext: string;
  notes: Note[];

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.sectiontext = this.route.snapshot.params["name"];
    this.notesService.getNotes(this.sectiontext)
      .subscribe(notes => { this.notes = notes });
  }
}
