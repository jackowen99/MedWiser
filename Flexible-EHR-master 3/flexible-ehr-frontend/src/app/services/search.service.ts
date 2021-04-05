import { Injectable } from '@angular/core';
import {Note, NoteService} from './note.service';

const alwaysTrue = (note)=>true

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchCreteria:(Note)=>boolean = alwaysTrue

  constructor(
    private noteService:NoteService
  ) {

  }

  searchByName(name){
    this.searchCreteria = (note:Note)=>{
      return note.cardOption.data.name && note.cardOption.data.name.toLowerCase().indexOf(name) !== -1
    }
  }

  searchByColor(color){
    this.searchCreteria = (note:Note)=>{
      return note.color === color
    }
  }

  reset(){
    this.searchCreteria = alwaysTrue
  }



}
