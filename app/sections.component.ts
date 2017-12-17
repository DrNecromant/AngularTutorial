import { Component } from '@angular/core';

interface Section {
    _id: string;
    title: string;
}

@Component({
    selector: 'sections',
    templateUrl: 'app/sections.component.html',
})

export class SectionsComponent {
  private sectionsUrl = 'sections';
  sections: Section[];
}
