<template>
  <div class="container">
    <router-view/>
    <customFooter></customFooter>
  </div>
</template>

<script>
import CustomFooter from '@/components/CustomFooter.vue'
export default {
  components: {
    CustomFooter
  }
}
</script>

<style lang="scss" scoped>

</style>
