<template>
    <div :id="idName" style="height: 80px; position: static !important"></div>
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
        @Prop() public complete: number | undefined;
        @Prop() public idName: string | undefined;

        public chart: am4charts.PieChart = new am4charts.PieChart;

        public mounted() {

            let chart = am4core.create(this.idName, am4charts.XYChart);

            if (this.importedData) chart.data = this.importedData;

            if (this.complete && this.complete != 100) {
                chart.data.push({
                    "category": "",
                    "assessment": "Incomplete",
                    "from": this.complete,
                    "to": 100,
                    "weighting": 100 - this.complete,
                    "fill": am4core.color("#9e9e9e"),
                })
            }

            // Create axes
            let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            yAxis.dataFields.category = "category";
            yAxis.renderer.grid.template.disabled = true;
            yAxis.renderer.labels.template.disabled = true;

            let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
            xAxis.renderer.grid.template.disabled = true;
            xAxis.renderer.grid.template.disabled = true;
            xAxis.renderer.labels.template.disabled = true;
            xAxis.min = 0;
            xAxis.max = 100;

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "to";
            series.dataFields.openValueX = "from";
            series.dataFields.categoryY = "category";
            series.columns.template.propertyFields.fill = "fill";
            series.columns.template.strokeOpacity = 0;
            series.columns.template.height = am4core.percent(100);

            // Ranges/labels
            chart.events.on("beforedatavalidated", function(ev) {
            let data = chart.data;
            for(var i = 0; i < data.length; i++) {
                let range = xAxis.axisRanges.create();
                range.value = data[i].to;
                if (data[i].weighting > 5) range.label.text = data[i].to.toFixed(0) + "%";
                range.label.horizontalCenter = "right";
                range.label.paddingLeft = 5;
                range.label.paddingTop = 5;
                range.label.fontSize = 10;
                range.grid.strokeOpacity = 0.2;
                range.tick.length = 18;
                range.tick.strokeOpacity = 0.2;
            }
            });

            // // Legend
            // let legend = new am4charts.Legend();
            // legend.parent = chart.chartContainer;
            // legend.itemContainers.template.clickable = false;
            // legend.itemContainers.template.focusable = false;
            // legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
            // legend.align = "right";
            // legend.data = chart.data;
        }
    
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    } 
</script>