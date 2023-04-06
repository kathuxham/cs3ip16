<template>
    <div :id="idName" :style="[source == 'dashboard' ? 'height: 300px' : 'height: 400px;  position: inherit']"></div>
</template>
  
<script lang="ts">
    import { Vue } from "vue-class-component";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import { Prop } from "vue-property-decorator/lib/decorators/Prop";

    am4core.useTheme(am4themes_animated);

    export default class BarChart extends Vue {

        @Prop() public importedData: any[] | undefined;
        @Prop() public xAxis: string | undefined;
        @Prop() public yAxis: string | undefined;
        @Prop() public xAxisTitle: string | undefined;
        @Prop() public yAxisTitle: string | undefined;
        @Prop() public idName: string | undefined;
        @Prop() public chartName: string | undefined;
        @Prop() public source: string | undefined;
        
        public chart: am4charts.XYChart = new am4charts.XYChart;

        public mounted() {

            if (this.source != "dashboard") am4core.disposeAllCharts();

            let chart = am4core.create(this.idName, am4charts.XYChart);
            if (this.importedData) chart.data = this.importedData;

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = this.xAxis;
            if (this.xAxisTitle) categoryAxis.title.text = this.xAxisTitle;
            categoryAxis.renderer.minGridDistance = 20;
            if (this.source == "dashboard") categoryAxis.renderer.labels.template.fontSize = 14;
            if(this.xAxisTitle == "Assessment" || this.xAxisTitle == "Module") categoryAxis.renderer.labels.template.rotation = 45;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 100;
            if (this.yAxisTitle) valueAxis.title.text = this.yAxisTitle;

            let title = chart.titles.create();
            if (this.chartName) title.text = this.chartName;

            let series = chart.series.push(new am4charts.ColumnSeries());
            series.columns.template.tooltipText = this.xAxisTitle + ": {categoryX}\n" 
                + this.yAxisTitle + ": {valueY}";
            series.columns.template.fill = am4core.color("#104547");
            series.dataFields.valueY = this.yAxis;
            series.dataFields.categoryX = this.xAxis;

            this.chart = chart;
        }
  
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    } 
</script>