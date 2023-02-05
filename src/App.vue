<template>
  <div class="position-relative">
    <img alt="" src="@/assets/images/bg/bg.png" width="100%" height="100%" class="position-absolute" loading="lazy"
         style="z-index: -1;">
    <div class="preloader position-fixed d-flex align-items-center justify-content-center">
      <div class="block">
        <div class="loader-image mb-20">
          <img src="@/assets/images/logo/logo-light.png" alt="" style="width: 50px;height: 50px;">
        </div>
        <h2 class="loader-text text-uppercase">
          <span class="h3 font-weight-light mb-1">Welcome to</span>
          <span class="font-weight-bold">STFIL Vote</span>
        </h2>
      </div>
    </div>
    <i-header/>
    <router-view/>
    <i-footer></i-footer>
    <!-- Modal -->
    <div class="modal fade" ref="exampleModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-2">
          <div class="modal-header" style="border-bottom: none;">
            <h5 class="modal-title" id="exampleModalLabel">Account</h5>
            <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert" style="background-color: rgb(242, 244, 246)">
              <div class="row align-items-center justify-content-between">
                <div class="col-6 fs-7 text-black-800">Connected with MetaMask</div>
                <div class="col-6 text-right">
                  <button type="button" class="btn btn-outline-primary" style="padding: 5px 15px;"
                          @click="disconnectFun">
                    Disconnect
                  </button>
                </div>
              </div>
              <div>
                <div class="mt-4"
                     data-toggle="modal" data-target="#exampleModal"
                     style="cursor: pointer; border-radius: 50px;">
                  <div class="ml-1">
            <span>
                  <img style="border-radius: 100%; width: 28px;" src="@/assets/images/avatar/default.webp" alt="">
                </span>
                    <span class="ml-2 fs-12" style="margin-top: 10px">{{ simpleAddress }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" ref="netWorkModal" id="netWorkModal" tabindex="-1" aria-labelledby="netWorkModal"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-2">
          <div class="modal-header" style="border-bottom: none;">
            <h5 class="modal-title">选择网络</h5>
            <button id="closeNetWorkModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert" style="background-color: rgb(242, 244, 246)">
              <div>
                <div v-for="(chainId,index) in Object.keys(chainsMap)" :key="index" style="cursor: pointer" @click="switchNet(chainId)" class="netWorkRow">
                  <template v-if="chainId !== 'undefined'">
                    <img :src="chainsMap[chainId].img" alt="" style="width: 20px; height: 20px; margin-right: 5px;">
                    <span>{{ chainsMap[chainId].name }}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IHeader from '@/components/header/IHeader'
import IFooter from '@/components/footer/IFooter'
import {useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "vagmi";
import {chainsMap} from "@/utils/model";

export default {
  name: 'App',
  components: {
    IHeader,
    IFooter
  },
  data() {
    return {
      address: undefined,
      disconnect: undefined,
      chains: [],
      chainsMap: chainsMap,
      useSwitchNetwork: undefined
    }
  },
  created() {
    const {address} = useAccount();
    this.address = address
    const {disconnect} = useDisconnect();
    this.disconnect = disconnect

    const {chains} = useNetwork();
    this.chains = chains
    console.log(this.chains)

    this.useSwitchNetwork = useSwitchNetwork;
    let net = useSwitchNetwork ({
      chainId: 1,
      onError: (e) => {
        console.log('onError', e)
      },
      onSuccess: (e) => {
        console.log('onSuccess', e)
      }
    });
    console.log(net)
  },
  methods: {
    disconnectFun() {
      document.getElementById("closeModal").click()
      this.disconnect()
    },
    switchNet(chainId){
      console.log(chainId)
    }
  },
  computed: {
    simpleAddress() {
      if (!this.address) {
        return ''
      }
      return this.address.toString().substring(0, 10) + '...' + this.address.toString().substring(this.address.length - 10)
    },
  }
}
</script>
<style lang="scss">

</style>
