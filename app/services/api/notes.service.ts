import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Note } from '../../interfaces'

@Injectable()
export class NotesService {
  private notesUrl = 'notes';

  constructor(private http: Http) { }
}
