import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'view-section',
    templateUrl: 'app/viewSection.component.html',
})

export class ViewSectionComponent implements OnInit {
  sectiontext: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {  
    this.sectiontext = this.route.snapshot.params["name"];
  }
}
