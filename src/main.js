import {createApp} from 'vue'
import {configureChains, createClient, VagmiPlugin} from 'vagmi';
import {jsonRpcProvider} from 'vagmi/providers/jsonRpc'
import '@/assets/scss/style.scss'
import router from './router'
import store from './store'
import App from './App.vue'
import {filChain} from "@/utils/filChain";
import {InjectedConnector} from 'vagmi/connectors/injected';
import i18n from '@/utils/language/index'

const {chains, provider, webSocketProvider} = configureChains(
    [filChain],
    [jsonRpcProvider({
        rpc: () => ({
            http: `https://api.hyperspace.node.glif.io/rpc/v1`,
        }),
    }),],
);
const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({chains})],
    provider,
    webSocketProvider,
});

const plugin = VagmiPlugin(client);
const app = createApp(App);
app.use(store)
app.use(i18n)
app.use(router)
app.use(plugin)
app.mount('#app')
