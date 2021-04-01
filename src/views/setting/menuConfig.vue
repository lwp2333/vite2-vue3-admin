<template>
  <div class="menuConfig">
    <a-row :gutter="[32, 32]">
      <a-col :xl="6" :xs="24">
        <a-card :loading="loading">
          <template #title>
            <span :style="{ lineHeight: '32px', fontWeight: 600 }">菜单</span>
          </template>
          <template #extra>
            <a-space>
              拖拽:<a-switch v-model:checked="treeDraggable" size="small"></a-switch>
              <a-button type="link" @click="openAddDrawer">添加</a-button>
            </a-space>
          </template>
          <a-tree
            :tree-data="routeList.tree"
            :replaceFields="resetFieldMap"
            :selectable="true"
            show-icon
            :draggable="treeDraggable"
            @select="onSelectNode"
            @rightClick="onRightClick"
            @drop="onDropNode"
          >
            <template #icon="{ iconType }">
              <icon-font v-if="iconType" :type="iconType" />
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :xl="18" :xs="24">
        <a-card :loading="detailLoading">
          <template #title>
            <span :style="{ lineHeight: '32px', fontWeight: 600 }">配置</span>
          </template>
          <template #extra>
            <a-button v-show="routeConfigform && isLimitEdit" :disabled="!routeConfigform || !isLimitEdit" type="link" @click="onEdit">
              <template #icon> <EditOutlined /> </template>编辑
            </a-button>
            <a-popconfirm title="确认删除该菜单及其子菜单?" placement="bottom" ok-text="确认" cancel-text="取消" @confirm="onDell">
              <a-button v-show="routeConfigform && isLimitEdit" type="link">
                <template #icon> <DeleteOutlined :style="{ color: 'red' }" /> </template>
                <span :style="{ color: 'red' }">删除</span>
              </a-button>
            </a-popconfirm>
          </template>
          <a-form
            v-if="routeConfigform"
            :ref="setEditRef"
            :model="routeConfigform"
            :rules="rules"
            :label-col="editLabelCol"
            :wrapper-col="editWrapperCol"
          >
            <a-form-item label="标题" name="title">
              <a-input v-model:value="routeConfigform.title" :disabled="isLimitEdit" />
            </a-form-item>
            <a-form-item label="路径" name="path">
              <a-input v-model:value="routeConfigform.path" :disabled="isLimitEdit" />
            </a-form-item>
            <a-form-item label="图标" name="iconType">
              <a-select allowClear v-model:value="routeConfigform.iconType" :disabled="isLimitEdit">
                <a-select-option v-for="item in iconOption" :key="item.name" :value="item.type">
                  <span> {{ item.name }} - <icon-font :type="item.type" :style="{ fontSize: '16px' }" /></span>
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="类型" name="isLeaf">
              <a-radio-group v-model:value="routeConfigform.isLeaf" :disabled="isLimitEdit">
                <a-radio :value="false"> 菜单 </a-radio>
                <a-radio :value="true"> 页面 </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ xl: 10, sm: 16, offset: 8 }">
              <a-space v-if="!isLimitEdit">
                <a-button @click="onEditCancel"> 取消 </a-button>
                <a-button type="primary" @click="onEditSubmit"> 保存 </a-button>
              </a-space>
            </a-form-item>
          </a-form>
          <noData v-else />
        </a-card>
      </a-col>
    </a-row>
    <a-drawer :width="375" title="添加" placement="right" :maskClosable="false" :closable="false" v-model:visible="addDrawerShow">
      <a-form :ref="setAddRef" :model="addMenuform" :rules="rules" :label-col="addLabelCol" :wrapper-col="addWrapperCol">
        <a-form-item label="上级" name="parentId">
          <a-tree-select
            v-model:value="addMenuform.parentId"
            :tree-data="menuOption.tree"
            :replaceFields="resetFieldMap"
            allow-clear
            search-placeholder="请选择上级"
          />
        </a-form-item>
        <a-form-item label="标题" name="title">
          <a-input v-model:value="addMenuform.title" />
        </a-form-item>
        <a-form-item label="路径" name="path">
          <a-input v-model:value="addMenuform.path" />
        </a-form-item>
        <a-form-item label="图标" name="iconType">
          <a-select allowClear v-model:value="addMenuform.iconType">
            <a-select-option v-for="item in iconOption" :key="item.name" :value="item.type">
              <span> {{ item.name }} - <icon-font :type="item.type" :style="{ fontSize: '16px' }" /></span>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="类型" name="isLeaf">
          <a-radio-group v-model:value="addMenuform.isLeaf">
            <a-radio :value="false"> 菜单 </a-radio>
            <a-radio :value="true"> 页面 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ xl: 10, sm: 16, offset: 8 }">
          <a-space>
            <a-button @click="onAddCancel"> 取消 </a-button>
            <a-button type="primary" @click="onAddSubmit"> 保存 </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, nextTick } from 'vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { NotEmpty, NotRadio, limitStr } from '@/utils/validate'
import { getMenuList, dragDropMenu, getMenu, updateMenu, delMenu, getMenuFolder, createMenu } from '@/api/menu'
import iconList from '@/constants/iconList.js'

const loading = ref(false)
const treeDraggable = ref(false)
const routeList = reactive({
  tree: null,
})
const initTreeData = async () => {
  loading.value = true
  const res = await getMenuList().catch(() => {
    loading.value = false
  })
  routeList.tree = res || []
  loading.value = false
}
const Store = useStore()
// 用户刷新左侧菜单
const refreshMenuList = () => {
  Store.dispatch('menuInfo/generateMenu')
}
onMounted(() => {
  initTreeData()
})

// 右侧配置 数据加载逻辑, 配置表单逻辑

const detailLoading = ref(false)
const ruleForm = ref(null)
const isLimitEdit = ref(true)
const currentNode = reactive({
  routeConfigform: null,
})
const iconOption = reactive(iconList)

const getMenuDetail = async nodeId => {
  detailLoading.value = true
  const res = await getMenu({ _id: nodeId }).catch(() => {
    detailLoading.value = false
  })
  const { _id, title, path, isLeaf, iconType } = res
  currentNode.routeConfigform = { _id, title, path, isLeaf, iconType }
  detailLoading.value = false
}

const onSelectNode = (keys, { selectedNodes, node }) => {
  // 取消选择或者选择其他的时候 都先重置为空, 都限制表单输入
  currentNode.routeConfigform = null
  isLimitEdit.value = true
  if (selectedNodes.length) {
    const {
      props: { _id },
    } = selectedNodes[0]
    nextTick(() => {
      getMenuDetail(_id)
    })
  }
}
const onDropNode = e => {
  const {
    dragNode: { eventKey: drapNodeId },
    dropPosition,
    node: { eventKey: dropNodeId, pos },
  } = e
  const dropPos = pos.split('-')
  const dropPositionNum = dropPosition - Number(dropPos[dropPos.length - 1]) // -1 top 、0 inside、 1 bottom
  const positionTypeList = ['top', 'inside', 'bottom']
  const data = {
    drapNodeId,
    dropNodeId,
    positionType: positionTypeList[dropPositionNum + 1],
  }
  dragDropMenu(data).then(() => {
    // 重新加载菜单数据
    initTreeData()
    // 重新获取左侧菜单
    refreshMenuList()
  })
}
const onRightClick = ({ node }) => {
  const { eventKey, isLeaf } = node
  console.log(eventKey, isLeaf)
}
const setEditRef = el => {
  ruleForm.value = el
}
const onEdit = () => {
  isLimitEdit.value = false
}
const onDell = () => {
  const { _id } = currentNode.routeConfigform
  delMenu({ _id }).then(() => {
    // 删除成功表单置空
    currentNode.routeConfigform = null
    // 重新加载菜单数据
    initTreeData()
    // 重新获取左侧菜单
    refreshMenuList()
  })
}
const onEditSubmit = () => {
  ruleForm.value.validate().then(() => {
    updateMenu(currentNode.routeConfigform).then(() => {
      // 修改成功表单置空
      currentNode.routeConfigform = null
      // 重新加载菜单数据
      initTreeData()
      // 重新获取左侧菜单
      refreshMenuList()
    })
  })
}
const onEditCancel = () => {
  isLimitEdit.value = true
  ruleForm.value.resetFields()
}

// 添加菜单/页面 逻辑
const addDrawerShow = ref(false)
const addRuleForm = ref(null)
const addMenuform = reactive({
  title: '',
  path: '',
  isLeaf: false,
  iconType: null,
  parentId: null,
})
const menuOption = reactive({
  tree: null,
})
const getMenuOption = async () => {
  const res = await getMenuFolder()
  menuOption.tree = res || []
}
const setAddRef = el => {
  addRuleForm.value = el
}
const openAddDrawer = () => {
  addDrawerShow.value = true
  getMenuOption()
}
const onAddSubmit = () => {
  addRuleForm.value.validate().then(() => {
    //addMenuform
    createMenu(addMenuform).then(() => {
      message.success(`添加菜单成功`)
      onAddCancel()
      // 重新加载菜单数据
      initTreeData()
      // 重新获取左侧菜单
      refreshMenuList()
    })
  })
}
const onAddCancel = () => {
  addRuleForm.value.resetFields()
  addDrawerShow.value = false
}

const resetFieldMap = { value: '_id', key: '_id' }

const editLabelCol = {
  xl: 4,
  sm: 8,
}
const editWrapperCol = {
  xl: 10,
  sm: 16,
}
const { routeConfigform } = toRefs(currentNode)
const rules = {
  title: [limitStr('标题', 2, 12)],
  path: [NotEmpty('路径')],
  iconType: [NotRadio('图标')],
  isLeaf: [NotRadio('路径')],
}
const addLabelCol = {
  span: 4,
}
const addWrapperCol = {
  span: 20,
}
</script>

<style scoped lang="less">
.menuConfig {
  width: 100%;
  height: 100%;
  .ant-row {
    height: 100%;
  }
}
.ant-card {
  height: 100%;
}
</style>
