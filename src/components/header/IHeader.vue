<template>
  <header class="header-nav position-relative">
    <div class="container">
      <nav class="navbar navbar-expand-xl navbar-light px-0">
        <a class="navbar-brand p-0" href="#">
          <img class="img-fluid logo-ad" src="@/assets/logo.png">
        </a>

        <button class="navbar-toggler bg-white rounded-0 p-0" type="button" data-toggle="collapse"
                data-target="#navlinks"
                aria-controls="navlinks" aria-expanded="false" aria-label="Toggle navigation">
          <svg class="nav-toggle-icon" viewBox="0 0 100 100" width="40">
            <path class="line top"
                  d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"/>
            <path class="line middle" d="m 70,50 h -40"/>
            <path class="line bottom"
                  d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"/>
          </svg>
        </button>
        <!-- mobile-nav control button -->
        <div class="collapse navbar-collapse" id="navlinks1">

        </div>

        <div class="navbar-button mr-4">
          <div class="border p-1 pl-4 pr-4" data-toggle="modal" data-target="#netWorkModal"
               style="cursor: pointer; border-radius: 50px;" @click="switchNetWork">
            <div class="ml-1">
            <span>
                  <img :src="chainsMap[chain?.id].img" alt="" style="width: 20px; height: 20px; margin-right: 5px;">
                </span>
              <span class="fw-medium fs-12 ml-1">{{ chainsMap[chain?.id].name }}</span>
            </div>
          </div>
        </div>

        <div class="navbar-button" v-if="!address">
          <button class="btn btn-sm btn-outline-primary wallet-btn" data-toggle="modal" @click="connectWallet"
                  style="padding-top: 0.35rem; padding-bottom: 0.35rem; border-color: #dee2e6 !important;"
                  data-target="#signup-modal">{{ $t('lianjieqianbao') }} {{
              isConnecting && pendingConnector && connectors[0].id === pendingConnector?.id ? ` (${$t('connecting')}...)``` : ''
            }}
          </button>
        </div>
        <div class="d-flex flex-row justify-content-center" v-if="address">
          <div class="border p-1 pl-4 pr-4" data-toggle="modal" data-target="#exampleModal"
               style="cursor: pointer; border-radius: 50px;">
            <div class="ml-1">
            <span>
                  <img style="border-radius: 100%; width: 25px;" src="@/assets/images/avatar/default.webp" alt="">
                </span>
              <span class="fw-medium fs-12 ml-1">{{ simpleAddress }}</span>
            </div>
          </div>
        </div>

        <div class="ml-4">
          <select class="border-0 language-ui" @change="handleCommandLanguage">
            <option v-for="(k, v) in localeDic" :value="v" :key="k" :selected="v === locale">
              {{ k }}
            </option>
          </select>
        </div>
      </nav>
    </div>

  </header>
</template>

<script>
import {useAccount, useConnect, useNetwork} from 'vagmi';
import {chainsMap} from "@/utils/model";


export default {
  name: "IHeader",
  data() {
    return {
      connect: undefined,
      connectors: [],
      isConnecting: false,
      pendingConnector: undefined,
      activeConnector: undefined,
      address: undefined,
      menus: [
        {
          label: 'Home'
        },
      ],
      chain: undefined,
      chains: [],
      chainsMap: chainsMap,
      locale: window.localStorage.getItem('locale') || 'en',
      localeDic: {
        'zh': 'Cn',
        'en': 'En'
      }
    }
  },
  watch: {
    activeConnector(val) {
      console.log('val = ', val)
    }
  },
  created() {
    const {
      connect,
      connectors,
      isConnecting,
      pendingConnector,
      activeConnector
    } = useConnect();
    this.connect = connect
    this.connectors = connectors
    this.isConnecting = isConnecting
    this.pendingConnector = pendingConnector
    this.activeConnector = activeConnector

    const {address} = useAccount();
    this.address = address

    const {chain, chains} = useNetwork();
    this.chain = chain
    console.log(this.chain)
    this.chains = chains
    console.log('this.chains',this.chains)
  },
  methods: {
    connectWallet() {
      if (this.isConnecting && this.pendingConnector && this.connectors[0].id === this.pendingConnector?.id) {
        return
      }
      this.connect({
        chainId: 3141,
        connector: this.connectors[0]
      })
    },
    handleCommandLanguage(language) {
      let val = language.target.value
      this.locale = val
      this.$i18n.locale = val
      window.localStorage.setItem('locale', val)
    }
  },
  computed: {
    simpleAddress() {
      if (!this.address) {
        return ''
      }
      return this.address.toString().substring(0, 6) + '...' + this.address.toString().substring(this.address.length - 4)
    }
  }
}
</script>

<style scoped>

</style>
