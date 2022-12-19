<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  data() {
    return {
      individualsIsOpen: true,
      coursesIsOpen: true,
    };
  },
  methods: {
    toggleAccordion(accordion: string) {
      if (accordion == "ind") {
        this.individualsIsOpen = !this.individualsIsOpen;
      } else if (accordion == "course") {
        this.coursesIsOpen = !this.coursesIsOpen;
      }
    },
  },
})



</script>

<template>
  <div class="sidebar">
    <button class="accordion" @click="toggleAccordion('ind')">
      <div class="grid">
        <span><mdicon :size="36" class="icon" name="accountGroup"></mdicon></span>
        <span class="text-centered">Individuals</span>
        <mdicon v-if="!individualsIsOpen" class="icon chevron" name="chevronDown"></mdicon>
        <mdicon v-if="individualsIsOpen" class="icon chevron" name="chevronUp"></mdicon>
      </div>
    </button>
    <div v-if="individualsIsOpen" class="panel">
      <RouterLink to="staff">
          <span><mdicon :size="36" class="icon" name="account"></mdicon></span>
          <span>Staff</span>
        </RouterLink>
        <RouterLink to="students">
          <span><mdicon :size="36" class="icon" name="accountSchool"></mdicon></span>
          <span>Students</span>
        </RouterLink>
    </div>

    <button class="accordion" @click="toggleAccordion('course')">
      <div class="grid">
        <span><mdicon :size="36" class="icon" name="notebookMultiple"></mdicon></span>
        <span class="text-centered">Courses</span>
        <mdicon v-if="!coursesIsOpen" class="icon chevron" name="chevronDown"></mdicon>
        <mdicon v-if="coursesIsOpen" class="icon chevron" name="chevronUp"></mdicon>

    </div>
    </button>
    <div v-if="coursesIsOpen" class="panel">
        <RouterLink to="schools">
          <span><mdicon :size="36" class="icon" name="townHall"></mdicon></span>
          <span>Schools</span>
        </RouterLink>
        <RouterLink to="degrees">
          <span><mdicon :size="36" class="icon" name="school"></mdicon></span>
          <span>Degrees</span>
        </RouterLink>
        <RouterLink to="modules">
          <span><mdicon :size="36" class="icon" name="bookMultipleOutline"></mdicon></span>
          <span>Modules</span>
        </RouterLink>
    </div>
  </div>
</template>

<style scoped>

.sidebar {
    margin: 0;
    padding: 0;;
    width: 220px;
    background-color: #70C59E;
    position: fixed;
    overflow: auto;
    height: 100%;;
}

.accordion {
  background-color: #539475;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  font-size: 24px;
  
  
}

.grid {
  display: flex;
  /* justify-content: space-around; */
}

.active, .accordion:hover {
  background-color: #539475;
}

.mdi::before {
    font-size: 24px;
    line-height: 14px;
}

.panel {
  background-color: #70C59E;
  /* display: none; */
  overflow: hidden;
  font-size: 20px;
}

.active, .sidebar a:hover {
  background-color: #539475;
}
.sidebar a {
    display: block;
    color: white;
    padding: 16px;
    padding-left: 40px;
    text-decoration: none;
}

.icon{
  margin-right: 10px;
}
.chevron{
  margin-right: 0;
}

.text-centered{
  margin-top: auto;
  margin-bottom: auto;
}
</style>
