import {createApp} from 'vue'
import {chain, configureChains, createClient, VagmiPlugin} from 'vagmi';
import {publicProvider} from 'vagmi/providers/public';
import {InjectedConnector} from 'vagmi/connectors/injected';
import '@/assets/scss/style.scss'
import router from './router'
import store from './store'
import App from './App.vue'

const {provider, webSocketProvider} = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()],
);

const client = createClient({
    autoConnect: true,
    connectors: [
        new InjectedConnector({
            chains: [chain.mainnet, chain.optimism],
            options: {
                name: 'Injected',
                shimDisconnect: true,
            }
        })
    ],
    provider,
    webSocketProvider,
});

const plugin = VagmiPlugin(client);
const app = createApp(App);
app.use(store)
app.use(router)
app.use(plugin)
app.mount('#app')
