<template>
  <div class="bg-white pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="mb-4">
            <a href="#" class="text-decoration-none">返回</a>
          </div>

          <div class="mb-4">
            <h3 class="fw-extra-bold">{{ detail.title }}</h3>
          </div>
          <div class="mb-2">
            <span class="badge badge-pill"
                  :class="proposalStatusMap[detail.proposalStatus]?.className">{{
                proposalStatusMap[detail.proposalStatus]?.label
              }}</span>
          </div>
          <div class="mb-4 fw-medium">
            {{ detail.body }}
          </div>

          <div class="w-100" style="height: 20px;" v-if="detail.proposalStatus !== 'IMMEDIATELY'"></div>

          <div class="p-30 mt-5 mb-5 " style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)"
               v-if="detail.proposalStatus === 'IMMEDIATELY'">
            <div class="font-weight-bold h4 mb-4">
              投出您的票
            </div>
            <div class="d-flex flex-column">
              <button type="button" class="btn btn-outline-primary mb-4" @click="voteSelect(index)" :key="index"
                      :class="voteSelectIndex === index ? 'select-btn-vote':''"
                      v-for="(choice,index) in detail?.choices">
                {{ choice }}
              </button>
              <button type="button" class="btn btn-primary" @click="connectWallet" v-if="!isConnected">连接钱包</button>
              <button type="button" class="btn btn-primary" @click="voteFun" v-if="isConnected"
                      :disabled="walletSignInfo.isLoading || voteSelectIndex ===-1"
              >
                <span v-if="walletSignInfo.isLoading" class="spinner-border spinner-border-sm mr-2"
                      style="position:relative; bottom: 2px;" role="status" aria-hidden="true"></span>
                <span>投票</span>
              </button>
              <input type="button" id="showVoteModeBtn" data-toggle="modal" data-target="#voteModal"
                     style="display: none;width: 0;height: 0;"/>
            </div>
          </div>

          <div class="p-30" style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
            <div class="font-weight-bold h4 mb-4">
              投票数
            </div>
            <template v-if="loading">
              <components-loading/>
            </template>
            <template v-if="!loading">
              <div v-if="voteList.records.length === 0" class="mt-3">
                <div class="d-flex justify-content-center align-items-center text-black-800">
                  暂无投票数据
                </div>
              </div>
              <template v-if="voteList.records.length !== 0">
                <div class="d-flex flex-column" v-for="(vote) in voteList.records" :key="vote.id">
                  <div class="row mb-4">
                    <div class="col-4 col-lg-4 d-flex">
                    <span class="mr-1"><img src="@/assets/images/eth_address.webp" class="rounded-circle shadow"
                                            style="width: 20px;"
                                            alt=""></span>
                      <span class="fw-medium">{{ simpleAddress(vote.voter) }}</span>
                    </div>
                    <div class="col-4 col-lg-4 text-center fw-medium">
                      {{ detail?.choices[vote.choice - 1] }}
                    </div>
                    <div
                        class="col-4 col-lg-4 text-right fw-medium d-flex justify-content-end align-items-center align-content-center">
                      <div class="mr-3">{{ vote.vp }} FDO</div>
                      <svg xmlns="http://www.w3.org/2000/svg" @click="showVoucher({...vote})" width="16" height="16"
                           fill="currentColor" style="cursor: pointer;" class="bi bi-globe" viewBox="0 0 16 16">
                        <path
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                      </svg>
                      <input type="button" style="display: none;width: 0;height: 0;" id="showVoteInfoModeBtn"
                             data-toggle="modal" data-target="#voteInfoModal"/>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="container p-20" style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
            <div class="mb-2 h4 font-weight-bold">信息</div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">状态</div>
              <div class="col-7 text-right">{{ proposalStatusMap[detail?.proposalStatus].label }}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">标识符</div>
              <div class="col-7 text-right cid-class" @click="gotoIpfs(detail.ipfs)">
                {{ simpleCid(detail.ipfs) }}
              </div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">高度</div>
              <div class="col-7 text-right">{{ detail.blockNumber }}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">投票制度</div>
              <div class="col-7 text-right">单选投票</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">创建时间</div>
              <div class="col-7 text-right">{{ new Date(detail.created).toLocaleString() }}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">开始时间</div>
              <div class="col-7 text-right">{{ new Date(detail.start).toLocaleString() }}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">结束日期</div>
              <div class="col-7 text-right">{{ new Date(detail.end).toLocaleString() }}</div>
            </div>
          </div>

          <div class="container p-20 mt-4" style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
            <div class="mb-2 h4 font-weight-bold">当前结果</div>
            <div class="mb-4" v-for="(voteRes, index) in voteResult" :key="index">
              <div class="mb-1 font-weight-bold">{{ voteRes.label }}</div>
              <div class="progress mb-1">
                <div class="progress-bar" role="progressbar" :style="{width: `${parseFloat(voteRes.rate).toFixed(2)}%`}"
                     :aria-valuenow="parseFloat(voteRes.rate).toFixed(2)" aria-valuemin="0"
                     aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  {{ voteRes.vp }} &nbsp; 张投票
                </div>
                <div>
                  {{ parseFloat(voteRes.rate).toFixed(2) }}%
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


    <!-- Modal -->
    <div class="modal fade" ref="voteModal" id="voteModal" tabindex="-1" aria-labelledby="voteModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-2">
          <div class="modal-header" style="border-bottom: none;">
            <div class="fw-bold fs-18 text-center" id="voteModalLabel">投出您的票</div>
            <button id="voteCloseModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center mb-4" v-if="loadingVoteCheckInfo">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-if="!loadingVoteCheckInfo" class="alert" style="background-color: rgb(242, 244, 246)">
              <div class="row align-items-center justify-content-between">
                <div class="col-6 fs-16 text-black-800">选项</div>
                <div class="col-6 text-right">
                  {{ detail.choices[voteCheckInfo.choice - 1] }}
                </div>
              </div>
              <div class="row align-items-center justify-content-between mt-2">
                <div class="col-6 fs-16 text-black-800">高度</div>
                <div class="col-6 text-right">
                  {{ voteCheckInfo.blockNumber }}
                </div>
              </div>
              <div class="row align-items-center justify-content-between mt-2">
                <div class="col-6 fs-16 text-black-800">您的投票权</div>
                <div class="col-6 text-right">
                  {{ voteCheckInfo.vp }}
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between w-100 mt-4">
              <div class="col-6">
                <button type="button" class="btn btn-dark btn-sm w-100" data-dismiss="modal" aria-label="Close">取消
                </button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-primary btn-sm w-100" @click="subVote"
                        :disabled="walletSignInfo.isLoading">
                  <span v-if="walletSignInfo.isLoading" class="spinner-border spinner-border-sm mr-2"
                        style="position:relative; bottom: 2px;" role="status" aria-hidden="true"></span>
                  确认
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" ref="voteInfoModal" id="voteInfoModal" tabindex="-1" aria-labelledby="voteModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-2">
          <div class="modal-header" style="border-bottom: none;">
            <div class="fw-bold fs-18 text-center" id="voteInfoModalLabel">凭证</div>
            <button id="voteInfoCloseModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="alert" style="background-color: rgb(242, 244, 246)">
              <div class="row align-items-center justify-content-between">
                <div class="col-6 fs-16 text-black-800">IPFS</div>
                <div class="col-6 text-right cid-class" @click="gotoIpfs(showVoucherInfo.ipfs)">
                  {{ simpleCid(showVoucherInfo.ipfs) }}
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between w-100 mt-4">
              <div class="col-6">
                <button type="button" class="btn btn-dark btn-sm w-100" data-dismiss="modal" aria-label="Close">取消
                </button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-primary btn-sm w-100"
                        @click="goToSignatorIO(showVoucherInfo.ipfs)"
                        :disabled="walletSignInfo.isLoading">
                  <span v-if="walletSignInfo.isLoading" class="spinner-border spinner-border-sm mr-2"
                        style="position:relative; bottom: 2px;" role="status" aria-hidden="true"></span>
                  在 Signator.io 上验证
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ok-message-bottom" v-if="voteResuleOk">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="c" fill="currentColor"
           class="bi bi-check-circle-fill mr-2" viewBox="0 0 16 16">
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>
      投票成功
    </div>

    <div class="fail-message-bottom" v-if="voteResuleFail">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
           class="bi bi-dash-circle-fill mr-2" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
      </svg>
      {{ voteResuleFailMes }}
    </div>

  </div>
</template>

<script>
import ComponentsLoading from "@/components/Loading";
import {useAccount, useConnect, useSignTypedData} from "vagmi";
import CID from 'cids'
import {proposalStatusMap, voteSignModel} from "@/utils/model";

export default {
  name: "ProposalDetails",
  components: {ComponentsLoading},
  data() {
    return {
      connect: undefined,
      connectors: [],
      isConnecting: false,
      pendingConnector: undefined,
      activeConnector: undefined,
      isConnected: false,
      loading: false,
      address: '',
      voteSelectIndex: -1,
      proposalStatusMap: proposalStatusMap,
      voteCheckInfo: {
        proposalId: '',
        proposalIpfs: '',
        choice: '',
        blockNumber: 0,
        vp: '', // 投票权
        voter: '',
        reason: '',
        created: 0
      },
      loadingVoteCheckInfo: false,
      walletSignInfo: {
        data: undefined,
        error: undefined,
        isError: false,
        isLoading: false,
        isSuccess: false,
        signTypedData: undefined
      },
      voteResuleOk: false,
      voteResuleFail: false,
      voteResuleFailMes: '投票失败',
      voteResult: [],
      showVoucherInfo: {}
    }
  },
  created() {
    const {
      connect,
      connectors,
      isConnected,
      isConnecting,
      pendingConnector,
      activeConnector
    } = useConnect();
    this.connect = connect
    this.connectors = connectors
    this.isConnected = isConnected
    this.isConnecting = isConnecting
    this.pendingConnector = pendingConnector
    this.activeConnector = activeConnector

    const {address} = useAccount();
    this.address = address

    const {data, error, isError, isLoading, isSuccess, signTypedData} = useSignTypedData(
        {onSuccess: this.onSignOk, onError: this.onSignFail});
    this.walletSignInfo.data = data
    this.walletSignInfo.error = error
    this.walletSignInfo.isError = isError
    this.walletSignInfo.isLoading = isLoading
    this.walletSignInfo.isSuccess = isSuccess
    this.walletSignInfo.signTypedData = signTypedData

    this.init()

  },
  methods: {
    async init() {
      this.voteResuleFail = false
      this.voteResuleOk = false
      if (this.detail.id === undefined) {
        await this.initProposal()
      }
      this.initVoteData()
    },
    async initProposal() {
      await this.$store.dispatch('getProposal', {id: this.$route.params.id})
    },
    async initVoteData() {
      this.loading = true
      await this.$store.dispatch('getVoteList', {proposalId: this.detail.id})
      this.loading = false

      this.voteResult = await this.$store.dispatch('getVoteResult', {proposalId: this.detail.id})

    },
    async voteFun() {
      this.loadingVoteCheckInfo = true
      document.getElementById("showVoteModeBtn").click()
      console.log(this.address)
      let res = await this.$store.dispatch('getVoterInfo', {
        address: this.address,
        blockNumber: this.detail.blockNumber
      })
      this.voteCheckInfo.blockNumber = res['blockNumber']
      this.voteCheckInfo.voter = res['address']
      this.voteCheckInfo.choice = this.voteSelectIndex + 1
      this.voteCheckInfo.vp = res['vp']
      this.voteCheckInfo.proposalIpfs = this.detail.ipfs
      this.voteCheckInfo.proposalId = this.detail.id
      this.loadingVoteCheckInfo = false
    },
    voteSelect(index) {
      this.voteSelectIndex = index
    },
    connectWallet() {
      if (this.isConnecting && this.pendingConnector && this.connectors[0].id === this.pendingConnector?.id) {
        return
      }
      this.connect(this.connectors[0])
    },
    simpleCid(cid) {
      if (!cid) {
        return ""
      }
      let cidv1 = new CID(cid).toV1().toString('base32')
      return cidv1.substr(0, 5) + '...' + cidv1.substr(cidv1.length - 5)
    },
    gotoIpfs(cid) {
      if (!cid) {
        return
      }
      let cidv1 = new CID(cid).toV1().toString('base32')
      window.open(`https://ipfs.io/ipfs/${cidv1}`)
    },
    goToSignatorIO(cid) {
      let cidv1 = new CID(cid).toV1().toString('base32')
      window.open(`https://signator.io/view?ipfs=${cidv1}`)
    },
    subVote() {
      if (this.walletSignInfo.isLoading) {
        return
      }
      let signMessageJson = {}
      signMessageJson['voter'] = this.voteCheckInfo.voter
      signMessageJson['choice'] = this.voteCheckInfo.choice
      signMessageJson['vp'] = this.voteCheckInfo.vp
      signMessageJson['proposalId'] = this.voteCheckInfo.proposalId
      this.voteCheckInfo.created = new Date().getTime()
      signMessageJson['created'] = this.voteCheckInfo.created
      signMessageJson['reason'] = this.voteCheckInfo.reason

      console.log(JSON.stringify(signMessageJson))

      this.walletSignInfo.signTypedData({
        domain: voteSignModel.domain,
        types: voteSignModel.types,
        value: signMessageJson
      })

    },
    async onSignOk(val) {
      console.log(val)
      await this.$store.dispatch('addVote', {...this.voteCheckInfo, sign: val})
      this.initVoteData()
      document.getElementById("voteCloseModal").click()
      this.showTip('ok')
    },
    onSignFail(e) {
      document.getElementById("voteCloseModal").click()
      if (e.code && e.msg) {
        this.showTip('fail', e.msg)
      } else {
        this.showTip('fail')
      }
    },
    simpleAddress(address) {
      if (!address) {
        return ''
      }
      return address.toString().substring(0, 6) + '...' + address.toString().substring(address.length - 6)
    },
    showTip(type, msg = '') {
      if (type === 'ok') {
        this.voteResuleFail = false
        this.voteResuleOk = true
        setTimeout(() => {
          this.voteResuleOk = false
        }, 1500)
      }
      if (type === 'fail') {
        if (msg === '') {
          msg = '投票失败'
        }
        this.voteResuleFailMes = msg
        this.voteResuleOk = false
        this.voteResuleFail = true
        setTimeout(() => {
          this.voteResuleFail = false
        }, 1500)
      }
    },
    showVoucher(info) {
      this.showVoucherInfo = info
      document.getElementById("showVoteInfoModeBtn").click()
    }
  },
  computed: {
    detail() {
      return this.$store.state.proposal.detail
    },
    voteList() {
      return this.$store.state.vote.data
    }
  }
}
</script>

<style scoped>

</style>
