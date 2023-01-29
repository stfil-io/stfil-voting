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
            <span class="badge badge-pill badge-primary">活跃</span>
          </div>
          <div class="mb-4 fw-medium">
            {{ detail.body }}
          </div>

          <div class="p-30 mt-5 mb-5 " style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
            <div class="font-weight-bold h4 mb-4">
              投出您的票
            </div>
            <div class="d-flex flex-column">
              <button type="button" class="btn btn-outline-primary mb-4" @click="voteSelect(index)" :key="index"
                      :class="voteSelectIndex === index ? 'select-btn-vote':''"
                      v-for="(choice,index) in detail.choices">
                {{ choice }}
              </button>
              <button type="button" class="btn btn-primary" @click="connectWallet" v-if="!isConnected">连接钱包</button>
              <button type="button" class="btn btn-primary" @click="voteFun" v-if="isConnected"
                    >投票</button>
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
                      <span class="fw-medium">{{vote.voter}}</span>
                    </div>
                    <div class="col-4 col-lg-4 text-center fw-medium">{{vote.choice.map(ch => detail.choices[ch]).join(',')}}</div>
                    <div class="col-4 col-lg-4 text-right fw-medium">{{vote.vp}} FDO</div>
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
              <div class="col-7 text-right">{{ proposalStatusMap[detail.proposalStatus] }}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">标识符</div>
              <div class="col-7 text-right cid-class" @click="gotoIpfs(detail.ipfs)">
                {{ simpleCid(detail.ipfs) }}
              </div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">高度</div>
              <div class="col-7 text-right">{{detail.blockNumber}}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">投票制度</div>
              <div class="col-7 text-right">单选投票</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">创建时间</div>
              <div class="col-7 text-right">{{new Date(detail.created).toLocaleString()}}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">开始时间</div>
              <div class="col-7 text-right">{{new Date(detail.start).toLocaleString()}}</div>
            </div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">结束日期</div>
              <div class="col-7 text-right">{{new Date(detail.end).toLocaleString()}}</div>
            </div>
          </div>

          <div class="container p-20 mt-4" style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
            <div class="mb-2 h4 font-weight-bold">当前结果</div>
            <div class="mb-4">
              <div class="mb-1 font-weight-bold">Yes</div>
              <div class="progress mb-1">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  1,202,300.86 张投票
                </div>
                <div>
                  57.92%
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class="mb-1 font-weight-bold">No</div>
              <div class="progress mb-1">
                <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  1,202,300.86 张投票
                </div>
                <div>
                  57.92%
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


    <!-- Modal -->
    <div class="modal fade" ref="voteModal" id="voteModal" tabindex="-1" aria-labelledby="voteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-2">
          <div class="modal-header" style="border-bottom: none;">
            <div class="fw-bold fs-18 text-center" id="voteModalLabel">投出您的票</div>
            <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert" style="background-color: rgb(242, 244, 246)">
              <div class="row align-items-center justify-content-between">
                <div class="col-6 fs-16 text-black-800">选项</div>
                <div class="col-6 text-right" >
                  {{detail.choices[voteSelectIndex]}}
                </div>
              </div>
              <div class="row align-items-center justify-content-between mt-2">
                <div class="col-6 fs-16 text-black-800">高度</div>
                <div class="col-6 text-right">
                  {{detail.blockNumber}}
                </div>
              </div>
              <div class="row align-items-center justify-content-between mt-2">
                <div class="col-6 fs-16 text-black-800">您的投票权</div>
                <div class="col-6 text-right">

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
import ComponentsLoading from "@/components/Loading";
import {useAccount, useConnect} from "vagmi";
import CID from 'cids'

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
      voteSelectIndex: 0,
      proposalStatusMap: {
        'IMMEDIATELY': 'Activity',
        'CLOSE': 'Close',
        'UPCOMING': 'Upcoming'
      },
      voteCheckInfo: {
        choice: '',
        blockNumber: 0,
        vp: '', // 投票权
        address: '',
        reason: ''
      }
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

    this.init()

  },
  methods: {
    init() {
      this.initVoteData()
    },
    async initVoteData() {
      this.loading = true
      await this.$store.dispatch('getVoteList', {proposalId: this.detail.id})
      this.loading = false
    },
    voteFun() {
      console.log(this.$refs['voteModal'])
    },
    voteSelect(index){
      this.voteSelectIndex = index
    },
    connectWallet() {
      if (this.isConnecting && this.pendingConnector && this.connectors[0].id === this.pendingConnector?.id) {
        return
      }
      this.connect(this.connectors[0])
    },
    simpleCid(cid){
      if (!cid){
        return ""
      }
      let cidv1 = new CID(cid).toV1().toString('base32')
      return cidv1.substr(0,5) + '...' + cidv1.substr(cidv1.length - 5)
    },
    gotoIpfs(cid){
      if (!cid){
        return
      }
      let cidv1 = new CID(cid).toV1().toString('base32')
      window.open(`https://ipfs.io/ipfs/${cidv1}`)
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
