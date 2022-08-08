<template>
  <b-card
    :title="character.name"
    :img-src="character.thumbnail"
    img-alt="character thumbnail"
    img-top
    tag="article"
    img-height="220px"
    img-width="18rem"
    style="min-width: 18rem;max-width: 18rem;"
    class="m-4">
    <b-card-sub-title class="mb-2">Last modified: <span v-date-format="character.modified"></span></b-card-sub-title>
    <b-card-text>
      {{character.description ? character.description : `${character.name} don't have any description`  }}
    </b-card-text>

    <b-button @click="$emit('editCharacter', character)" class="common-btn">Edit</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'card-item',
  props:{
    character: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="stylus" scoped>
@import "~@/core/styles/variables.styl"
.card
  transition: transform .2s
  &:hover
    transform: scale(1.1); 
    border 2px solid color-red-1

</style>