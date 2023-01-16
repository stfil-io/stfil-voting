<template>
  <div>
    <section v-if="!detail.show"
             class="banner bg-cover-bottom has-shapes has-bg-brash bg-brash-bottom aos-init aos-animate"
             data-aos="fade-in" data-aos-delay="150">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-8 col-md-9 text-left">
            <h1 class="section-title fw-extra-bold fs-50">投票</h1>
            <h2 class="section-title fw-extra-bold">对 STFIL 的未来发表看法</h2>
          </div>
          <div class="col-lg-4">
            <img src="@/assets/images/voting-presents.png" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="banner bg-cover-bottom has-shapes bg-white"
             data-aos="fade-in" data-aos-delay="150">
      <div class="container" v-if="detail.show">

        <div class="row">
          <div class="col-lg-8">
            <div class="mb-4">
              <a href="#" class="text-decoration-none" @click="detail.show = false">返回</a>
            </div>

            <div class="mb-4">
              <h3 class="font-weight-bold">A.P.D -- POP Request</h3>
            </div>
            <div class="mb-2">
              <span class="badge badge-pill badge-primary">活跃</span>
            </div>
            <div class="mb-4">
              Issue Statement:
              Popcorn has recently passed a proposal to migrate liquidity from Ethereum and Polygon to Optimism, and
              would like to use Stargate to bridge our token.
              Popcorn is a multichain DeFi wealth manager offering exposure to liquid asset strategies that not only
              earn competitive yield on your crypto, but simultaneously funds nonprofits and social impact organizations
              at no additional cost to the user.
            </div>

            <div class="card p-30 mt-5 mb-5">
              <div class="font-weight-bold h4 mb-4">
                投出您的票
              </div>
              <div class="d-flex flex-column">
                <button type="button" class="btn btn-outline-primary mb-4">Yes</button>
                <button type="button" class="btn btn-outline-primary mb-4">No</button>
                <button type="button" class="btn btn-outline-primary mb-4">Abstain</button>
                <button type="button" class="btn btn-primary">投票</button>
              </div>
            </div>

            <div class="card p-30">
              <div class="font-weight-bold h4 mb-4">
                投票数
              </div>
              <div class="d-flex flex-column" v-for="(index) in 10" :key="index">
                <div class="row mb-4">
                  <div class="col-4 col-lg-4 d-flex">
                    <span class="mr-1"><img src="@/assets/images/eth_address.webp" class="rounded-circle shadow"
                                            style="width: 20px;"
                                            alt=""></span>
                    <span class="">0x63e1...90E0</span>
                  </div>
                  <div class="col-4 col-lg-4 text-center">Yes</div>
                  <div class="col-4 col-lg-4 text-right">172K veSTG</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="container card p-20">
              <div class="mb-2 h4 font-weight-bold">信息</div>
              <div class="row mb-1">
                <div class="col-5 text-black-600 font-weight-bold">标识符</div>
                <div class="col-7 text-right">0xb8a366</div>
              </div>
              <div class="row mb-1">
                <div class="col-5 text-black-600 font-weight-bold">投票制度</div>
                <div class="col-7 text-right">单选投票</div>
              </div>
              <div class="row mb-1">
                <div class="col-5 text-black-600 font-weight-bold">开始时间</div>
                <div class="col-7 text-right">Nov 28, 2022, 6:10 AM</div>
              </div>
              <div class="row mb-1">
                <div class="col-5 text-black-600 font-weight-bold">结束日期</div>
                <div class="col-7 text-right">Dec 1, 2022, 6:10 AM</div>
              </div>
            </div>

            <div class="container card p-20 mt-4">
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
      <div class="container" v-if="!detail.show">
        <div class="mb-4">
          <h2 class="fw-bold">提案</h2>
        </div>
        <div>
          <div class="tabs-navbar">
            <ul class="nav nav-tabs mb-3" id="pills-tab-top" role="tablist">
              <li class="nav-item mr-2 fw-medium" role="presentation" v-for="t in type" :key="t.value"
                  @click="checkType(t.value)">
                <a class="nav-link cursor-pointer" :class="t.value === check.type ? 'active': ''"
                   role="tab"
                   aria-controls="pills-home">{{ t.label }}</a>
              </li>
            </ul>
          </div>
          <ul class="nav nav-pills mb-3 mt-4" id="pills-tab" role="tablist">
            <li class="nav-item mr-2" role="presentation" v-for="s in state" :key="s.value"
                @click="checkState(s.value)">
              <a class="nav-link cursor-pointer" :class="s.value === check.status ? 'active': ''" role="tab"
                 aria-controls="pills-home">{{ s.label }}</a>
            </li>
          </ul>
          <div class="tab-content colored-icon-box" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel">
              <loading v-if="loading"/>
              <template v-if="!loading">
                <empty v-if="!proposalData.records || proposalData.records.length === 0"/>
                <div class="mb-4" data-aos="fade-up" @click="showDetail(proposal)" data-aos-delay="50" :key="index"
                     v-for="(proposal,index) in proposalData.records">
                  <div class="bg-white rounded p-20 icon-box" style="cursor: pointer;box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
                    <div class="card-body">
                      <div class="row justify-content-between align-items-center mb-2">
                        <div class="col-10 row m-0 align-items-center align-content-center">
                          <div class="mr-1">
                            <img src="@/assets/images/eth_address.webp" class="rounded-circle shadow"
                                 style="width: 20px;"
                                 alt="">
                          </div>
                          <span class="pt-1">{{ proposal.author }}</span>
                        </div>
                        <div class="col-2 text-right">
                          <span class="badge badge-pill badge-primary">活跃</span></div>
                      </div>
                      <div class="row mb-2">
                        <h4 class="col-12 font-weight-bold">{{ proposal.title }}</h4>
                      </div>
                      <div class="row m-0 mb-2">
                        <p>
                          {{ proposal.body }}
                        </p>
                      </div>
                      <div class="row m-0 mb-4">
                        还剩2天
                      </div>
                      <div>
                        <button type="button" class="btn btn-primary btn-sm">立即投票</button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'

// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {Loading, Empty},
  data() {
    return {
      loading: false,
      type: [{
        label: '核心',
        value: 'core'
      }, {
        label: '社区',
        value: 'community'
      },
        {
          label: '所有',
          value: 'all'
        }],
      state: [{
        label: '立即投票',
        value: 'immediately'
      }, {
        label: '即将开始',
        value: 'upcoming'
      }, {
        label: '已关闭',
        value: 'close'
      }],
      check: {
        type: 'core',
        status: 'immediately',
        proposal: {}
      },
      detail: {
        show: false,
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.initProposal()
    },
    async initProposal() {
      this.loading = true
      await this.$store.dispatch('getProposalList', {type: this.check.type === 'all' ? '' : this.check.type, status: this.check.status});
      this.loading = false
    },
    showDetail(proposal) {
      this.$store.commit('setProposalDetail', proposal)
      this.$router.push({path: '/details'})
    },
    checkType(val) {
      this.check.type = val
      this.initProposal()
    },
    checkState(val) {
      this.check.status = val
      this.initProposal()
    },
  },
  computed: {
    proposalData() {
      return this.$store.state.proposal.data
    }
  }
}
</script>
