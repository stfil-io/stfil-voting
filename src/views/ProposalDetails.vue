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
              <button type="button" class="btn btn-outline-primary mb-4" :key="index"
                      v-for="(choice,index) in detail.choices">
                {{ choice }}
              </button>
              <button type="button" class="btn btn-primary">投票</button>
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
          </div>
        </div>
        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="container p-20" style="border-radius: 10px; box-shadow: 0px 4px 24px 0px rgb(16 27 82 / 8%)">
            <div class="mb-2 h4 font-weight-bold">信息</div>
            <div class="row mb-1">
              <div class="col-5 text-black-600 font-weight-bold">状态</div>
              <div class="col-7 text-right">Close</div>
            </div>
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
  </div>
</template>

<script>
import ComponentsLoading from "@/components/Loading";
export default {
  name: "ProposalDetails",
  components: {ComponentsLoading},
  data() {
    return {
      loading: false
    }
  },
  created() {
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
