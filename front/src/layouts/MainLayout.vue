<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="active">
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <router-link class="title" to="/">Consulta de Produtos</router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <DrawerPersonal />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated align="right" class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-caption">
          Developed By: Developers
          <small>v.beta: 1.0</small>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import DrawerPersonal from "../components/DrawerPersonal";
export default {
  components: { DrawerPersonal },
  data() {
    return {
      left: false
    };
  }
};
</script>

<style scoped>
.title {
  text-decoration: none;
  color: white;
}
</style>