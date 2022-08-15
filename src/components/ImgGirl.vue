<template>
  <div>
    <a-button type="primary" @click="() => getGirl(true)">是小七Ya</a-button>
    <a-image
      :width="200"
      :style="{ display: 'none' }"
      :preview="{
        visible,
        onVisibleChange: setVisible,
      }"
      :placeholder="true"
      :src="imgData.img"
    />
  </div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { reactive, defineComponent, ref } from "vue";
import { getImg } from "../api/calendar";

interface imgData {
  img: string;
}

const imgData = reactive<imgData>({
  img: "",
});
const visible = ref<boolean>(false);
const setVisible = (value: boolean): void => {
  visible.value = value;
};

function getGirl(value: boolean) {
  getImg().then((res) => {
    if (res.code === 200) {
      imgData.img = res.img;
    } else {
      message.error("啥也不是");
    }
  });
  setTimeout(() => {
    setVisible(value);
  }, 1000);
}
</script>