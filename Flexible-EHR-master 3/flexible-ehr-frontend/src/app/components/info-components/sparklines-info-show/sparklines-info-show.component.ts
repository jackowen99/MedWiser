import {Component, Input, OnInit} from '@angular/core';
import {SparklineDetails} from "../../../services/sparklines.service";
import {RangeBand} from "../../../_dummyData/range-band";

@Component({
  selector: 'app-sparklines-info-show',
  templateUrl: './sparklines-info-show.component.html',
  styleUrls: ['./sparklines-info-show.component.scss']
})
export class SparklinesInfoShowComponent implements OnInit {
  @Input()
  sparklineDetails: SparklineDetails[]

  @Input()
  hasSelect:boolean = true

  data: any[] = [];

  constructor(private range: RangeBand) { }

  ngOnInit() {
    for (let i in this.sparklineDetails) {
      if (this.sparklineDetails[i].value.length > 1) {
        let ranges = this.range[this.sparklineDetails[i].name];
        if (ranges == undefined) ranges = [10, 20]
        this.data.push({id: i,
          name: this.sparklineDetails[i].name,
          value: this.sparklineDetails[i].value,
          rangeBandSettings: [{
            startRange: ranges[0],
            endRange: ranges[1],
            color: '#00ff00',
            opacity:1
          }]
        })
      }
    }
  }

}
