import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EditorComponent } from '../editors/editor.component';

@Injectable()
export class CanDeactivateNote implements CanDeactivate<EditorComponent> {
  canDeactivate(
    editorComponent: EditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    const note = editorComponent.notesComponent.notetext;
    if (note && note.length > 0) {
      return window.confirm(
        `You have entered the note.
        Do you really want to change section?`);
      } else return true;
  }
}
