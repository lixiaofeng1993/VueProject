<script lang="ts" setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { doLogin } from "../../api/login";

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
});
const router = useRouter();
const onFinish = (values: Admin) => {
  console.log("Success:", values);
  doLogin(values).then((res) => {
    console.log(res);
    if (res.code === 200) {
      sessionStorage.setItem("token", res.result.access_token);
      router.push("/home");
      message.success("登录成功！");
    } else {
      message.error(res.detail.message);
    }
  });
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<template>
  <div id="container">
    <a-form
      id="login-form"
      :model="formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '用户名不可以为空' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '密码不可以为空' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss">
#container {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/1.jpg");
  background-size: cover;
  #login-form {
    padding-top: 80px;
    background-origin: 10px;
    background-color: white;
    position: absolute;
    width: 500px;
    height: 300px;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);
  }
}
</style>