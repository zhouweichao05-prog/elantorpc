import { createStore } from 'vuex'

export default createStore({
  state: {
    siteTitle: 'Elantor - Professional ULV Cold Fogger',
    company: {
      name: 'Elantor',
      email: 'info@elantor.com',
      phone: '+86 123 4567 8901',
      address: 'No.123 Industrial Zone, Guangzhou, China'
    }
  },
  getters: {
    getSiteTitle: state => state.siteTitle,
    getCompanyInfo: state => state.company
  },
  mutations: {},
  actions: {},
  modules: {}
})
