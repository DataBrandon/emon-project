import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from '../canvasjs.min';
 

@Component({
  selector: 'app-moist-sensor',
  templateUrl: './moist-sensor.component.html',
  styleUrls: ['./moist-sensor.component.css']
})
export class MoistSensorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  let dataPoints = [];
  let dataPoints2 = [];
	let chart = new CanvasJS.Chart("chartContainerMoist",{
		exportEnabled: true,
		title:{
			text:"Temperatuur/luchtvochtigheid"
    },
	  toolTip: {
		  shared: true
	  },
    axisX: {
      valueFormatString: "HH:mm:ss"
    },
		data: [{
      type: "line",
      name: "Luchtvochtigheid in %",
      showInLegend: true,
      dataPoints : dataPoints2,
		},{
      type: "line",
      name: "Temperatuur in °C",
      showInLegend: true,
			dataPoints : dataPoints,
    }]
	});
	
	$.getJSON("https://fierce-headland-16320.herokuapp.com/moistmeter/1/1/latest/1000", function(data) {  
    $.each(data, function(key, value) {
      dataPoints.push({x: new Date(value.RecordDate), y: value.Temperature});
      dataPoints2.push({x: new Date(value.RecordDate), y: value.Humidity});
    });
		chart.render();
    updateChart();
	});
	function updateChart() {	
	$.getJSON("https://fierce-headland-16320.herokuapp.com/moistmeter/1/1/latest", function(data) {
      dataPoints.push({x: new Date(data.RecordDate), y: data.Temperature});
      dataPoints2.push({x: new Date(data.RecordDate), y: data.Humidity});
		
		if (dataPoints.length >  1000 ) {
          dataPoints.shift();
          dataPoints2.shift();				
      	}
		chart.render();
		setTimeout(function(){updateChart()}, 5000);
	});
    }
  }
}
