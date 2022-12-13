import axios from 'axios'
import store from '@/store/index'

export default class Http {
    static get(url, {params} = {}) {
        return this._request(url, {method: 'GET', params})
    }

    static post(url, {data} = {}) {
        return this._request(url, {method: 'POST', data})
    }

    static put(url, {data} = {}) {
        return this._request(url, {method: 'PUT', data})
    }

    static patch(url, {data} = {}) {
        return this._request(url, {method: 'PATCH', data})
    }

    static delete(url, {data} = {}) {
        return this._request(url, {method: 'DELETE', data})
    }

    static _request(url, {method, params, data}) {
        return new Promise((resolve, reject) => {
            const req = () => {
                axios.request({
                    url: store.state.domain + url,
                    method,
                    params: (method === 'GET' || method === 'DELETE') ? params || {} : {},
                    data: data || {},
                    responseType: 'json',
                }).then(res => {
                    if (res.status !== 200) {
                        reject(res.data)
                        return
                    }
                    switch (res.data.code) {
                        case 0:
                            resolve(res.data.data)
                            break
                        default:
                            reject(res.data)
                    }
                }).catch(err => {
                    reject(err)
                })
            }
            req()
        })
    }
}
