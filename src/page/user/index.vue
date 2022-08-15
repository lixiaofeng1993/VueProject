<script lang="ts" setup>
import DeleteUser from "./components/DeleteUser.vue";
import { reactive, ref } from "@vue/reactivity";
import { TablePaginationConfig } from "ant-design-vue";
import { getUserList } from "../../api/user";
import AddUser from "./components/AddUser.vue";
import EditUser from "./components/EditUser.vue";

const tableData = reactive<{
  userList: User[];
  loading: boolean;
  pagination: TablePaginationConfig;
}>({
  userList: [],
  loading: true,
  pagination: {
    position: ["bottomCenter"],
    current: 1,
    pageSize: 10,
    total: 0,
  },
});
const columns = [
  {
    title: "账号",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "姓名",
    dataIndex: "zh_name",
    key: "zh_name",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "备注",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "创建时间",
    dataIndex: "create_date",
    key: "create_date",
  },
  {
    title: "修改时间",
    dataIndex: "last_login",
    key: "last_login",
  },
  {
    title: "操作",
    key: "action",
  },
];
const addRef = ref();
const editRef = ref();
getUserList().then((res) => {
  console.log(res);
  tableData.loading = false;
  tableData.userList = res.result.data;
  tableData.pagination.current = 1;
  tableData.pagination.pageSize = res.result.limit;
  tableData.pagination.total = res.result.total;
});

function deleteUser(id: string) {
  tableData.userList = tableData.userList.filter((u) => u.id !== id);
}
function showAddUserModal() {
  addRef.value.visible = true;
}
function cancelAddUserModal(refresh?: boolean) {
  if (refresh) {
    getUserList().then((res) => {
      console.log(res);
      tableData.loading = false;
      tableData.userList = res.result.data;
      tableData.pagination.current = 1;
      tableData.pagination.pageSize = res.result.limit;
      tableData.pagination.total = res.result.total;
    });
  }
  addRef.value.visible = false;
}
const currentUser = ref<User>({} as User);
function showEditUSerModal(user: User) {
  currentUser.value = user;
  editRef.value.visible = true;
}
function cancelEditUserModal(refresh?: boolean){
  if (refresh) {
    getUserList().then((res) => {
      console.log(res);
      tableData.loading = false;
      tableData.userList = res.result.data;
      tableData.pagination.current = 1;
      tableData.pagination.pageSize = res.result.limit;
      tableData.pagination.total = res.result.total;
    });
  }
  editRef.value.visible = false;
}
</script>
<!-- :pagination="tableData.pagination" -->
<template>
  <a-button type="primary" @click="showAddUserModal">添加用户</a-button>
  <AddUser ref="addRef" @cancel="cancelAddUserModal" />
  <EditUser :user="currentUser" ref="editRef" @cancel="cancelEditUserModal" />
  <a-table
    :columns="columns"
    :dataSource="tableData.userList"
    :loading="tableData.loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-space>
          <a-button type="primary" @click="showEditUSerModal(record)"
            >编辑</a-button
          >
          <DeleteUser :id="record.id" @deleteUser="deleteUser" />
        </a-space>
      </template>
    </template>
  </a-table>
</template>