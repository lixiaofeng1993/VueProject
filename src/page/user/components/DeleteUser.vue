<script lang="ts" setup>
import { message } from "ant-design-vue";
import { deleteUserByID } from "../../../api/user";

const propos = defineProps<{ id: string }>();
const emits = defineEmits<{ (e: "deleteUser", id: string): void }>();
function deleteuser() {
  console.log(propos.id);
  deleteUserByID(propos.id).then((res) => {
    if (res.code === 200) {
      message.success("删除成功！");
      emits("deleteUser", propos.id);
    } else {
      message.error(res.detail.message);
    }
  });
}
</script>


<template>
  <a-popconfirm title="删除用户" @confirm="deleteuser">
    <a-button type="primary" danger>删除</a-button>
  </a-popconfirm>
</template>
