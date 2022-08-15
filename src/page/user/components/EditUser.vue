
<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { nextTick, watch } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { updateUser } from "../../../api/user";
interface FormState {
  id: string;
  name: string;
  zh_name: string;
  email: string;
  description: string;
  hashed_password: string | undefined;
  // is_superuser: boolean,
  create_date: string;
  last_login: string;
  passwrod: string;
}
const formState = reactive<FormState>({
  id: "",
  name: "",
  zh_name: "",
  email: "",
  description: "",
  hashed_password: "",
  create_date: "",
  last_login: "",
  passwrod: "",
});
const formRef = ref();
const visible = ref<boolean>(false);
const propos = defineProps<{ user: User }>();
watch(visible, () => {
  if (visible.value) {
    // 下次渲染操作
    nextTick(() => {
      formState.name = propos.user.name;
      formState.zh_name = propos.user.zh_name;
      formState.email = propos.user.email;
      formState.description = propos.user.description;
      formState.id = propos.user.id;
    });
  }
});
defineExpose({ visible });

const emits = defineEmits<{ (e: "cancel", refresh?: boolean): void }>();
function cancel() {
  visible.value = false;
}
function ok() {
  formRef.value.validate().then(() => {
    updateUser(propos.user.id, formState as User).then((res) => {
      if (res.code == 200) {
        emits("cancel", true);
        message.success("编辑成功");
      } else {
        message.error(res.detail.message);
      }
    });
  });
}
</script>

<template>
  <a-modal title="编辑用户" :visible="visible" @cancel="cancel" @ok="ok">
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item hidden label="id" name="id">
        <a-input v-model:value="formState.id" />
      </a-form-item>
      <a-form-item
        label="账号"
        name="name"
        :rules="[{ required: true, message: '账号不能为空' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="密码" name="hashed_password">
        <a-input-password v-model:value="formState.hashed_password" />
      </a-form-item>

      <a-form-item
        label="姓名"
        name="zh_name"
        :rules="[{ required: true, message: '姓名不能为空' }]"
      >
        <a-input v-model:value="formState.zh_name" />
      </a-form-item>

      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '邮箱不能为空' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="备注"
        name="description"
        :rules="[{ required: false, message: '备注可以为空' }]"
      >
        <a-textarea
          v-model:value="formState.description"
          placeholder="Basic usage"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>