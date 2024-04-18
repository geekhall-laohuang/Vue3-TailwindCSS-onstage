import { isMobileTerminal } from '@/utils/flexible'

export default {
  //简单访问
  categorys: (state) => state.category.categorys,
  //当前主题的访问
  themeType: (state) => state.theme.themeType,
  /**
   * category 选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category 选中项的下标
   */
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  /**
   * 搜索历史
   */
  historys: (state) => state.search.historys,

  /**
   * 搜索文本
   */
  searchText: (state) => state.app.searchText,

  /**
   * token
   */
  token: (state) => state.user.token,

  /**
   * 用户信息
   */
  userInfo: (state) => state.user.userInfo,

  /**
   * 路由跳转方式
   */
  routerType: (state) => {
    // 在 PC 端下， 永远没有跳转动画
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
