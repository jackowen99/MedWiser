import {Injectable} from '@angular/core';
import {Patient} from './patient.service';
import {Panel, PanelService} from './panel.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {


  panel_notes_map: { [key: number]: Note[] } = {};

  constructor(

  ) {

  }

  addNote(panel:Panel, cardOption:CardOption, left: number, top: number, color:string= "white") {
    if(!this.panel_notes_map[panel.id]){
      this.panel_notes_map[panel.id] = []
    }


    this.panel_notes_map[panel.id].push({
      cardOption,
      color,
      left,
      top,
      offeset:{
        dx:-500,
        dy:0
      }
    });
  }

  removeNote(panel:Panel,note:Note){
    const notes = this.panel_notes_map[panel.id]
    const toDelete = notes.indexOf(note)
     notes.splice(toDelete,1)
  }

  getNotesByPanel(panel:Panel){
    return this.panel_notes_map[panel.id] || []
  }
}


export interface Note {
  cardOption: CardOption
  color: string,
  left:number,
  top:number,
  offeset:{
    dx:number,
    dy:number
  }
}

export interface CardOption {
  type:string
  data:any,
  parameters?:any
}

