<template>
  <b-form-group class="col-md-12">
    <b-form @submit.prevent="search" inline>
      <input type="text" class="search-bar__input" v-model="keyword"
             placeholder="Search By Name" @blur="search">
      <b-button v-if="keyword && keyword.length > 0" variant="default" @click="onClear"
                aria-label="searchBarClear"
                class="common-close-button search-bar__close-button">X
      </b-button>
    </b-form>
  </b-form-group>
</template>

<script>
export default {
  name: "SearchBar",
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
	}
}
</script>

<style scoped lang="stylus">
@import "~@/core/styles/variables.styl"
	.search-bar__input
		border-radius 5px 
		border 1px solid black
		outline: none
		width: 84%
		padding: 0.5rem
		margin-left: 5rem
		:hover, :focus, :focus-visible
			border 1px solid black
			outline: none
	.search-bar__close-button
		margin-left -40px
		margin-top -4px
		font-weight: bold
		color: color-red-1
		cursor pointer
		z-index 1

</style>
