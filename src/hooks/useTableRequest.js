import { onMounted, reactive, ref, toRefs, watch, watchEffect } from 'vue'
/**
 *
 * @param {*} Api 传入的异步请求
 * @param {*} params  传入的参数，包含初始分页 （响应式数据）
 * @param {*} needLoading  是否加载 效果
 */
export default function (Api = () => {}, params = {}, options = {}) {
  const { pageNum = 1, pageSize = 10, watchFiled = true, needLoading = true, debounceTime = 600 } = options
  const tableLoading = ref(false)
  const tableData = reactive({
    list: []
  })
  const tableError = reactive({
    err: null
  })
  const tableTimer = ref(null)
  const tablePagination = reactive({
    current: pageNum,
    pageSize: pageSize,
    total: 0,
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    size: 'small',
    showTotal: (total, range) => `共 ${total} 条记录，当前为第 ${range[0]}~${range[1]} 条记录`
  })
  /**
   *
   * @param {*} data 接口参数
   */
  const initTableData = data => {
    if (needLoading) {
      tableLoading.value = true
    }
    Api(data)
      .then(res => {
        tableData.list = res.list
        tablePagination.total = res.totalRecord
        tableLoading.value = false
      })
      .catch(err => {
        tableError.err = err
        tableLoading.value = false
      })
  }
  /**
   *
   * @param {*} pagination table表格 分页change回调的分页信息
   */
  const tablePaginationChange = pagination => {
    tablePagination.current = pagination.current
    tablePagination.pageSize = pagination.pageSize
    /**
     * 分页导致的数据改变逻辑
     */
    const { current, pageSize } = tablePagination
    const data = {
      ...params, // 传入的当前的响应式参数数据
      pageNum: current,
      pageSize
    }
    initTableData(data)
  }
  // params 筛选项改变 查询数据
  const queryTableData = () => {
    // 重置页码为1
    tablePagination.current = 1
    const { current, pageSize } = tablePagination
    const data = {
      ...params,
      pageNum: current,
      pageSize
    }
    initTableData(data)
  }

  // 初始化数据
  onMounted(() => {
    queryTableData()
  })
  //监听params的改变，刷新数据*/
  if (watchFiled) {
    watch([params], () => {
      tableTimer.value && clearTimeout(tableTimer.value)
      tablePagination.current = 1
      tableTimer.value = setTimeout(() => {
        queryTableData()
      }, debounceTime)
    })
  }

  const Action = [queryTableData, tablePaginationChange]
  return { ...toRefs(tableData), tablePagination, tableError, tableLoading, Action }
}
