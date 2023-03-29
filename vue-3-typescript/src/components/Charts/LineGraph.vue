<template>
    <div id="chartdiv" style="width: 900px; height: 800px;"></div>
</template>
  
<script lang="ts">
    import { Vue } from "vue-class-component";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import { Prop } from "vue-property-decorator/lib/decorators/Prop";

    am4core.useTheme(am4themes_animated);


     export default class LineGraph extends Vue {

        @Prop() public importedData: any[] | undefined;
        @Prop() public xAxis: any[] | undefined;
        @Prop() public yAxis: any[] | undefined;

        public chart: am4charts.XYChart = new am4charts.XYChart;

        public mounted() {

            am4core.disposeAllCharts();
            
            let chart = am4core.create("chartdiv", am4charts.XYChart);
        
            chart.paddingRight = 20;
            chart.dateFormatter.dateFormat = "yyyy";
        
            if (this.importedData) chart.data = this.importedData;
        
            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.title.text = "Year";
        
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;
            valueAxis.title.text = "Average mark";
            valueAxis.min = 40;
            valueAxis.max = 100;
        
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "assessmentDate";
            series.dataFields.valueY = "assessmentMark";
        
            series.tooltipText = "{dateX}\n{valueY.value}";
            chart.cursor = new am4charts.XYCursor();

        
            this.chart = chart;
        }
    
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    } 
</script>