<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello {{ name }}</div>
    <div class="dashboard-text">uid: {{ uid }}</div>
    <div class="dashboard-text">mobile: {{ mobile }}</div>
    <div class="dashboard-text">email: {{ email }}</div>
    <div class="dashboard-text">group: {{ group }}</div>
    <div class="dashboard-text">cid: {{ cid }}</div>
    <!-- <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'uid',
      'name',
      'mobile',
      'email',
      'group',
      'cid',
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
