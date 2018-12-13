import { ApplicationService } from './_service/application.service';
import { Component, OnInit } from '@angular/core';
import { ListItem } from './_api/models';

const audioFileJson: ListItem[] = require('./audio&subtitle.json');
const categoryFileJson: ListItem[] = require('./category.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applicationService.setCountriesItems(audioFileJson);
    this.applicationService.setCategoriesItems(categoryFileJson);
  }
}
