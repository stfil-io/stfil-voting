<template>
  <div>
    <div class="preloader position-fixed d-flex align-items-center justify-content-center">
      <div class="block">
        <div class="loader-image mb-20">
          <img src="@/assets/images/preloader.png" alt="">
        </div>
        <h2 class="loader-text text-uppercase">
          <span class="h3 font-weight-light mb-1">Welcome to</span>
          <span class="font-weight-bold">STFIL ILO</span>
        </h2>
      </div>
    </div>
    <i-header/>
    <router-view/>
    <i-footer></i-footer>
  </div>
</template>
<script>
import IHeader from '@/components/header/IHeader'
import IFooter from '@/components/footer/IFooter'

export default {
  name: 'App',
  components: {
    IHeader,
    IFooter
  },

  methods: {
    connectWallet() {

    }
  }
}
</script>
<style lang="scss">

</style>
