<template>
    <div :id="idName" class="pie-chart" style="position: static !important"></div>
</template>
  
<script lang="ts">
    import { Vue } from "vue-class-component";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import { Prop } from "vue-property-decorator/lib/decorators/Prop";

    am4core.useTheme(am4themes_animated);


     export default class PieChart extends Vue {

        @Prop() public importedData: any[] | undefined;
        @Prop() public xAxis: string | undefined;
        @Prop() public yAxis: string | undefined;
        @Prop() public idName: string | undefined;
        @Prop() public chartName: string | undefined;

        public chart: am4charts.PieChart = new am4charts.PieChart;

        public mounted() {

            am4core.disposeAllCharts();

            let chart = am4core.create(this.idName, am4charts.PieChart);
        
            if (this.importedData) chart.data = this.importedData;
        
            let pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = this.yAxis;
            pieSeries.dataFields.category = this.xAxis;

            let title = chart.titles.create();
            if (this.chartName) title.text = this.chartName;
        
            this.chart = chart;
        }
    
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    } 
</script>

<style scoped>
.pie-chart {
    width: 600px; 
    height: 400px;
    margin-left: auto;
    margin-right: auto;
}
</style>