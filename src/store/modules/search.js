/**
 * 搜索
 */

export default {
  namespaced: true,
  state: () => {
    return {
      historys: []
    }
  },
  mutations: {
    /**
     * 新增
     * 1. 新增的历史记录位于头部
     * 2. 不可有重复的
     */
    addHistory(state, newHstory) {
      const isFindIndex = state.historys.findIndex((item) => item === newHstory)

      // 剔除数据
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      //新增
      state.historys.unshift(newHstory)
    },
    /**
     * 单个删除
     */
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },
    /**
     * 全部删除
     */
    deleteAllHistory(state) {
      state.historys = []
    }
  },
  actions: {}
}
