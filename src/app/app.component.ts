/*app.component.ts*/
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
 
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
 
export class AppComponent implements OnInit {
  title = "Realtime graphs"
	ngOnInit() {
    //graph 1
  let dataPoints = [];
  let dataPoints2 = [];
	let chart = new CanvasJS.Chart("chartContainer",{
		exportEnabled: true,
		title:{
			text:"Temperatuur/luchtvochtigheid"
    },
	  toolTip: {
		  shared: true
	  },
    axisX: {
      valueFormatString: "DD MMMM YYYY HH:mm:ss"
    },
		data: [{
      type: "line",
      name: "Luchtvochtigheid",
      showInLegend: true,
			dataPoints : dataPoints2,
		},{
      type: "line",
      name: "Temperatuur",
      showInLegend: true,
			dataPoints : dataPoints,
    }]
	});
	
	$.getJSON("https://fierce-headland-16320.herokuapp.com/moistmeter/1/1/latest", function(data) {  
      dataPoints.push({x: new Date(data.RecordDate), y: data.Temperature});
      dataPoints2.push({x: new Date(data.RecordDate), y: data.Humidity});
		chart.render();
    updateChart();
	});
	function updateChart() {	
	$.getJSON("https://fierce-headland-16320.herokuapp.com/moistmeter/1/1/latest", function(data) {
		$.each(data, function(key, value) {
      dataPoints.push({x: new Date(data.RecordDate), y: data.Temperature});
      dataPoints2.push({x: new Date(data.RecordDate), y: data.Humidity});
		});
		
		if (dataPoints.length >  200 ) {
          dataPoints.shift();
          dataPoints2.shift();				
      	}
		chart.render();
		setTimeout(function(){updateChart()}, 3000);
	});
    }
    



    //graph 2
    let dataPoints3 = [];
    let dataPoints4 = [];
    let chart2 = new CanvasJS.Chart("chartContainer2",{
      exportEnabled: true,
      title:{
        text:"Smartmeter"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY HH:mm:ss"
      },
      data: [{
        type: "line",
        name: "power_delivered",
        showInLegend: true,
        dataPoints : dataPoints2,
      },{
        type: "line",
        name: "energy_delivered_tariff1",
        showInLegend: true,
        dataPoints : dataPoints,
      }]
    });
    
    $.getJSON("https://fierce-headland-16320.herokuapp.com/smartmeter/2019-ETI-EMON-V01-6959C0-1640EF/latest", function(data) {  
      dataPoints3.push({x: new Date(data.RecordDate), y: data.power_delivered});
      dataPoints4.push({x: new Date(data.RecordDate), y: data.energy_delivered_tariff1});
      chart2.render();
      updateChart2();
    });
    function updateChart2() {	
    $.getJSON("https://fierce-headland-16320.herokuapp.com/smartmeter/2019-ETI-EMON-V01-6959C0-1640EF/latest", function(data) {
      $.each(data, function(key, value) {
        dataPoints3.push({x: new Date(data.RecordDate), y: data.power_delivered});
        dataPoints4.push({x: new Date(data.RecordDate), y: data.energy_delivered_tariff1});
      });
      
      if (dataPoints3.length >  200 ) {
            dataPoints3.shift();
            dataPoints4.shift();				
          }
      chart2.render();
      setTimeout(function(){updateChart2()}, 3000);
    });
      }
}
}

