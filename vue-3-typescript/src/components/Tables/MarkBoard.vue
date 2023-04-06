<template>
    <table id="tableComponent" class="table table-bordered">
        <thead>
            <tr>
                <th>{{ $t("assessmentmarks.assessmentCode") }}</th>
                <th>{{ $t("assessmentmarks.assessmentDetail") }}</th>
                <th>{{ $t("assessmentmarks.averageMarkFrom") + (currentYear - 2)}}</th>
                <th>{{ $t("assessmentmarks.averageMarkFrom") + (currentYear - 1)}}</th>
                <th>{{ $t("assessmentmarks.averageMarkFrom") + currentYear}}</th>
                <th>{{ $t("assessmentmarks.averageMarkOverall") }}</th>
            </tr>
        </thead>
        <tbody v-if="assessments && assessmentMarks && assessmentMarksThisYear && assessmentMarksPreviousYear && assessmentMarksPreviousPreviousYear" class="data-row">
            <tr v-for="(mark, index) in assessments">
                <td>
                    <div>{{assessments[index].assessmentCode}}</div>
                </td>
                <td>
                    <div>{{assessments[index].assessmentDetail}}</div>
                </td>
                <td>
                    <div>{{assessmentMarksPreviousPreviousYear[index]}}</div>
                </td>
                <td>
                    <div>{{assessmentMarksPreviousYear[index]}}</div>
                </td>
                <td>
                    <div>{{assessmentMarksThisYear[index]}}</div>
                </td>
                <td>
                    <div><b>{{assessmentMarks[index]}}</b></div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import Assessment from "@/types/Assessment";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class MarkBoard extends Vue {
    @Prop() public assessments: Assessment[] | undefined;
    @Prop() public assessmentMarks: string[] | undefined;
    @Prop() public assessmentMarksThisYear: string[] | undefined;
    @Prop() public assessmentMarksPreviousYear: string[] | undefined;
    @Prop() public assessmentMarksPreviousPreviousYear: string[] | undefined;

    public currentYear: number = 0;

    public created() {
        this.currentYear = new Date().getFullYear();
    }
}
</script>

<style scoped>

.value {
    display: flex;
    flex-wrap: wrap;
}

</style>