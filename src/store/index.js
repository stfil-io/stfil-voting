import {createStore} from 'vuex'
import {sign} from "@/utils/web3/methods";
import proposal from './moudel/proposal'
import vote from './moudel/vote'

export default createStore({
    state: {
        domain: '/api/',
        provider: undefined,
    },
    getters: {},
    mutations: {
        setProvider(state, provider) {
            state.provider = provider
        }
    },
    actions: {
        async sign({dispatch, state}, data) {
            let provider = state.provider
            if (!provider) {
                await dispatch('web3Login')
            }
            return await sign(provider, data);
        }
    },
    modules: {
        proposal,
        vote
    }
})
