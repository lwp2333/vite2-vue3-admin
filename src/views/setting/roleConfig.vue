<template>
  <div class="roleConfig">
    <div class="topAction">
      <a-form v-model:value="search" :labelCol="formLabelCol" :wrapperCol="formWrapperCol">
        <a-row type="flex" align="middle">
          <a-col v-bind="formItemCol">
            <a-form-item label="角色名称">
              <a-input allowClear v-model:value="search.roleName" placeholder="请输入"></a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemCol">
            <a-form-item label="角色级别">
              <a-select v-model:value="search.roleLevel" allowClear placeholder="请选择">
                <a-select-option value="超级管理员"> 超级管理员 </a-select-option>
                <a-select-option value="普通用户"> 普通用户 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemCol">
            <a-form-item label="其他操作">
              <a-space>
                <a-button type="primary" @click="hanldeExport">导出角色</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
  <a-table
    :loading="tableLoading"
    :data-source="list"
    :pagination="tablePagination"
    rowKey="_id"
    size="small"
    @change="tablePaginationChange"
  >
    <a-table-column key="roleName" title="角色名称" data-index="roleName" />
    <a-table-column key="roleLevel" title="角色级别" data-index="roleLevel" />
    <a-table-column key="description" title="描述" data-index="description" />
    <a-table-column key="action" title="操作">
      <template #default="{ text, record }">
        <a-space>
          <a-button type="link" @click="handleConfigDetail(record)">配置</a-button>
        </a-space>
      </template>
    </a-table-column>
  </a-table>
  <a-drawer
    :width="mapResultWidth"
    title="角色配置"
    placement="right"
    :maskClosable="false"
    :closable="false"
    v-model:visible="configDrawerShow"
  >
    <a-alert message="注意选中子菜单时候，不要忘记选中父级菜单" type="info" show-icon />
    <a-card :loading="loading" :bordered="false">
      <a-tree
        :checkedKeys="bindMenu"
        :tree-data="tree"
        :replaceFields="resetFieldMap"
        :selectable="false"
        checkable
        checkStrictly
        show-icon
        defaultExpandAll
        @check="onCheckNode"
      >
        <template #icon="{ iconType }">
          <icon-font v-if="iconType" :type="iconType" />
        </template>
      </a-tree>
    </a-card>
    <div class="configAction">
      <a-space>
        <a-button @click="onConfigCancel"> 取消 </a-button>
        <a-button type="primary" @click="onConfigSubmit"> 保存 </a-button>
      </a-space>
    </div>
  </a-drawer>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'
import useTableRequest from '@/hooks/useTableRequest'
import useDeviceInfo from '@/hooks/useDeviceInfo'
import { getRoleListByPage, getRoleDetail, updateRole, exportExcel } from '@/api/role'
import { getMenuList } from '@/api/menu'
const formLabelCol = {
  xs: 6,
  sm: 6,
  md: 6,
  xl: 10,
  xxl: 8,
}
const formWrapperCol = {
  xs: 18,
  sm: 18,
  md: 18,
  xl: 14,
  xxl: 16,
}
const formItemCol = { xs: 20, sm: 12, md: 12, xl: 8, xxl: 6 }
const { mapResultWidth } = useDeviceInfo({
  xs: '100%',
  sm: '88%',
  md: '76%',
  lg: '64%',
  xl: '52%',
  xxl: '40%',
})
const search = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: undefined,
  roleLevel: undefined,
})
const {
  list,
  tablePagination,
  tableError,
  tableLoading,
  Action: [refreshTableData, tablePaginationChange],
} = useTableRequest(getRoleListByPage, search, true)
const handleConfigDetail = row => {
  configDrawerShow.value = true
  initConfigData(row)
}
const configDrawerShow = ref(false)

const routeList = reactive({
  tree: null,
})
const currentRole = reactive({
  bindMenu: [],
  id: '',
})
const loading = ref(false)
const initConfigData = async ({ _id }) => {
  loading.value = true
  const res = await getMenuList().catch(() => {
    loading.value = false
  })
  routeList.tree = res || []
  loading.value = false
  const currentRoleDetail = await getRoleDetail({ _id })
  currentRole.bindMenu = currentRoleDetail.bindMenu
  currentRole.id = currentRoleDetail._id
}
const onCheckNode = checkKeys => {
  const { checked } = checkKeys
  currentRole.bindMenu = [...checked]
}
const onConfigCancel = () => {
  configDrawerShow.value = false
}
const onConfigSubmit = async () => {
  const { id, bindMenu } = currentRole
  const data = {
    _id: id,
    bindMenu,
  }
  updateRole(data).then(() => {
    refreshTableData(search)
    configDrawerShow.value = false
  })
}
const hanldeExport = () => {}
const { tree } = toRefs(routeList)
const { bindMenu } = toRefs(currentRole)
const resetFieldMap = { value: '_id', key: '_id' }
</script>

<style scoped lang="less">
.configAction {
  width: 100%;
  padding: 24px;
  text-align: center;
}
</style>
