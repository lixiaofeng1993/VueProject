<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
import { getFish } from "../api/calendar";

interface DelayLoading {
  delay: number;
}
interface fishData {
  code: number;
  message: string;
  result: {
    title: string;
    today: {
      gregorian: string;
      lunar: string;
      week: string;
      constellations: string;
      season: string;
      Solar: string;
      festivals: string;
      three_volts_count_nine: string;
      suitable: string;
      taboo: string;
    };
    holiday: {
      weekend: string;
      new_year_day: string;
      spring_festival: string;
      tomb_sweeping: string;
      labour_day: string;
      dragon_boat: string;
      national: string;
      autumn: string;
    };
  };
}

const fishData = reactive<fishData>({
  code: 200,
  message: "",
  result: {
    title: "",
    today: {
      gregorian: "",
      lunar: "",
      week: "",
      constellations: "",
      season: "",
      Solar: "",
      festivals: "",
      three_volts_count_nine: "",
      suitable: "",
      taboo: "",
    },
    holiday: {
      weekend: "",
      new_year_day: "",
      spring_festival: "",
      tomb_sweeping: "",
      labour_day: "",
      dragon_boat: "",
      national: "",
      autumn: "",
    },
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
function fishing() {
  getFish().then((res) => {
    if (res.code === 200) {
      visible.value = true;
      fishData.result.title = res.result.title;
      fishData.result.today.gregorian = res.result.today.gregorian;
      fishData.result.today.lunar = res.result.today.lunar;
      fishData.result.today.week = res.result.today.week;
      fishData.result.today.constellations = res.result.today.constellations;
      fishData.result.today.season = res.result.today.season;
      fishData.result.today.Solar = res.result.today.Solar;
      fishData.result.today.festivals = res.result.today.festivals;
      fishData.result.today.three_volts_count_nine =
        res.result.today.three_volts_count_nine;
      fishData.result.today.suitable = res.result.today.suitable;
      fishData.result.today.taboo = res.result.today.taboo;
      fishData.result.holiday.weekend = res.result.holiday.weekend;
      fishData.result.holiday.new_year_day = res.result.holiday.new_year_day;
      fishData.result.holiday.spring_festival =
        res.result.holiday.spring_festival;
      fishData.result.holiday.tomb_sweeping = res.result.holiday.tomb_sweeping;
      fishData.result.holiday.labour_day = res.result.holiday.labour_day;
      fishData.result.holiday.dragon_boat = res.result.holiday.dragon_boat;
      fishData.result.holiday.national = res.result.holiday.national;
      fishData.result.holiday.autumn = res.result.holiday.autumn;
    }
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
      @click="fishing"
    >
      摸鱼办宣
    </a-button>
  </a-space>
  <a-space> </a-space>

  <a-modal
    :title="fishData.result.title"
    :visible="visible"
    @cancel="cancel"
    @ok="cancel"
  >
    <a-form
      ref="formRef"
      :model="fishData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <div id="fish">
        <a-space direction="vertical">
          <a-divider>今天</a-divider>
          <p>
            <span>公历日期</span><span>：</span
            ><span>{{ fishData.result.today.gregorian }}</span>
          </p>
          <p>
            <span>农历日期</span><span>：</span
            ><span>{{ fishData.result.today.lunar }}</span>
          </p>
          <p>
            <span>星　　期</span><span>：</span
            ><span>{{ fishData.result.today.week }}</span>
          </p>
          <p>
            <span>星　　座</span><span>：</span
            ><span>{{ fishData.result.today.constellations }}</span>
          </p>
          <p>
            <span>季　　节</span><span>：</span
            ><span>{{ fishData.result.today.season }}</span>
          </p>
          <p>
            <span>节　　气</span><span>：</span
            ><span>{{ fishData.result.today.Solar }}</span>
          </p>
          <p>
            <span>节　　日</span><span>：</span
            ><span>{{ fishData.result.today.festivals }}</span>
          </p>
          <p>
            <span>三伏数九</span><span>：</span
            ><span>{{ fishData.result.today.three_volts_count_nine }}</span>
          </p>
          <p>
            <span>今日所宜</span><span>：</span
            ><span>{{ fishData.result.today.gregorian }}</span>
          </p>
          <p>
            <span>今日所忌</span><span>：</span
            ><span>{{ fishData.result.today.taboo }}</span>
          </p>
          <a-divider>放假安排</a-divider>
          <div id="holiday">
            <p>
              <span>元　　旦</span><span>：</span>
              <span>{{ fishData.result.holiday.new_year_day }}</span>
            </p>
            <p>
              <span>春　　节</span><span>：</span>
              <span>{{ fishData.result.holiday.spring_festival }}</span>
            </p>
            <p>
              <span>清　　明</span><span>：</span>
              <span>{{ fishData.result.holiday.tomb_sweeping }}</span>
            </p>
            <p>
              <span>劳　　动</span><span>：</span>
              <span>{{ fishData.result.holiday.labour_day }}</span>
            </p>
            <p>
              <span>端　　午</span><span>：</span>
              <span>{{ fishData.result.holiday.dragon_boat }}</span>
            </p>
            <p>
              <span>中　　秋</span><span>：</span>
              <span>{{ fishData.result.holiday.national }}</span>
            </p>
            <p>
              <span>国　　庆</span><span>：</span>
              <span>{{ fishData.result.holiday.autumn }}</span>
            </p>
            <p>
              <span>周　　末</span><span>：</span>
              <span>{{ fishData.result.holiday.weekend }}</span>
            </p>
            
          </div>
        </a-space>
      </div>
    </a-form>
  </a-modal>
</template>
