import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddnewtemplateComponent} from "../addnewtemplate/addnewtemplate.component";
import {TemplateService} from "../../services/template.service";
import {AddfromtemplateComponent} from "../addfromtemplate/addfromtemplate.component";
import {NoteService} from "../../services/note.service";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-quest-nav',
  templateUrl: './quest-nav.component.html',
  styleUrls: ['./quest-nav.component.scss']
})

export class QuestNavComponent implements OnInit {

  templates: any = []
  constructor(
    private matDialog: MatDialog,
    private templateService: TemplateService,
    private noteService: NoteService,
    private storeService: StoreService
  ) {
  }

  async ngOnInit() {
    this.templates = await this.templateService.getAllTemplates(this.storeService.username)
  }

  showInput(temp: Template) {
    return this.matDialog.open(AddfromtemplateComponent, {
      minWidth: "800px",
      minHeight: "600px",
      data: temp
    }).afterClosed().subscribe(async (allnotes) => {
      if (allnotes == undefined || allnotes == null) {
        this.templates = await this.templateService.getAllTemplates(this.storeService.username)
        return;
      }
      let panel = allnotes.data[0];
      let notes = allnotes.data[1];
      let colors = allnotes.data[2];
      for (let i = 0; i < notes.length; i++) {
        this.noteService.addNote(panel, notes[i], i * 200 + 600, i * 20 + 50, colors[i]);
      }
    });
  }

  openAddDiag() {
    this.matDialog.open(AddnewtemplateComponent, {
      minWidth: "800px",
      minHeight: "600px",
      data: []
    }).afterClosed().subscribe(data => {
      if(!data) {
        return
      }
      let temp = new Template()
      temp.id = data.id
      temp.templateName = data.templateName
      temp.username = data.username
      temp.isPublic = data.isPublic
      temp.templateDetail = data.templateDetail

      this.templates.push(temp)
    })
  }

}

export class Template {
  id: number;
  templateName: string;
  username: string;
  isPublic: boolean;
  templateDetail: string[]
}
