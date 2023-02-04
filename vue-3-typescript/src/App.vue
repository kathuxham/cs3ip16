<template>
  <div id="app">
    <div class="nav-bar">
        <NavBar />
    </div>
    <div class="side-bar">
        <SideBar />
    </div>
    <div class="window">  
      <RouterView />
    </div>

    <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">bezKoder</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/modules" class="nav-link">modules</a>
        </li>
        <li class="nav-item">
          <a href="/add" class="nav-link">Add</a>
        </li>
      </div>
    </nav> -->

    <!-- <div class="container mt-3">
      <router-view />
    </div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/NavBar/NavBar.vue';
import SideBar from "./components/SideBar/SideBar.vue";

@Options({
  components: {
    NavBar,
    SideBar
  }
})

export default class App extends Vue {}
</script>


<style scoped>

.nav-bar {
  position: fixed;
  width: 100%;
}
.side-bar {
  display: flex;
  overflow: hidden;
}


.window {
  margin-left: 240px;
  margin-top: 96px;
}

a:hover {
  color: none;
  text-decoration: none;
}

/*
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
