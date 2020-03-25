import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from '../canvasjs.min';

interface Smartmeter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-smartmeter',
  templateUrl: './smartmeter.component.html',
  styleUrls: ['./smartmeter.component.css']
})

export class SmartmeterComponent implements OnInit {
  public smartmeters: Smartmeter[] = [
    {value: '2019-ETI-EMON-V01-6959C0-1640EF', viewValue: '2019-ETI-EMON-V01-6959C0-1640EF'},
    {value: '2019-ETI-EMON-V01-4AA1C8-1640EF', viewValue: '2019-ETI-EMON-V01-4AA1C8-1640EF'},
    {value: '2019-ETI-EMON-V01-C60300-1640EF', viewValue: '2019-ETI-EMON-V01-C60300-1640EF'},
    {value: '2019-ETI-EMON-V01-24B094-1640EF', viewValue: '2019-ETI-EMON-V01-24B094-1640EF'}
  ];
  constructor() { }

  ngOnInit(): void {
        let dataPoints = [];
        let dataPoints2 = [];
        let dataPoints3 = [];
        let dataPoints4 = [];
        let chart = new CanvasJS.Chart("chartContainerSmartMeter",{
          exportEnabled: true,
          title:{
            text:"Smartmeter"
          },
          toolTip: {
            shared: true
          },
          axisX: {
            valueFormatString: "HH:mm:ss"
          },
          data: [{
            type: "line",
            name: "Verbruikte stroom in Watt door 2019-ETI-EMON-V01-6959C0-1640EF",
            showInLegend: true,
            dataPoints : dataPoints,
          },
          {
            type: "line",
            name: "Verbruikte stroom in Watt door 2019-ETI-EMON-V01-4AA1C8-1640EF",
            showInLegend: true,
            dataPoints : dataPoints2,
          }
          ,
          {
            type: "line",
            name: "Verbruikte stroom in Watt door 2019-ETI-EMON-V01-C60300-1640EF",
            showInLegend: true,
            dataPoints : dataPoints3,
          }
          ,
          {
            type: "line",
            name: "Verbruikte stroom in Watt door 2019-ETI-EMON-V01-24B094-1640EF",
            showInLegend: true,
            dataPoints : dataPoints4,
          }]
        });
        
        
        initChart("2019-ETI-EMON-V01-6959C0-1640EF", dataPoints);
        initChart("2019-ETI-EMON-V01-4AA1C8-1640EF", dataPoints2);
        initChart("2019-ETI-EMON-V01-C60300-1640EF", dataPoints3);
        initChart("2019-ETI-EMON-V01-24B094-1640EF", dataPoints4);
          
          function initChart(smartmeter, datapoints) {	
            $.getJSON("https://fierce-headland-16320.herokuapp.com/smartmeter/" + smartmeter + "/backh/12", function(data) {
              $.each(data, function(key, value) {

                datapoints.push({x: new Date(value.RecordDate), y: value.power_delivered});
              });
              chart.render();
              setTimeout(function(){updateChart(smartmeter, datapoints)}, 1000);;
            });
            }


        function updateChart(smartmeter, datapoints) {	
        $.getJSON("https://fierce-headland-16320.herokuapp.com/smartmeter/" + smartmeter + "/latest", function(data) {
          
        datapoints.push({x: new Date(data.RecordDate), y: data.power_delivered});
          
          if (datapoints.length >  200 ) {
              datapoints.shift();	
          }
          chart.render();
          setTimeout(function(){updateChart(smartmeter, datapoints)}, 5000);
        });
          }
  }
}
