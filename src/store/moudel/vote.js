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
        }
    },
    modules: {}
}

export default vote
