<template>
    <table id="tableComponent" class="table table-bordered">
        <thead>
            <tr>
                <th>{{ $t("assessmentmarks.assessmentCode") }}</th>
                <th>{{ $t("assessmentmarks.assessmentDetail") }}</th>
                <th>{{ $t("assessmentmarks.averageMark") }}</th>
            </tr>
        </thead>
        <tbody class="data-row">
            <tr v-for="(mark, index) in assessments">
                <td>
                    <div>{{assessments[index].assessmentCode}}</div>
                </td>
                <td>
                    <div>{{assessments[index].assessmentDetail}}</div>
                </td>
                <td>
                    <div>{{assessmentMarks[index]}}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import Assessment from "@/types/Assessment";
import AssessmentMark from "@/types/AssessmentMark";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class MarkBoard extends Vue {
    @Prop() public assessments: Assessment[] | undefined;
    @Prop() public assessmentMarks: string[] | undefined;

    public created() {
        // if (this.assessmentMarks) {
        //     for (let assessments of this.assessmentMarks) {
        //         console.log(assessments);
        //         for (let mark of assessments) {
        //             this.marks = this.marks.concat(mark.assessmentMark);
        //         }
        //         var sum = this.marks.reduce((a: number, b: number): number => a + b);
        //         this.averageMarks.push(sum / this.marks.length);
        //     }
        
        // }
    }
}
</script>

<style scoped>

.value {
    display: flex;
    flex-wrap: wrap;
}

</style>