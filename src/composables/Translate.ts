import { trans, transChoice } from 'laravel-vue-i18n'
// wrapper for vue i18n scanner
export const t = (key: string, params?: any) => trans(key, params)
export const tc = (key: string, params?: any) => transChoice(key, params)
