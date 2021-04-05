import {Injectable} from '@angular/core';
import {PanelTitleComponent} from '../components/panel-tab/sub-components/panel-title/panel-title.component';
// import {GlobaldataService} from "./globaldata.service";

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  activePanelTitle: PanelTitleComponent;

  activePanel: Panel = null;
  panels: Panel[] = [];


  get hasPanelActive(): boolean {
    return this.panels.findIndex(x => x.isActive) !== -1;
  }

  get activePanelIndex(): number {
    return this.panels.findIndex(x => x.isActive)
  }

  // panels: Panel[] = [
  //   // {
  //   //   id:1,
  //   //   title:"patient 1",
  //   //   isActive:true
  //   // },
  //   // {
  //   //   id:2,
  //   //   title:"patient 2",
  //   //   isActive:false
  //   // },
  //   // {
  //   //   id:3,
  //   //   title:"patient 3",
  //   //   isActive:false
  //   // }
  // ];

  constructor() {

  }

  public select(panelTitle: PanelTitleComponent) {
    // if(this.activePanelTitle){
    //   this.activePanelTitle.panel.isActive = false
    // }

    this.panels.map(x => {
      x.isActive = false;
    });

    this.activePanelTitle = panelTitle;
    this.activePanelTitle.panel.isActive = true;
    this.activePanel = this.activePanelTitle.panel;
  }


  public addPanel() {

    let panelId = 1;

    if (this.panels.length > 0) {
      panelId = this.panels.map(x => x.id).sort().reverse()[0] + 1;
    }


    const newPanel = {
      id: panelId,
      title: 'new patient',
      isActive: true
    };

    //before push
    this.panels.map(x => {
      x.isActive = false;
    });

    this.panels.push(newPanel);


    this.activePanel = newPanel;
    return this.activePanel;
  }

  public addOldPanel(patientName: string) {
    let panelId = 1;

    if (this.panels.length > 0) {
      panelId = this.panels.map(x => x.id).sort().reverse()[0] + 1;
    }

    const newPanel = {
      id: panelId,
      title: patientName,
      isActive: true
    };
    this.panels.push(newPanel);
    if (this.activePanelTitle) {
      this.activePanelTitle.panel.isActive = false;
    }

    this.activePanel = newPanel;
  }

  public panelIndex(panel: Panel): number {
    return this.panels.indexOf(panel);
  }

  public removePanel(index: number) {
    this.panels.splice(index, 1);
  }

}

export interface Panel {
  id: number
  title: string
  isActive: boolean
}
