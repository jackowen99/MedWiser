import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Panel, PanelService} from '../../../../services/panel.service';
import {NoteService} from '../../../../services/note.service';
import {GlobaldataService} from "../../../../services/globaldata.service";

@Component({
  selector: 'app-panel-title',
  templateUrl: './panel-title.component.html',
  styleUrls: ['./panel-title.component.scss']
})
export class  PanelTitleComponent implements OnInit {


  @Input()
  public panel:Panel

  constructor(
    public panelService:PanelService,
    public noteService:NoteService,
    public globaldata: GlobaldataService
  ) { }

  ngOnInit() {
    if(!this.panelService.activePanelTitle ){
      if(!this.panelService.hasPanelActive){
        this.panelService.select(this)
      }
      else {
        if(this.panel.isActive){
          this.panelService.select(this)
        }
      }


    }
  }

  ngAfterViewInit() {
    if(!this.panelService.activePanelTitle ){
      if(!this.panelService.hasPanelActive){
        this.panelService.select(this)
      }
      else {
        if(this.panel.isActive){
          this.panelService.select(this)
        }
      }
    }
  }

  select(){
    this.panelService.select(this)
  }


  removePanel() {
    const index = this.panelService.panelIndex(this.panel);
    this.panelService.removePanel(index)
    delete this.noteService.panel_notes_map[this.panel.id]
    this.globaldata.removePatient(index)
    this.globaldata.removeDataSource(index)
  }
}
