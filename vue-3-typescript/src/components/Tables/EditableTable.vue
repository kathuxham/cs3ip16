<template>
    <table id="tableComponent" class="table table-bordered">
        <thead>
            <tr>
                <th  v-for="column in columns" :key='column' > 
                    {{ $t("assessmentmarks." + column ) }}
                </th>
                <th>
                    
                </th>
            </tr>
        </thead>
        <tbody class="data-row">
            <tr v-for="item in fields" :key='item'>
                <td v-for="column in columns" :key='column'>
                    <div v-if="!updatingMarks">{{item[column]}}</div>
                    <div v-if="column != 'assessmentMark' && column != 'assessmentGrade' && updatingMarks">{{item[column]}}</div>
                    <div v-if="item['assessment']">{{item['assessment'][column]}}</div>
                    <div v-if="(column == 'assessmentMark' || column == 'assessmentGrade') && updatingMarks">
                        <div v-if="currentMark == item">
                            <div v-if="column == 'assessmentMark'">
                                <span><b>Old:</b> {{item[column]}}</span>
                                <input style="width: 130px" id="markInput" v-model="newMark" placeholder="Enter new mark"/>
                            </div>
                            <div v-if="column == 'assessmentGrade'">
                                <span><b>Old:</b> {{item[column]}}</span>
                                <input style="width: 130px" id="gradeInput" v-model="newGrade" placeholder="Enter new grade"/>
                            </div>
                        </div>
                        <div v-else>
                            {{item[column]}}
                        </div>
                    </div>
                    
                </td>
                <td>
                    <div v-if="!updatingMarks" @click="setEditing(item)">
                        <mdicon :size="24" class="clickable-icon" name="pencil"></mdicon>
                    </div>
                    <div v-if="updatingMarks  && currentMark == item">
                        <div v-if="validate(newMark, newGrade)" @click="updateMark()">
                            <mdicon :size="24" class="clickable-icon" name="content-save"></mdicon>
                        </div>
                        <div v-else @click="updatingMarks = false">
                                <mdicon :size="24" class="clickable-icon" name="close"></mdicon>
                        </div>
                    </div>
                </td>
            </tr>
                

            
        </tbody>
    </table>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import AssessmentMarksDataService from "@/services/AssessmentMarksDataService";
import AssessmentMark from "@/types/AssessmentMark";

export default class EditableTable extends Vue {
    @Prop() public columns: string[] | undefined; 
    @Prop() public fields: [] | undefined;
    @Prop() public joinedColumns: string[] | undefined; 
    @Prop() public joinedFields: [] | undefined;

    public updatingMarks: boolean = false;
    public currentMark = {} as any;
    public newMark: string = "";
    public newGrade: string = "";


    public created() {
    }

    setEditing(field: any[]) {
        this.updatingMarks = true;
        this.currentMark = field;
    }

    updateMark() {
        this.currentMark.assessmentMark = this.newMark;
        this.currentMark.assessmentGrade = this.newGrade;
        this.updatingMarks = false;
        this.newMark = "";
        this.newGrade = "";
        AssessmentMarksDataService.update(this.currentMark.id, this.currentMark)
            .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    }

    validate(mark: string, grade: string) {
        const availableGrades = ["A", "B", "C", "D", "E", "F"];
        if (mark != '' && grade != ''){
            if (isNaN(parseInt(mark))) {
                return false;
            }
            if (!availableGrades.includes(grade)){
                return false;
            }
            return true;
        }
        return false;
    }

}
</script>

<style scoped>

.data-row tr:hover {
    background-color: #ebebeb;

}

.data-row a {
  color: black;
}

.data-row a:hover {
  color: black;
  text-decoration: none;
}

.clickable-icon {
    cursor: pointer;
}

</style>