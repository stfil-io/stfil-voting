let voteSignModel = {
    domain: {
        name: 'STFIL Vote',
        version: '1.0.2',
        chainId: 3141,
        verifyingContract: "0x0000000000000000000000000000000000000000"
    },
    types: {
        Vote: [
            {name: 'voter', type: 'address'},
            {name: 'choice', type: 'uint32'},
            {name: 'vp', type: 'uint64'},
            {name: 'proposalId', type: 'string'},
            {name: 'created', type: 'uint64'},
            {name: 'reason', type: 'string'},
        ],
    }
}

const chainsMap = {
    3141: {
        name: 'Filecoin - Hyperspace',
        img: 'https://storage.froghub.io/froghub-home-html/assets/filecoin-logo.png'
    },
    undefined: {
        name: 'Filecoin - Hyperspace',
        img: 'https://storage.froghub.io/froghub-home-html/assets/filecoin-logo.png'
    },
}

let proposalStatusMap = {
    '': {
        label: '',
        className: ''
    },
    'IMMEDIATELY': {
        label: '活跃',
        className: 'badge-primary'
    },
    'CLOSE': {
        label: '关闭',
        className: 'badge-danger'
    },
    'UPCOMING': {
        label: '即将开始',
        className: 'badge-warning'
    }
}

export {voteSignModel, proposalStatusMap, chainsMap}
