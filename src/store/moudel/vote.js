import Http from "@/utils/http";

let vote = {
    state: {
        data: {
            records: []
        }
    },
    getters: {},
    mutations: {
        setVoteList(state, data) {
            state.data = data
        }
    },
    actions: {
        async getVoteList({commit}, {proposalId}) {
            let data = await Http.get('vote', {params: {proposalId}})
            commit('setVoteList', data)
        },
        // eslint-disable-next-line no-empty-pattern
        async getVoterInfo({}, {address, blockNumber}) {
            return await Http.get('wallet/user', {params: {address, blockNumber}})
        },
        // eslint-disable-next-line no-empty-pattern
        async addVote({}, {proposalId, choice, created, reason, voter, vp, sign}) {
            return await Http.post('vote', {data: {proposalId, choice, created, reason, voter, vp, sign}})
        }
    },
    modules: {}
}

export default vote
