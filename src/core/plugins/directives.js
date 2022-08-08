import Vue from "vue";
import moment from "moment";

const dateFormat = {
  inserted: dateFormatFun,
  update: dateFormatFun
};

function dateFormatFun (el, binding){
  if(binding.value != null){
    const momentUTCDate = moment.utc(binding.value).local();
    el.innerHTML = momentUTCDate.format('DD-MM-YYYY');
  }
}

Vue.directive('dateFormat', dateFormat);