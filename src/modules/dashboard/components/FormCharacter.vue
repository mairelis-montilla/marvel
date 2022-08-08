<template>
  <b-modal hide-footer hide-header v-model="showLocal">
    <b-form @submit.prevent="submit" class="m-2">
      <b-form-group
        id="fiel-name"
        label="Character Name"
        label-for="input-name">
        <b-form-input id="input-name" v-model="character.name" trim @change="this.isRepeatName = false"></b-form-input>
        <div class="error" v-if="$v.$error && !$v.character.name.required">Name is required</div>
        <div class="error" v-if="this.isRepeatName">Name alredy exist</div>
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
          <div class="error" v-if="$v.$error && !$v.character.description.required">Description is required</div>
      </b-form-group>
      <b-form-group
        id="fiel-thumbnail"
        label="Character Thumbnail"
        label-for="input-thumbnail">
          <b-form-input id="input-thumbnail" v-model="character.thumbnail" trim></b-form-input>
          <div class="error" v-if="$v.$error && !$v.character.thumbnail.required">Thumbnail is required</div>
          <div class="error" v-if="$v.$error && !$v.character.thumbnail.url">Thumbnail should be a Url</div>
        
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-button class="common-btn" type="submit">Save</b-button>
        <b-button class="common-btn common-btn--ligth mx-2" @click="$emit('hide')">Cancel</b-button>
      </div>
    </b-form>

  </b-modal>
</template>

<script>
import {required, url} from 'vuelidate/lib/validators'
import moment from 'moment'
import ServicesCharacters from '../Services'

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
      },
      isRepeatName: false
    }
  },
  validations() {
    return {
      character: {
        name: {
          required,
        },
        description:{
          required,
        },
        thumbnail:{
          required,
          url
        }
      }
    }
  },
  computed:{
    showLocal(){
      return this.show
    }
  },
  methods:{
    async submit(){
      this.isRepeatName = false
      this.$v.$touch()
      if (this.$v.$error) return;
      this.character.modified = moment()
      if(this.isEdit){
        this.$emit('onEdit', this.character)
      }
      else{
        this.isRepeatName = await this.searchCharacterByName()
        if(this.isRepeatName) return
        this.character.id = `${this.character.name}${this.generateRandomId()}`
        this.$emit('onCreated', this.character)
      }
    },
    generateRandomId(){
      return Math.random() * (800 - 600 + 1) + 600;
    },
    async searchCharacterByName(){
      try{ 
        const { data } = await ServicesCharacters.getCharacters({name: this.character.name})
        return data.data.results.length > 0
      }catch(err){
        console.err(err)
      }
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