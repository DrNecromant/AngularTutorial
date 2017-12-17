import { Component, Output, EventEmitter } from '@angular/core';
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
  sectionsReplaceUrl = "/sections/replace";

  constructor(private http: Http) {
    this.readSections();
  }

  @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();

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
    this.sectionChanged.emit(this.activeSection);
  }

  addSection(sectiontext) {
    if (!sectiontext) return;
    if (this.sections.find(section => section.title===sectiontext)) return;

    const section: Section = { title: sectiontext };
    this.sections.push(section);
    this.showSection(section);
    this.writeSections();
  }

  writeSections() {
    this.http.post(this.sectionsReplaceUrl, this.sections).subscribe();
  }
}
