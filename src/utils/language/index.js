import {createI18n} from 'vue-i18n'

export default createI18n({
    legacy: false, // 让 setup 函数可以通过 t 访问
    globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
    locale: window.localStorage.getItem('locale') || 'en',
    messages: {
        'zh': require('./zh').default,
        'en': require('./en').default
    }
})
