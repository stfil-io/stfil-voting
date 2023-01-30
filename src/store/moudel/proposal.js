import Http from "@/utils/http";

let proposal = {
    state: {
        data: {},
        detail: {}
    },
    getters: {},
    mutations: {
        setProposalList(state, data) {
            state.data = data
        },
        setProposalDetail(state, detail) {
            state.detail = detail
        }
    },
    actions: {
        async getProposalList({commit}, {type, status}) {
            let data = await Http.get('proposal', {params: {type, status}})
            commit('setProposalList', data)
        },
        // eslint-disable-next-line no-empty-pattern
        async getVoteResult({}, {proposalId}) {
            return await Http.get('vote/voteResult', {params: {proposalId}})
        }
    },
    modules: {}
}

export default proposal
