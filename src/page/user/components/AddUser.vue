<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { message } from "ant-design-vue";
import { addUser } from "../../../api/user";

interface FormState {
  id: string;
  name: string;
  zh_name: string;
  email: string;
  description: string;
  hashed_password: string;
  passwrod: string;
  // is_superuser: boolean,
  create_date: string;
  last_login: string;
}
const formRef = ref();
const visible = ref<boolean>(false);
defineExpose({ visible });
const emits = defineEmits<{ (e: "cancel", refresh?: boolean): void }>();
function cancel() {
  visible.value = false;
}

const formState = reactive<FormState>({
  id: "",
  name: "",
  zh_name: "",
  email: "",
  description: "",
  hashed_password: "",
  passwrod: "",
  // is_superuser: boolean,
  create_date: "",
  last_login: "",
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
watch(visible, () => {
  if (!visible.value) {
    formRef.value.resetFields();
  }
});
function ok() {
  formRef.value.validate().then(() => {
    addUser(formState as User).then((res) => {
      if (res.code == 200) {
        emits("cancel", true);
        message.success("添加成功");
      } else {
        message.error(res.detail.message);
      }
    });
  });
}
</script>

<template>
  <a-modal title="添加用户" :visible="visible" @cancel="cancel" @ok="ok">
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账号"
        name="name"
        :rules="[{ required: true, message: '账号不能为空' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="hashed_password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
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