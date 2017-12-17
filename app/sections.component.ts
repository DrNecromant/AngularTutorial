import { Component } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

interface Section {
  _id?: string;
  title: string;
}

@Component({
  selector: 'sections',
  templateUrl: 'app/sections.component.html',
})

export class SectionsComponent {
  private sectionsUrl = 'sections';
  sections: Section[];
  activeSection: string;

  constructor(private http: Http) {
    this.readSections();
  }

  readSections() {
    this.getSections().subscribe(sections=> {
      this.sections = sections;
      if (this.activeSection == null && this.sections.length > 0) {
        this.showSection(this.sections[0]);
      }
    });
  }

  getSections(): Observable<Section[]> {
    return this.http.get(this.sectionsUrl)
      .map(response => response.json() as Section[]);
  }

  showSection(section:Section) {
    this.activeSection = section.title;
  }
}
