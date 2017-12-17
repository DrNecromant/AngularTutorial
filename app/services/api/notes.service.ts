import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Note } from '../../interfaces'

@Injectable()
export class NotesService {
  private notesUrl = 'notes';

  constructor(private http: Http) { }

  getNotes(section): Observable<Note[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('section', section);
    return this.http.get(this.notesUrl, {search: params})
      .map(response => response.json() as Note[]);
  }

  addNote(note: Note): Observable<any> {
    return this.http.post(this.notesUrl, note);
  }

  removeNote(id: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    return this.http.delete(this.notesUrl, { search: params })
  }
}
