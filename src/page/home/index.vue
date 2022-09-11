<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
import CountDown from "../../components/CountDown.vue";
import ImgGirl from "../../components/ImgGirl.vue";
import { getCalendarAge } from "../../api/calendar";
import Fishing from "../../components/Fishing.vue";

interface DelayLoading {
  delay: number;
}
interface ageData {
  title: string;
  pass_by: string;
  born_in: string;
  so: {
    eighty: string;
    fifty: string;
    hundred: string;
    seventy: string;
    sixty: string;
  };
}

const ageData = reactive<ageData>({
  title: "",
  pass_by: "",
  born_in: "",
  so: {
    eighty: "",
    fifty: "",
    hundred: "",
    seventy: "",
    sixty: "",
  },
});
const iconLoading = ref<boolean | DelayLoading>(false);
const loading = ref(false);
const visible = ref<boolean>(false);
const enterIconLoading = () => {
  iconLoading.value = { delay: 1000 };

  setTimeout(() => {
    iconLoading.value = false;
  }, 6000);
};
function getMeAge() {
  getCalendarAge().then((res) => {
    console.log(res.code);
    visible.value = true;
    ageData.title = res.result.title;
    ageData.born_in = res.result.born_in;
    ageData.pass_by = res.result.pass_by;
    ageData.so.eighty = res.result.so.eighty;
    ageData.so.fifty = res.result.so.fifty;
    ageData.so.hundred = res.result.so.hundred;
    ageData.so.seventy = res.result.so.seventy;
    ageData.so.sixty = res.result.so.sixty;
  });
}
function cancel() {
  visible.value = false;
}
</script>



<template>
  <a-space style="width: 100%">
    <a-button
      type="primary"
      :loading="loading"
      @mouseenter="loading"
      @click="getMeAge"
    >
      人生旅程
    </a-button>
  </a-space>
  <a-space> </a-space>

  <a-modal title="人生旅程" :visible="visible" @cancel="cancel" @ok="cancel">
    <a-form
      ref="formRef"
      :model="ageData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <div id="age">
        <a-space direction="vertical">
          <a-divider>{{ ageData.title }}</a-divider>
          <p>
            <span>出生在</span><span>：</span><span>{{ ageData.born_in }}</span>
          </p>
          <p>
            <span>已走过</span><span>：</span><span>{{ ageData.pass_by }}</span>
          </p>
          <p>
            <CountDown />
          </p>
          <a-divider />
          <p>
            <!-- <span>五十岁</span><span>：</span> -->
            <span>{{ ageData.so.fifty }}</span>
          </p>
          <p>
            <span>{{ ageData.so.sixty }}</span>
          </p>
          <p>
            <span>{{ ageData.so.seventy }}</span>
          </p>
          <p>
            <span>{{ ageData.so.eighty }}</span>
          </p>
          <p>
            <span>{{ ageData.so.hundred }}</span>
          </p>
        </a-space>
      </div>
    </a-form>
  </a-modal>

  <div id="fish">
    <Fishing />
  </div>

  <div id="img">
    <ImgGirl />
  </div>
</template>

<style scoped>
#age {
  margin-left: 15%;
}
#fish{
  margin-top: 5%;
}
#img{
  margin-top: 5%;
}
</style>