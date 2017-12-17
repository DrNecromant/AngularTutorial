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

  constructor(private http: Http) {
      this.readSections();
  }

  readSections() {
    this.getSections().subscribe(sections=> {
        this.sections = sections;
    });
  }

  getSections(): Observable<Section[]> {
    return this.http.get(this.sectionsUrl)
      .map(response => response.json() as Section[]);
  }
}
