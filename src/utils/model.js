let voteSignModel = {
    domain: {
        name: 'STFIL Vote',
        version: '1.0.2'
    },
    types: {
        Vote: [
            {name: 'voter', type: 'address'},
            {name: 'choice', type: 'uint32'},
            {name: 'vp', type: 'uint64'},
            {name: 'proposalIpfs', type: 'string'},
            {name: 'proposalId', type: 'string'},
            {name: 'created', type: 'uint64'},
            {name: 'reason', type: 'string'},
        ],
    }
}
export {voteSignModel}
