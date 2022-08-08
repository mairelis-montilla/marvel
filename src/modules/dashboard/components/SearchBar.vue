<template>
  <b-form-group :class="`col-12`">
    <b-form @submit.prevent="search" inline>
      <input type="text" :class="`form-control mb-3 col-12`" v-model="keyword"
             :placeholder="placeholder" @blur="search">
      <b-button v-if="keyword && keyword.length > 0" variant="default" @click="onClear"
                aria-label="searchBarClear"
                :class="`common-close-button search-bar__close-button`">
      </b-button>
    </b-form>
  </b-form-group>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
		classes: String,
		formClasses: String,
		placeholder: {
			type: String,
			default: "Search By Name"
		},
		defaultVal: {
			type: String,
			required: false,
		},
  },
	data() {
		return {
			keyword: null,
			prevKeyword: null,
		}
	},
	methods: {
		search(event) {
      if (event && event.relatedTarget && event.relatedTarget.className.includes('search-bar__close-button'))
				return;

			if (this.prevKeyword !== this.keyword) {
				this.$emit("onSearch", this.keyword);
				this.prevKeyword = this.keyword;
			}
		},
		onClear() {
			this.keyword = null;
			this.search();
		},
	},
	created(){
		this.keyword = this.defaultVal;
		this.prevKeyword = this.defaultVal;
	},
}
</script>

<style scoped lang="stylus">
</style>
