/**
 * 用户名的表单校验
 * val 输入的内容
 * true 表示表单校验通过 ，Sring 表示表单校验未通过， String 为提示信息
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名不能为空'
  }
  if (val.length < 3 || val.length > 12) {
    return '用户名长度必须在3-12之间'
  }
  return true
}

/**
 * 密码的表单校验
 */
export const validatePassword = (val) => {
  if (!val) {
    return '密码不能为空'
  }
  if (val.length < 6 || val.length > 12) {
    return '密码长度必须在6-12之间'
  }
  return true
}

/**
 *  确认密码表单校验, 关联密码 所以需要注册
 *  1. 定义方法
 *  2. 注册校验
 */
export const validateConfirmPassword = (val, password) => {
  if (val !== password[0]) {
    return `两次密码不一致`
  }
  return true
}
