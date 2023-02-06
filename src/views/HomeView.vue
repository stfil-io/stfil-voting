<template>
  <div>
    <section v-if="!detail.show"
             class="banner bg-cover-bottom has-shapes has-bg-brash bg-brash-bottom aos-init aos-animate"
             data-aos="fade-in" data-aos-delay="150">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-8 col-md-9 text-left">
            <h1 class="section-title fw-extra-bold fs-50">{{$t('toupiao')}}</h1>
            <h2 class="section-title fw-extra-bold">{{$t('title')}}</h2>
          </div>
          <div class="col-lg-4">
            <img src="@/assets/images/voting-presents.png" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="banner bg-cover-bottom has-shapes bg-white"
             data-aos="fade-in" data-aos-delay="150">
      <div class="container" v-if="!detail.show">
        <div class="mb-4">
          <h2 class="fw-bold">{{$t('proposal')}}</h2>
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
                          <span class="badge badge-pill" :class="proposalStatusMap[proposal.proposalStatus].className">{{proposalStatusMap[proposal.proposalStatus].label}}</span></div>
                      </div>
                      <div class="row mb-2">
                        <h4 class="col-12 font-weight-bold">{{ proposal.title }}</h4>
                      </div>
                      <div class="row m-0 mb-2">
                        <p>
                          {{ proposal.body }}
                        </p>
                      </div>
<!--                      <div class="row m-0 mb-4">-->
<!--                        还剩2天-->
<!--                      </div>-->
                      <div class="mt-4">
                        <button type="button" class="btn btn-primary btn-sm">{{$t('chakanxiangqing')}}</button>
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
import {proposalStatusMap} from "@/utils/model";

// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {Loading, Empty},
  data() {
    return {
      loading: false,
      proposalStatusMap: proposalStatusMap,
      type: [{
        label: this.$t('hexin'),
        value: 'core'
      }, {
        label: this.$t('shequ'),
        value: 'community'
      },
        {
          label: this.$t('suoyou'),
          value: 'all'
        }],
      state: [{
        label: this.$t('lijietoupiao'),
        value: 'immediately'
      }, {
        label: this.$t('jijiangkaishi'),
        value: 'upcoming'
      }, {
        label: this.$t('yiguanbi'),
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
  watch: {
    '$i18n.locale'() {
      this.type = [{
        label: this.$t('hexin'),
        value: 'core'
      }, {
        label: this.$t('shequ'),
        value: 'community'
      },
        {
          label: this.$t('suoyou'),
          value: 'all'
        }]

      this.state = [{
        label: this.$t('lijietoupiao'),
        value: 'immediately'
      }, {
        label: this.$t('jijiangkaishi'),
        value: 'upcoming'
      }, {
        label: this.$t('yiguanbi'),
        value: 'close'
      }]
    },
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
      this.$router.push({path: '/proposal/' + proposal.id})
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
