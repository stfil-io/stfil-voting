import Http from "@/utils/http";

let proposal = {
    state: {
        data: {},
        detail: {
            author: '',
            blockNumber: 0,
            body: '',
            choices: [],
            created: 0,
            end: 0,
            id: undefined,
            ipfs: undefined,
            proposalStatus: '',
            proposalType: '',
            scores: [],
            scoresTotal: 0,
            start: 0,
            symbol: '',
            title: '',
        }
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
        async getProposal({commit}, {id}) {
            let data = await Http.get('proposal/' + id)
            commit('setProposalDetail', data)
        },
        // eslint-disable-next-line no-empty-pattern
        async getVoteResult({}, {proposalId}) {
            return await Http.get('vote/voteResult', {params: {proposalId}})
        }
    },
    modules: {}
}

export default proposal
