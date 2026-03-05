import { createStore } from 'vuex'

export default createStore({
  state: {
    siteTitle: 'Elantor - Professional ULV Cold Fogger',
    company: {
      name: 'Elantor',
      email: 'elant_industrial@sina.com',
      phone: '+86 19540736965',
      whatsapp: '+86 19540736965',
      wechat: 'Elantor',
      facebook: 'Elantor',
      address: 'Xing Business Building 310, Bulong Road, Bantian Street, Longgang District, Shenzhen, China, 518118',
      businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)'
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
