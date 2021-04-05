import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {fromEvent} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {TemplateService} from "../../services/template.service";
import {MatDialogRef} from "@angular/material/dialog";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-addnewtemplate',
  templateUrl: './addnewtemplate.component.html',
  styleUrls: ['./addnewtemplate.component.scss']
})
export class AddnewtemplateComponent implements OnInit {
  templateName = new FormControl('', [Validators.required]);
  @ViewChild("templateNameInput")
  templateNameInput: ElementRef<HTMLInputElement>
  isDuplicate: boolean
  form: FormGroup;
  patient = new FormControl({value: true, disabled: true})
  observation = new FormControl()
  vital = new FormControl()
  medicationorder = new FormControl()
  diagnosticreport = new FormControl()
  isPublic = new FormControl()
  condition = new FormControl()
  ispublic = false;

  constructor(private templateService: TemplateService,
              private dialogRef: MatDialogRef<AddnewtemplateComponent>,
              private storeService: StoreService,
              ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    fromEvent(this.templateNameInput.nativeElement, "keyup").pipe(
      map(x => this.templateNameInput.nativeElement.value),
      debounceTime(200)
    ).subscribe(async (name) => {
      if (name == null) return
      const template = await this.templateService.getTemplateByName(name);
      if (template) {
        this.isDuplicate = true
      } else {
        this.isDuplicate = false
      }
    })
  }

  getErrorMessage() {
    return 'Name cannot be empty'
  }

  async add() {
    let data = ["patient"]
    if (this.observation.value) {
      data.push("observation")
    }
    if (this.vital.value) {
      data.push("vital")
    }
    if (this.medicationorder.value) {
      data.push("medicationorder")
    }
    if (this.diagnosticreport.value) {
      data.push("diagnosticreport")
    }
    if (this.condition.value) {
      data.push('condition')
    }
    if (this.isPublic.value) {
      this.ispublic = this.isPublic.value
    }
    let res = await this.templateService.saveTemplate(this.storeService.username, this.templateName.value, this.ispublic, data)

    this.dialogRef.close(res)
  }
}


