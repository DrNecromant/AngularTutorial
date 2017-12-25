import { Pipe, PipeTransform } from '@angular/core';

import { Note } from '../interfaces';

@Pipe({
  name: 'noteFilter'
})

export class NoteFilterPipe implements PipeTransform {
  transform(notes: Note[], v: string): Note[] {
    if (!notes) return [];
      return notes
        .filter(s => s.text.toLowerCase().match(v.toLowerCase()));
    }
}
