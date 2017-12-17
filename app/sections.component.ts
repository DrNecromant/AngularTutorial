import { Component, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Section } from './interfaces'

@Component({
  selector: 'sections',
  templateUrl: 'app/sections.component.html',
})

export class SectionsComponent {
  private sectionsUrl = 'sections';
  sections: Section[];
  activeSection: string;
  sectionsReplaceUrl = "/sections";

  constructor(private http: Http) {
    this.read();
  }

  @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();

  read() {
    this.getSections().subscribe(sections=> {
      this.sections = sections;
      if (this.activeSection == null && this.sections.length > 0) {
        this.show(this.sections[0]);
      }
    });
  }

  show(section: Section) {
    this.activeSection = section.title;
    this.sectionChanged.emit(this.activeSection);
  }

  add(sectiontext) {
    if (!sectiontext) return;
    if (this.sections.find(section => section.title === sectiontext)) return;
    let section = { title: sectiontext };
    this.addSection(section).subscribe(response => this.read());
  }

  getSections(): Observable<Section[]> {
    return this.http.get(this.sectionsUrl)
      .map(response => response.json() as Section[]);
  }

  addSection(section: Section): Observable<any> {
    return this.http.post(this.sectionsReplaceUrl, section);
  }
}
