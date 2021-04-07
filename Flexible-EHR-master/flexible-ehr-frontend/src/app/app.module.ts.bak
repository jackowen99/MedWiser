import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PanelComponent} from './components/panel/panel.component';
import {CardComponent} from './components/card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatNavList, MatSidenavModule, MatTabsModule,
  MatToolbarModule,
  MatSelectModule,
  MatExpansionModule,
  MatRadioModule,
  MatTableModule, MatPaginatorModule,
} from '@angular/material';
import {NoteService} from './services/note.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SafePipe} from './pipes/safe.pipe';
import {ColorService} from './services/color.service';
import {InfoSelectDialogComponent} from './dialog/info-select-dialog/info-select-dialog.component';
import {PatientInfoComponent} from './components/info-components/patient-info/patient-info.component';
import {HttpClientModule} from '@angular/common/http';
import {PatientInfoShowComponent} from './components/info-components/patient-info-show/patient-info-show.component';
import {PanelTabComponent} from './components/panel-tab/panel-tab.component';
import {PanelTitleComponent} from './components/panel-tab/sub-components/panel-title/panel-title.component';
import {PanelService} from './services/panel.service';
import {PanelTitleAddComponent} from './components/panel-tab/sub-components/panel-title-add/panel-title-add.component';
import {SearchComponent} from './components/search/search.component';
import {SearchService} from './services/search.service';
import {ObservationInfoComponent} from './components/info-components/observation-info/observation-info.component';
import {ObservationInfoShowComponent} from './components/info-components/observation-info-show/observation-info-show.component';
import {ObservationService} from './services/observation.service';
import {QuestNavComponent} from './components/quest-nav/quest-nav.component';
import {QuestService} from './services/quest.service';
import {HttpService} from './services/http.service';
import {RouterModule} from '@angular/router';
import {MedicationorderService} from './services/medicationorder.service';
import {DiagnosticreportService} from './services/diagnosticreport.service';
import {ConditionsService} from './services/conditions.service';
import {MedicationInfoComponent} from './components/info-components/medication-info/medication-info.component';
import {MedicationInfoShowComponent} from './components/info-components/medication-info-show/medication-info-show.component';
import {DiagnosticreportInfoShowComponent} from './components/info-components/diagnosticreport-info-show/diagnosticreport-info-show.component';
import {DiagnosticreportInfoComponent} from './components/info-components/diagnosticreport-info/diagnosticreport-info.component';
import {ConditionsInfoComponent} from './components/info-components/conditions-info/conditions-info.component';
import {ConditionsInfoShowComponent} from './components/info-components/conditions-info-show/conditions-info-show.component';
import {PanelTitleAddInputComponent} from './components/panel-tab/sub-components/panel-title-add-input/panel-title-add-input.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatasourcechoiceComponent} from './components/info-components/datasourcechoice/datasourcechoice.component';
import {LabtestsComponent} from './components/info-components/labtests/labtests.component';
import {LabtestsShowComponent} from './components/info-components/labtests-show/labtests-show.component';
import {GlobaldataService} from './services/globaldata.service';
import {SearchchoiceComponent} from './components/info-components/searchchoice/searchchoice.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MedicationComponent} from './components/info-components/medication/medication.component';
import {MedicationShowComponent} from './components/info-components/medication-show/medication-show.component';
import {AllergyInToleranceInfoComponent} from './components/info-components/allergyInTolerance-info/allergyInTolerance-info.component';
import {AllergyInToleranceInfoShowComponent} from './components/info-components/allergyInTolerance-info-show/allergyInTolerance-info-show.component';
import {DocumentreferenceInfoComponent} from './components/info-components/documentreference-info/documentreference-info.component';
import {ImmunizationInfoComponent} from './components/info-components/immunization-info/immunization-info.component';
import {DocumentreferenceInfoShowComponent} from './components/info-components/documentreference-info-show/documentreference-info-show.component';
import {ProcedureInfoComponent} from './components/info-components/procedure-info/procedure-info.component';
import {ImmunizationInfoShowComponent} from './components/info-components/immunization-info-show/immunization-info-show.component';
import {ProcedureInfoShowComponent} from './components/info-components/procedure-info-show/procedure-info-show.component';
import {ProcedurerequestInfoComponent} from './components/info-components/procedurerequest-info/procedurerequest-info.component';
import {VisualizationInfoComponent} from './components/info-components/visualization-info/visualization-info.component';
import {AddfromtemplateComponent} from './components/addfromtemplate/addfromtemplate.component';
import {AddnewtemplateComponent} from './components/addnewtemplate/addnewtemplate.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SparklinesInfoComponent} from './components/info-components/sparklines-info/sparklines-info.component';
import {SparklinesInfoShowComponent} from './components/info-components/sparklines-info-show/sparklines-info-show.component';
import {SparklineModule} from '@syncfusion/ej2-angular-charts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RangeBand} from "./_dummyData/range-band";
import {RangeAbbre} from "./_dummyData/range-abbre";
import { VitalInfoComponent } from './components/info-components/vital-info/vital-info.component';
import { VitalInfoShowComponent } from './components/info-components/vital-info-show/vital-info-show.component';
import {VitalService} from './services/vital.service';
import { NgApexchartsModule } from "ng-apexcharts";
import { LaboratoryInfoComponent } from './components/info-components/laboratory-info/laboratory-info.component';
import { LaboratoryInfoShowComponent } from './components/info-components/laboratory-info-show/laboratory-info-show.component';
import { LaboratoryService } from './services/laboratory.service';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    CardComponent,
    SafePipe,
    InfoSelectDialogComponent,
    PatientInfoComponent,
    PatientInfoShowComponent,
    PanelTabComponent,
    PanelTitleComponent,
    PanelTitleAddComponent,
    SearchComponent,
    ObservationInfoComponent,
    ObservationInfoShowComponent,
    QuestNavComponent,
    MedicationInfoComponent,
    MedicationInfoShowComponent,
    DiagnosticreportInfoShowComponent,
    DiagnosticreportInfoComponent,
    ConditionsInfoComponent,
    ConditionsInfoShowComponent,
    PanelTitleAddInputComponent,
    DatasourcechoiceComponent,
    LabtestsComponent,
    LabtestsShowComponent,
    LaboratoryInfoComponent,
    LaboratoryInfoShowComponent,
    SearchchoiceComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    MedicationComponent,
    MedicationShowComponent,
    AllergyInToleranceInfoComponent,
    AllergyInToleranceInfoShowComponent,
    DocumentreferenceInfoComponent,
    ImmunizationInfoComponent,
    DocumentreferenceInfoShowComponent,
    ProcedureInfoComponent,
    ImmunizationInfoShowComponent,
    ProcedureInfoShowComponent,
    ProcedurerequestInfoComponent,
    VisualizationInfoComponent,
    AddfromtemplateComponent,
    AddnewtemplateComponent,
    SparklinesInfoComponent,
    SparklinesInfoShowComponent,
    VitalInfoComponent,
    VitalInfoShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatAutocompleteModule,
    MatTabsModule,
    HttpClientModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    DragDropModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    SparklineModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgApexchartsModule
  ],
  exports: [
    DragDropModule
  ],
  providers: [
    NoteService,
    ColorService,
    PanelService,
    SearchService,
    ObservationService,
    MedicationorderService,
    DiagnosticreportService,
    ConditionsService,
    QuestService,
    HttpService,
    GlobaldataService,
    RangeBand,
    RangeAbbre,
    VitalService,
    LaboratoryService
  ],
  entryComponents: [
    InfoSelectDialogComponent,
    PanelTitleAddInputComponent,
    AddnewtemplateComponent,
    AddfromtemplateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
