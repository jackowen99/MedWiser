import {Component, Input, OnInit} from '@angular/core';
import {Vital} from '../../../services/vital.service';
import * as d3 from 'd3'

@Component({
  selector: 'app-vital-info-show',
  templateUrl: './vital-info-show.component.html',
  styleUrls: ['./vital-info-show.component.scss']
})

export class VitalInfoShowComponent implements OnInit {

  @Input()
  vitals: Vital[]

  @Input()
  consolidatedVitals: any[]

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

  chartOptions: any;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      markers: {
        size: 6,
        hover: {
          size: 10
        }
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      tooltip: {
        followCursor: false,
        theme: "dark",
        x: {
          show: false
        },
        marker: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          minWidth: 10
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };
  }

  chartOptionsDictionary: any;
  ngOnInit() {
    // if (this.hasSelect) {
    //   this.observations = this.dataSource.filteredData;
    // }
    if(this.hasSelect){
      return;
    }
    this.chartOptionsDictionary = {};
    for(let i = 0; i < this.vitals.length; i++){
      this.chartOptionsDictionary[this.vitals[i].code] = {
        chart: this.getChart(this.vitals[i]),
        series: this.getSeries(this.vitals[i])
      }
    }
  }

  getChart(vi: any){
    let chart = {
      type: "line",
      id: vi.code,
      height: 160,
      width: 500,
      group: 'vitals'
    }
    return chart;
  }

  getSeries(vi: any){
    console.log("test");
    var series = [{
      name: vi.code,
      data: []
    }];
    
    for(let i = 0; i < vi.values.length; i++){
      let date = new Date(vi.times[i]);
      series[0].data.push(
        {
          x: date,
          y: vi.values[i]
        }
      );
      console.log(vi.times[i]);
    }
    series[0].data.sort(function(a, b) {return b.x.getTime() - a.x.getTime()});
    return series;
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
