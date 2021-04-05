import { Injectable } from '@angular/core';
import {DialogService} from './dialog.service';
import {NoteService} from './note.service';
import {PanelService} from './panel.service';
import {ObservationService} from './observation.service';
import {Patient} from './patient.service';



export interface Quest {
  name:string
  actions:QuestAction[]
}

export interface QuestAction {
  name:string
  action:()=>Promise<boolean>,
  isFinished:boolean
}



@Injectable({
  providedIn: 'root'
})
export class QuestService {

  currentPatient:Patient

  public quests:Quest[] = [
    {
      name:"Basic Check",
      actions:[
        {
          name:"Find Patient",
          action:()=>{
            return new Promise((resolve, reject)=>{
              this.dialogService.showInfoDialog().afterClosed().subscribe((patient)=>{

                if(patient){
                  this.noteService.addNote(this.panelService.activePanel,patient, 0, 0);
                  this.currentPatient = patient.data
                  return resolve(true)
                }

                return resolve(false)

              })
            })

          },
          isFinished:false
        },
        {
          name:"Check Observation",
          action:async ()=>{
            const observations = await this.observationService.searchByPatientId(this.currentPatient.id,this.currentPatient.code)
            this.noteService.addNote(this.panelService.activePanel,{
              type:"observation",
              data:observations
            }, 0, 320,"pink");
            return true
          },
          isFinished:false
        }
      ]
    },
    {
      name:"Check heart rate",
      actions:[]
    }
  ]
  constructor(
    private dialogService:DialogService,
    private noteService:NoteService,
    private panelService:PanelService,
    private observationService:ObservationService
  ) {

  }
}
