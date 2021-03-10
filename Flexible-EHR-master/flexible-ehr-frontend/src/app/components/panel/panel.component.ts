import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {CardComponent} from '../card/card.component';
import {StoreService} from '../../services/store.service';
import {DialogService} from '../../services/dialog.service';
import {Panel} from '../../services/panel.service';
import {SearchService} from '../../services/search.service';
import {GlobaldataService} from '../../services/globaldata.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {


  @ViewChild('panel')
  panelElem: ElementRef<HTMLDivElement>;


  @Input()
  panel: Panel;

  currentScale = 1;
  currentMouseX = 0;
  currentMouseY = 0;

  hasPatient: boolean;
  patient = [];

  get isShowDetail() {
    return this.currentScale > 0.5;
  }

  get notes() {
    let notes = this.noteService.getNotesByPanel(this.panel).filter(this.searchService.searchCreteria);
    this.patient = notes.filter(n => n.cardOption.type == 'patient');
    this.hasPatient = this.patient.length == 0 ? false : true;
    return this.noteService.getNotesByPanel(this.panel).filter(this.searchService.searchCreteria);
  }

  cards: CardComponent[] = [];

  constructor(
    public noteService: NoteService,
    public storeService: StoreService,
    private dialogService: DialogService,
    private searchService: SearchService,
    public globalService: GlobaldataService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }


  createNewNote(event: MouseEvent) {

    const rect = this.panelElem.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left);
    const y = (event.clientY - rect.top);
    this.currentMouseX = x;
    this.currentMouseY = y;
    this._updateChildrenScale(1);

    this.dialogService.showInfoDialog().afterClosed().subscribe((note) => {
      if (note) {
        this.noteService.addNote(this.panel, note, x, y);
      }

    });

  }


  scaleDown() {
    const rect = this.panelElem.nativeElement.getBoundingClientRect();
    this._updateChildrenScale(this.currentScale + 0.1);

  }

  scaleUp() {
    const rect = this.panelElem.nativeElement.getBoundingClientRect();
    this._updateChildrenScale(this.currentScale - 0.1);
  }

  private changeScale() {

  }

  @HostListener('mousewheel', ['$event']) onMousewheel(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault();
      event.stopPropagation();
      if (this.currentScale < 0.01 && event.deltaY > 0) {
        return;
      }
      const rect = this.panelElem.nativeElement.getBoundingClientRect();
      this.currentMouseX = (event.clientX - rect.left);
      this.currentMouseY = (event.clientY - rect.top);

      this._updateChildrenScale(this.currentScale - event.deltaY * 0.01);
      // this._updateChildrenScale(this.currentMouseX, this.currentMouseY, this.currentScale - event.deltaY * 0.01);
      // this._updateChildrenScale(mouseX, mouseY, this.currentScale - event.deltaY * 0.01);

      // this._updateMousePosition(event)
      // this.changeScale()
    }


  }


  // private _updateMousePosition(event){
  //   const rect = (event.target as any).getBoundingClientRect();
  //   this.currentMouseX = (event.clientX - rect.left) / this.currentScale
  //   this.currentMouseY = (event.clientY - rect.top)  / this.currentScale
  // }


  private _updateChildrenPosition(xOffset, yOffset) {
    for (let card of this.cards) {
      card.updatePosition(xOffset, yOffset);
    }
  }

  private _updateChildrenScale(newScale) {
    const scaleDiff = newScale / this.currentScale;
    this.currentScale = newScale;
    for (let card of this.cards) {
      card.updateScale(scaleDiff, newScale);
    }
  }


  isPanning: boolean = false;
  panX: number;
  panY: number;

  onMouseDown(event: MouseEvent) {
    const rect = this.panelElem.nativeElement.getBoundingClientRect();
    this.panX = (event.clientX - rect.left);
    this.panY = (event.clientY - rect.top);
    // console.log(this.panX, this.panY);
    this.isPanning = true;
  }

  onMouseUp() {
    this.isPanning = false;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isPanning) {
      const rect = this.panelElem.nativeElement.getBoundingClientRect();
      const newPanX = (event.clientX - rect.left);
      const newPanY = (event.clientY - rect.top);
      this._updateChildrenPosition((newPanX - this.panX) / this.currentScale, (newPanY - this.panY) / this.currentScale);

      this.panX = newPanX;
      this.panY = newPanY;
    }

  }

  save() {
    window.localStorage.setItem('flex-ehr', JSON.stringify(this.noteService.panel_notes_map));
  }

}
