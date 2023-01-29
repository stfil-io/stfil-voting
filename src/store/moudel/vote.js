import Http from "@/utils/http";

let vote = {
    state: {
        data: {}
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
        }
    },
    modules: {}
}

export default vote
