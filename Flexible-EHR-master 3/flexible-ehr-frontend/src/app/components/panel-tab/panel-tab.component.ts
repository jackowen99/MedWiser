import { Component, OnInit } from '@angular/core';
import {PanelService} from '../../services/panel.service';

@Component({
  selector: 'app-panel-tab',
  templateUrl: './panel-tab.component.html',
  styleUrls: ['./panel-tab.component.scss']
})
export class PanelTabComponent implements OnInit {

  constructor(
    public panelService:PanelService
  ) { }

  ngOnInit() {
  }

}
