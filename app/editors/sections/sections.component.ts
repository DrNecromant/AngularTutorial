import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { LoginService } from '../../services/api/login.service';
import { SectionService } from '../../services/api/section.service';

import { Section } from '../../interfaces';

@Component({
  selector: 'sections',
  templateUrl: 'app/editors/sections/sections.component.html',
})

export class SectionsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  sections: Section[];
  activeSection: string;

  constructor(
    private loginService: LoginService,
    private sectionService: SectionService,
    private dragulaService: DragulaService,
  ) { }

  @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  set section(section: string) {
    if (section && section.length > 0) {
      this.activeSection = section;
    }
  }

  ngOnInit() {
    this.read();
    this.loginService.userLogin$.subscribe(user => this.read());
    this.dragulaService.drop.asObservable()
      .takeUntil(this.destroy$)
      .subscribe(this.onDrop.bind(this));
  }

  read() {
    this.sectionService.getSections().subscribe(sections => {
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
    this.sectionService.addSection(section).subscribe(response => this.read());
  }

  onDrop(value) {
    let [bag, elementMoved, targetContainer, srcContainer] = value;
    if (targetContainer.children) {
      let arr = Array.from(targetContainer.children);
      this.sections = arr.map((li: HTMLLIElement) => {
        return { title: li.textContent.trim() }
      });
      this.sectionService.writeSections(this.sections)
        .subscribe(response => this.read());
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
