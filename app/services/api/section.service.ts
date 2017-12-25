import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Section } from '../../interfaces'

@Injectable()
export class SectionService {
  private sectionsUrl = 'sections';
  private sectionsReplaceUrl = 'replace';

  constructor(private http: Http) { }

  getSections(): Observable<Section[]> {
    return this.http.get(this.sectionsUrl)
      .map(response => response.json() as Section[]);
  }

  addSection(section: Section): Observable<any> {
    return this.http.post(this.sectionsUrl, section);
  }

  writeSections(sections: Section[]) {
    return this.http.post(this.sectionsReplaceUrl, sections);
  }
}
