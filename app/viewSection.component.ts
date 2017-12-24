import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotesService } from './services/api/note.service';
import { Note } from './interfaces'

@Component({
    templateUrl: 'app/viewSection.component.html',
})

export class ViewSectionComponent implements OnInit {
  sectiontext: string;
  notes: Note[];

  constructor(private route: ActivatedRoute, private notesService: NotesService) {}

  ngOnInit() {
    this.sectiontext = this.route.snapshot.params["name"];
    this.getNotes().subscribe(notes => { this.notes = notes });
  }

  getNotes() {
    return this.notesService.getNotes(this.sectiontext);
  }
}
