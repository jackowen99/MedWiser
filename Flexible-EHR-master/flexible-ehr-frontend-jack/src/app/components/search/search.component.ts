import { Component, OnInit } from '@angular/core';
import {ColorService} from '../../services/color.service';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public colorService:ColorService,
    public searchService:SearchService
  ) { }

  ngOnInit() {
  }

}
