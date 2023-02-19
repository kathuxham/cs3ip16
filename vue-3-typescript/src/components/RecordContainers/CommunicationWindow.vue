<template>
        <div class="container">
          <h2>{{ $t("address.addresses") }}</h2>
          <div v-if="!staff" class="data-heading">{{ $t("address.termTimeAddress") }}</div>
          <div v-if="!staff">{{ currentIndividual.firstName }}</div>
          <div class="data-heading">{{ $t("address.homeAddress") }}</div>
          <div>{{ currentIndividual.firstName }}</div>
        </div>
        <div class="container">
          <h2>{{ $t("records.email") }}</h2>
          <div class="data-heading">{{ $t("students.personalEmailAddress") }}</div>
          <div>{{ currentIndividual.personalEmailAddress }}</div>
          <div class="data-heading">{{ $t("students.universityEmailAddress") }}</div>
          <div>{{ currentIndividual.universityEmailAddress }}</div>
        </div>
        <div v-if="!staff" class="container">
          <h2>{{ $t("emergencyContact.emergencyContact") }}</h2>
          <div class="data-heading">{{ $t("emergencyContact.fullName") }}</div>
          <div>{{ currentStudent.programme }}</div>
          <div class="data-heading">{{ $t("emergencyContact.relationship") }}</div>
          <div>relationship</div>
          <div class="data-heading">{{ $t("emergencyContact.telephoneNumber") }}</div>
          <div>number</div>
        </div>
</template>

<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import type Individual from "@/types/Individual";
    import StaffMember from "@/types/StaffMember";
    import Student from "@/types/Student";
    import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
    import { Prop } from "vue-property-decorator";

    @Options({
    components: {
        LoadingScreen,
    }})

    export default class CommunicationWindow extends Vue {
        public currentStaffMember: StaffMember | undefined;
        public currentStudent: Student | undefined;
        public currentIndividual: Individual | undefined;
        public staff: boolean = false;

        mounted() {
            this.staff = this.$route.name == "staff-details" ? true : false;
        }

    }
  </script>