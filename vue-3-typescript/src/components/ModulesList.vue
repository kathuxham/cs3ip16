<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search by title"
            v-model="title"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Modules List</h4>
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(module, index) in modules"
            :key="index"
            @click="setActiveModule(module, index)"
          >
            {{ module.moduleCode }}
          </li>
        </ul>
  
        <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllModules">
          Remove All
        </button> -->
      </div>
      <div class="col-md-6">
        <div v-if="currentModule.moduleId">
          <h4>module</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentModule.moduleCode }}
          </div>
          <div>
            <label><strong>Description:</strong></label>
            {{ currentModule.moduleTitle }}
          </div>
  
          <a
            class="badge badge-warning"
            :href="'/modules/' + currentModule.moduleId"
          >
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue } from "vue-class-component";
  import ModuleDataService from "@/services/ModuleDataService";
  import type Module from "@/types/Module";
  
  export default class ModulesList extends Vue {
    public modules: Module[] = [];
    public currentModule = {} as Module;
    public currentIndex: number = -1;
    public title: string = "";
    public currentModuleComments: string[] = [];
  
    retrieveModules() {
        ModuleDataService.getAll()
        .then((response) => {
          this.modules = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    refreshList() {
      this.retrieveModules();
      this.currentModule = {} as Module;
      this.currentIndex = -1;
    }
  
    setActiveModule(module: Module, index: number) {
      this.currentModule = module;
      this.currentIndex = index;
    }
  
    // removeAllModules() {
    //     ModuleDataService.deleteAll()
    //     .then((response) => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
  
    searchTitle() {
        ModuleDataService.findByTitle(this.title)
        .then((response) => {
          this.modules = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    mounted() {
      this.retrieveModules();
    }
  }
  </script>
  
  <style scoped>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>