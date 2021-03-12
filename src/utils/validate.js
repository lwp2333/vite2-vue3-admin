/**
 *
 * @param {字段中文含义} str
 * 非空，单独空格视为空
 */
export const NotEmpty = str => {
  return {
    required: true,
    message: `请输入${str}`,
    trigger: 'blur',
    whitespace: true,
  }
}

/**
 *
 * @param {字段中文含义} str
 * 多选
 */
export const NotSelect = str => {
  return {
    required: true,
    message: `请选择${str}`,
    trigger: 'change',
    type: 'array',
  }
}

/**
 *
 * @param {字段中文含义} str
 *  单选， 值类型任意
 */
export const NotRadio = str => {
  return {
    required: true,
    message: `请选择${str}`,
    trigger: 'change',
    type: 'any',
  }
}

/**
 *
 * @param {字段中文含义} str
 * @param {字符串最小长度} min
 * @param {字符串最大长度} max
 */
export const limitStr = (str, min = 3, max = 8) => {
  return {
    required: true,
    min,
    max,
    message: `请输入${str}, 规则：长度限制在${min}~${max}之间`,
    trigger: 'blur',
    type: 'string',
    whitespace: true,
  }
}

/**
 * @param {字段中文含义} str
 * @param {字符串最小长度} min
 * @param {字符串最大长度} max
 */
export const nickStr = (str, min = 3, max = 8) => {
  return {
    required: true,
    pattern: /^\w+$/,
    min,
    max,
    message: `请输入${str}, 规则：长度限制在${min}~${max}之间的英文/数字/下划线`,
    trigger: 'blur',
    type: 'string',
  }
}

/**
 * 手机号码/固话 校验
 * @param {Boolean} inlcudeTel 是否包含固话检验
 */
export const phoneStr = inlcudeTel => {
  let pattern = inlcudeTel ? /^((0\d{2,3}(-?)\d{7,8})|(1[3-9]\d{9}))$/ : /^(1[3-9])\d{9}/
  let message = inlcudeTel ? '请输入正确的固定电话或手机号' : '请输入正确的手机号码'
  return {
    required: true,
    pattern,
    message,
    trigger: 'blur',
    type: 'string',
  }
}

/**
 * @param {身份证号码}
 */
export const idCardStr = () => {
  return {
    required: true,
    pattern: /(^\d{15}$)|(^\d{17}(\d|X|x)$)/,
    message: `请输入正确的身份证号码`,
    trigger: 'blur',
    type: 'string',
  }
}

/**
 * @param {邮箱}
 */
export const emailStr = () => {
  return {
    required: true,
    message: `请输入正确的邮箱`,
    trigger: 'blur',
    type: 'email',
  }
}
export const limitNum = () => {
  return {
    required: true,
    pattern: /(^\d{0,10}([\b]*|\.|\.\d{0,1}|$)$)/,
    message: `请输入数字保留一位小数`,
    trigger: 'blur',
    type: 'number',
  }
}
