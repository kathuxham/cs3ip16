<template>
    <div :id="idName" style="height: 300px;"></div>
</template>
  
<script lang="ts">
    import { Vue } from "vue-class-component";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import { Prop } from "vue-property-decorator";

    am4core.useTheme(am4themes_animated);

    export default class HomeBoard extends Vue {
        @Prop() public importedData: any[] | undefined;
        @Prop() public xAxis: string | undefined;
        @Prop() public yAxis: string | undefined;
        @Prop() public xAxisTitle: string | undefined;
        @Prop() public yAxisTitle: string | undefined;
        @Prop() public idName: string | undefined;
        @Prop() public chartName: string | undefined;
        @Prop() public modules: any[] | undefined;
        
        public chart: am4charts.XYChart = new am4charts.XYChart;

        public mounted() {

            let chart = am4core.create(this.idName, am4charts.XYChart);
            if (this.importedData) chart.data = this.importedData;

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = this.xAxis;
            if (this.xAxisTitle) categoryAxis.title.text = this.xAxisTitle;
            categoryAxis.renderer.minGridDistance = 20;
            categoryAxis.renderer.labels.template.fontSize = 14;
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
            series.columns.template.fill = am4core.color("#104547"); // fill
            series.dataFields.valueY = this.yAxis;
            series.dataFields.categoryX = this.xAxis;
            // series.stacked = true;

            this.chart = chart;
        }
  
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }

        // selectDataset(set: any[]) {
        //     this.chart.data = set;
        // }
} 
</script>