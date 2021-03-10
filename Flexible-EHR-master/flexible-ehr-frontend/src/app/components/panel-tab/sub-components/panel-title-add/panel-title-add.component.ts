import {Component, OnInit} from '@angular/core';
import {PanelService} from '../../../../services/panel.service';
import {DialogService} from '../../../../services/dialog.service';
import {NoteService} from '../../../../services/note.service';

@Component({
  selector: 'app-panel-title-add',
  templateUrl: './panel-title-add.component.html',
  styleUrls: ['./panel-title-add.component.scss']
})
export class PanelTitleAddComponent implements OnInit {
  val: any;

  constructor(
    public panelService: PanelService,
    private dialogService: DialogService,
    private noteService: NoteService
  ) {
  }

  ngOnInit() {
  }

  showInput() {
    this.dialogService.showInputComponent().afterClosed().subscribe((allnotes) => {
      if (allnotes == undefined) return;
      let panel = allnotes.data[0];
      let notes = allnotes.data[1];
      let colors = allnotes.data[2];
      let pos = allnotes.data[3];
      for (let i = 0; i < notes.length; i++) {
        this.noteService.addNote(panel, notes[i], pos[i][1], pos[i][0], colors[i]);
      }
    });
    this.val = undefined;
  }

  createNew() {
    this.panelService.addPanel();
    this.val = null;
  }
}
