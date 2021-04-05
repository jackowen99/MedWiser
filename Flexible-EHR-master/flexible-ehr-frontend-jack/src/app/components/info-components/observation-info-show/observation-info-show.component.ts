import {Component, Input, OnInit} from '@angular/core';
import {Observation} from '../../../services/observation.service';
import * as d3 from 'd3'

@Component({
  selector: 'app-observation-info-show',
  templateUrl: './observation-info-show.component.html',
  styleUrls: ['./observation-info-show.component.scss']
})

export class ObservationInfoShowComponent implements OnInit {

  @Input()
  observations: Observation[]

  // @Input()
  // dataSource: MatTableDataSource<Observation>

  @Input()
  hasSelect: boolean = true

  // displayedColumns: string[] = ['Field', 'Value', 'Select'];

  // @ViewChild(MatPaginator) set content(paginator: MatPaginator) {
  //   if (this.hasSelect) {
  //     this.dataSource.paginator = paginator;
  //   }
  // } ;


  constructor() {

  }

  ngOnInit() {
    // if (this.hasSelect) {
    //   this.observations = this.dataSource.filteredData;
    // }
  }


  showRange(min: number, max: number, median: string, id: string, event) {
    let element = event.target;
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 100 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Show the Y scale
    var y = d3.scaleLinear()
      .domain([0, 24])
      .range([height, 0]);
//    svg.call(d3.axisLeft(y))

// a few features for the box
    var center = 50
    var width = 50

// Show the main vertical line

    svg
      .append("line")
      .attr("x1", center)
      .attr("x2", center)
      .attr("y1", y(min))
      .attr("y2", y(max))
      .attr("stroke", "black")


// Show the box
    svg
      .append("rect")
      .attr("x", center - width / 2)
      .attr("y", y(max))
      .attr("height", (y(min) - y(max)))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "#69b3a2")

// show median, min and max horizontal lines
    svg
      .selectAll("toto")
      .data([min, max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2)
      .attr("x2", center + width / 2)
      .attr("y1", function (d) {
        return (y(d))
      })
      .attr("y2", function (d) {
        return (y(d))
      })
      .attr("stroke", "black")

    svg
      .selectAll("toto")
      .data([parseInt(median)])
      .enter()
      .append("line")
      .attr("x1", center - width / 2)
      .attr("x2", center + width / 2)
      .attr("y1", function (d) {
        return (y(d))
      })
      .attr("y2", function (d) {
        return (y(d))
      })
      .attr("stroke", "red")
  }

}
