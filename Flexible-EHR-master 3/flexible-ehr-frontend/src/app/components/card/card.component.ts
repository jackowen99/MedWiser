import {Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {Note, NoteService} from '../../services/note.service';
import {DomSanitizer} from '@angular/platform-browser';
import {PanelComponent} from '../panel/panel.component';
import {ColorService} from '../../services/color.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  


  @Input()
  note: Note;
  matrix: string;

  @Input()
  labtests: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public panel: PanelComponent,
    private noteService: NoteService,
    public colorService: ColorService,
  ) {
  }

  ngOnInit() {
    this.panel.cards.push(this);
    this.elementRef.nativeElement.style.left = this.note.left + 'px';
    this.elementRef.nativeElement.style.top = this.note.top + 'px';
    this.matrix = `matrix(1,0,0,1,${this.note.offeset.dx}, ${this.note.offeset.dy})`;
    this.updateMatrix();
  }

  getHeader(s: string){
    if(s == "patient"){
      return "Patient Info";
    }
    if(s == "observation"){
      return "Observation";
    }
    if(s =="vital"){
      return "Vital Signs";
    }
    if(s =="medicationorder"){
      return "Medication Order";
    }
    if(s =="diagnosticreport"){
      return "Diagnostic Report";
    }
    if(s =="condition"){
      return "Conditions";
    }
    if(s =="allergyInTolerance"){
      return "Allergy Intolerance"
    }
    if(s =="documentreference"){
      return "Document Reference";
    }
    if(s =="immunization"){
      return "Immunization";
    }
    if(s =="procedure"){
      return "Procedure";
    }
    if(s =="sparklines"){
      return "Sparklines";
    }
    console.log("test");
    return "";

  }

  public updateScale(scaleDiff: number, newScale: number) {

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = scale(rect.x, this.panel.currentMouseX, scaleDiff);
    const y = scale(rect.y, this.panel.currentMouseY, scaleDiff);

    const offset = this.note.offeset;
    offset.dx = offset.dx + x;
    offset.dy = offset.dy + y;
    if (this.panel.isShowDetail) {
      this.matrix = `matrix(${newScale},0,0,${newScale},${offset.dx}, ${offset.dy})`;
    } else {
      this.matrix = `matrix(1,0,0,1,${offset.dx}, ${offset.dy})`;
    }

    this.updateMatrix();

    // console.log(this.elementRef.nativeElement.style.left,this.elementRef.nativeElement.style.top);
  }

  public updatePosition(dx, dy) {
    const offset = this.note.offeset;
    offset.dx += dx * this.panel.currentScale;
    offset.dy += dy * this.panel.currentScale;
    if (this.panel.isShowDetail) {
      this.matrix = `matrix(${this.panel.currentScale},0,0,${this.panel.currentScale},${this.note.offeset.dx}, ${this.note.offeset.dy})`;
    } else {
      this.matrix = `matrix(1,0,0,1,${this.note.offeset.dx}, ${this.note.offeset.dy})`;
    }

    this.updateMatrix();
  }

  public updateMatrix() {
    this.elementRef.nativeElement.style.transform = this.matrix;
  }


  public removeNote() {
    this.noteService.removeNote(this.panel.panel, this.note);

  }

  public changeColor(color: string) {
    this.note.color = color;

  }

  mouseDownX: number = 0;
  mouseDownY: number = 0;
  isPress = false;


  onMousedown($event: MouseEvent) {
    // console.log(this.isPress);
    if (this.isPress) {

      this.isPress = false;

    } else {
      this.mouseDownX = $event.clientX;
      this.mouseDownY = $event.clientY;
      this.isPress = true;

    }

  }

  onMousemove($event: MouseEvent) {
    if (this.isPress) {

      this.updatePosition(($event.clientX - this.mouseDownX) / this.panel.currentScale, ($event.clientY - this.mouseDownY) / this.panel.currentScale);
      this.mouseDownX = $event.clientX;
      this.mouseDownY = $event.clientY;
    }
  }

  onMouseup() {
    this.isPress = false;

  }


  observationSummary() {
    return this.note.cardOption.data.map(x => x.code).join(', ');
  }


}

function scale(x, c, scaleDiff) {
  return (x - c) * (scaleDiff - 1);
}

