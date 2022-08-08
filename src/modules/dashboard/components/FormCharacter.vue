<template>
  <b-modal hide-footer hide-header v-model="showLocal">
    <b-form @submit.prevent="submit" class="m-2">
      <b-form-group
        id="fiel-name"
        label="Character Name"
        label-for="input-name">
        <b-form-input id="input-name" v-model="character.name" trim></b-form-input>
      </b-form-group>
      <b-form-group
        id="fiel-description"
        label="Character Description"
        label-for="input-description">
       <b-form-textarea
          rows="3"
          max-rows="6" 
          id="input-description" 
          v-model="character.description"
          trim
        >
        </b-form-textarea>
      </b-form-group>
      <b-form-group
        id="fiel-thumbnail"
        label="Character Thumbnail"
        label-for="input-thumbnail">
        <b-form-input id="input-thumbnail" v-model="character.thumbnail" trim></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-button class="common-btn" type="submit">Save</b-button>
        <b-button class="common-btn common-btn--ligth mx-2" @click="$emit('hide')">Cancel</b-button>
      </div>
    </b-form>

  </b-modal>
</template>

<script>
import moment from 'moment'
export default {
  name: 'FormCharacterModal',
  props:{
    show:{
      type: Boolean,
      default: false
    },
    characterInfo:{
      type: Object,
      default: () => ({}),
    },
    isEdit:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      character: {
        id: null,
        name: null,
        description: null,
        thumbnail: null
      }
    }
  },
  computed:{
    showLocal(){
      return this.show
    }
  },
  methods:{
    submit(){
      this.character.modified = moment()
      if(this.isEdit){
        this.$emit('onEdit', this.character)
      }
      else{
        this.character.id = `${this.character.name}${this.generateRandomId()}`
        this.$emit('onCreated', this.character)
      }
    },
    generateRandomId(){
      return Math.random() * (800 - 600 + 1) + 600;
    }

  },
  created(){
    if(this.isEdit){
      this.character = {...this.characterInfo }
    }
  }

}
</script>

<style>

</style>