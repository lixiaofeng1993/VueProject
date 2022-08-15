<template>
  <span
    >当天还剩：<span id="time">{{ b.hh }}</span> 小时
    <span id="time">{{ b.mm }}</span> 分钟
    <span id="time">{{ b.ss }}</span> 秒</span
  >
  <!-- <span>倒计时：{{ c.dd }} - {{ c.hh }} -{{ c.mm }} - {{ c.ss }}</span> -->
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";

const nowTime = new Date().getTime();
const end = new Date(nowTime);
const endYear = end.getFullYear();
const endMonth = end.getMonth() + 1;
const endDay = end.getDate() + 1;
const endTime = new Date(
  endYear + "-" + endMonth + "-" + endDay + " 00:00:00"
).getTime();
function countDown(time: number) {
  let rtime = ref(time);
  let count = ref(0);
  let exc = () => {
    rtime.value -= 1000;
  };
  let interval = setInterval(exc, 1000);
  console.log(rtime.value);

  return {
    get time() {
      return rtime.value;
    },
    // 剩余几天
    get dd() {
      return Math.floor(this.time / 1000 / 60 / 60 / 24) < 10
        ? "0" + Math.floor(this.time / 1000 / 60 / 60 / 24)
        : Math.floor(this.time / 1000 / 60 / 60 / 24);
    },
    // 剩余小时
    get hh() {
      return Math.floor(this.time / 1000 / 60 / 60) % 24 < 10
        ? "0" + (Math.floor(this.time / 1000 / 60 / 60) % 24)
        : Math.floor(this.time / 1000 / 60 / 60) % 24;
    },
    // 剩余分钟
    get mm() {
      return Math.floor(this.time / 1000 / 60) % 60 < 10
        ? "0" + (Math.floor(this.time / 1000 / 60) % 60)
        : Math.floor(this.time / 1000 / 60) % 60;
    },
    // 剩余秒
    get ss() {
      return Math.floor(this.time / 1000) % 60 < 10
        ? "0" + (Math.floor(this.time / 1000) % 60)
        : Math.floor(this.time / 1000) % 60;
    },
  };
}

export default {
  setup() {
    return {
      // a: countDown(endTime - nowTime),
      b: countDown(endTime - nowTime),
      //   c: countDown(minTime),
    };
  },
};
</script>
<style scoped>
#time {
  color: red;
}
</style>