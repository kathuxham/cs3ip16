<template>
        <div v-if="!staff" class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName, currentIndividual.lastName }}</div>
          <div class="data-heading">{{ $t("students.preferredName") }}</div>
          <div>{{ currentIndividual.preferredName }}</div>
          <div class="data-heading">{{ $t("students.pronouns") }}</div>
          <div>{{ currentIndividual.pronouns }}</div>
          <div class="data-heading">{{ $t("students.studentNumber") }}</div>
          <div>{{ currentStudent.studentNumber }}</div>
          <div class="data-heading">{{ $t("students.studentUsername") }}</div>
          <div>{{ currentStudent.studentUsername }}</div>
          <div class="data-heading">{{ $t("students.dateOfBirth") }}</div>
          <div>{{ currentIndividual.dateOfBirth }}</div>
        </div>
        <div v-if="staff" class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName + currentIndividual.lastName }}</div>
          <div class="data-heading">{{ $t("staffMembers.preferredName") }}</div>
          <div>{{ currentIndividual.preferredName }}</div>
          <div class="data-heading">{{ $t("staffMembers.pronouns") }}</div>
          <div>{{ currentIndividual.pronouns }}</div>
          <div class="data-heading">{{ $t("staffMembers.dateOfBirth") }}</div>
          <div>{{ currentIndividual.dateOfBirth }}</div>
        </div>
        <div v-if="!staff" class="container">
          <h2>{{ $t("records.programmeInfo") }}</h2>
          <div class="data-heading">{{ $t("students.programme") }}</div>
          <div>{{ currentStudent.programme }}</div>
          <div class="data-heading">{{ $t("records.academicTutor") }}</div>
          <div>test</div>
        </div>
        <div v-if="staff" class="container">
          <h2>{{ $t("records.staffInfo") }}</h2>
          <div class="data-heading">{{ $t("staffMembers.position") }}</div>
          <div>{{ currentStaffMember.position }}</div>
          <div class="data-heading">{{ $t("staffMembers.staffNumber") }}</div>
          <div>{{ currentStaffMember.staffNumber }}</div>
        </div>
</template>

<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import type Individual from "@/types/Individual";
    import StaffMember from "@/types/StaffMember";
    import Student from "@/types/Student";
    import LoadingScreen from "../LoadingScreen/LoadingScreen.vue";
    import { Prop } from "vue-property-decorator";

    @Options({
    components: {
        LoadingScreen,
    }})

    export default class CommunicationWindow extends Vue {
        @Prop() public currentStaffMember = {} as StaffMember;
        @Prop() public currentStudent = {} as Student;
        @Prop() public currentIndividual = {} as Individual;
        @Prop() public entity = "";
        public staff: boolean = false;

        mounted() {
            this.staff = this.$route.name == "staff-details" ? true : false;
        }

    }
  </script>