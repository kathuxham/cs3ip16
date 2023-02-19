<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RouterLink } from 'vue-router';
import './SideBar.scss';
import '@mdi/js';

export default class SideBar extends Vue {

  public individualsIsOpen: boolean = true;
  public coursesIsOpen: boolean = true;

  public toggleAccordion(accordion: string) {
      if (accordion == "ind") {
        this.individualsIsOpen = !this.individualsIsOpen;
      } else if (accordion == "course") {
        this.coursesIsOpen = !this.coursesIsOpen;
      }
  };


}
</script>

<template>
  <div class="sidebar">
    <button class="accordion" @click="toggleAccordion('ind')">
      <div class="grid">
        <span><mdicon :size="36" class="icon" name="accountGroup"></mdicon></span>
        <span class="text-centered">{{ $t("individuals.individuals") }}</span>
        <mdicon v-if="!individualsIsOpen" class="icon chevron" name="chevronDown"></mdicon>
        <mdicon v-if="individualsIsOpen" class="icon chevron" name="chevronUp"></mdicon>
      </div>
    </button>
    <div v-if="individualsIsOpen" class="panel">
      <RouterLink to="/staffMembers">
          <span><mdicon :size="36" class="icon" name="account"></mdicon></span>
          <span>{{ $t("staffMembers.staffMembers") }}</span>
        </RouterLink>
        <RouterLink to="/students">
          <span><mdicon :size="36" class="icon" name="accountSchool"></mdicon></span>
          <span>{{ $t("students.students") }}</span>
        </RouterLink>
    </div>

    <button class="accordion" @click="toggleAccordion('course')">
      <div class="grid">
        <span><mdicon :size="36" class="icon" name="notebookMultiple"></mdicon></span>
        <span class="text-centered">{{ $t("menu.courses") }}</span>
        <mdicon v-if="!coursesIsOpen" class="icon chevron" name="chevronDown"></mdicon>
        <mdicon v-if="coursesIsOpen" class="icon chevron" name="chevronUp"></mdicon>

    </div>
    </button>
    <div v-if="coursesIsOpen" class="panel">
        <RouterLink to="/modules">
          <span><mdicon :size="36" class="icon" name="bookMultipleOutline"></mdicon></span>
          <span>{{ $t("modules.modules") }}</span>
        </RouterLink>
        <RouterLink to="/assessments">
          <span><mdicon :size="36" class="icon" name="fileDocumentOutline"></mdicon></span>
          <span>{{ $t("assessments.assessments") }}</span>
        </RouterLink>
    </div>
  </div>
</template>