import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { getCategory } from '@/api/category'
/**
 * 处理 navigationBar 中的数据 categorys
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 1. 让 categorys 具备初始化数据
      // 2. 从服务端获取数据， 替换初始化数据
      // 3. 为防止初始化数据太老， 把新数据作为下一次初始化数据
      //  第三步方案： 每次从接口获得的数据，进行缓存。 然后把缓存数据 作为 初始化数据
      categorys: CATEGORY_NOMAR_DATA
    }
  },
  mutations: {
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    /**
     * 获取category 数据， 并自动保存到 vuex中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
