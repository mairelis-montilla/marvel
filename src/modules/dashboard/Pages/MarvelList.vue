<template>
  <b-overlay :show="show" rounded="lg">
    <page-header></page-header>
    <div class="d-flex flex-column justify-content-center aling-items-center m-4">
      <search-bar @onSearch="search"></search-bar>
      <div class="col-11 d-flex justify-content-end mb-3">
          <b-button class="common-btn" @click="showForm = true">Create New Character</b-button>
      </div>
      <div class="d-flex justify-content-center flex-wrap">
        <card-item v-for="(character, index) in characters" :character="character" :key="`card-character-${character.id}-${index}`" @editCharacter="showFormEditCharacter" />
      </div>
    </div>
    <form-character v-if="showForm" :show="showForm" :isEdit="isEdit" :characterInfo="selectedCharacter" @onEdit="onEdit" @onCreated="onCreated" @hide="hideForm"></form-character>
  </b-overlay>
</template>

<script>
import ServicesCharacters from '../Services'
import CardItem from '../components/Card'
import SearchBar from '../components/SearchBar'
import FormCharacter from '../components/FormCharacter'
import PageHeader from '../components/PageHeader.vue'

export default{
  name: 'MarvelList',
  components: {
    CardItem,
    SearchBar,
    FormCharacter,
    PageHeader
  },
  data(){
    return {
      characters: [],
      params: {
        limit: 20,
        offset: 0,
      },
      nameStartsWith: null,
      totalCharacters: null,
      showForm: false,
      show:false,
      selectedCharacter: {},
      isEdit: false
    }
  },
  methods:{
    async loadCharacters(){
      try{
        this.show = true
        const {data} = await ServicesCharacters.getCharacters(this.params)
        const result = data.data.results.map((e) =>({...e, thumbnail: `${e.thumbnail.path}.${e.thumbnail.extension}`}))
        this.characters = this.characters.concat(result)
        this.params.offset = data.data.offset +data.data.count
        this.totalCharacters = data.data.total
      }catch(err){
        console.error(err)
      }finally{
        this.show = false
      }
    },
    scroll () {
      window.onscroll = () => {
        if(this.totalCharacters === this.characters.length) return
        const bottomOfWindow = Math.round(document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight || Math.round(document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight-1;
        //console.log(Math.round(document.documentElement.scrollTop + window.innerHeight), document.documentElement.offsetHeight)
        if (bottomOfWindow) {
          this.loadCharacters()
        }
      }
    },
    showFormEditCharacter(character){
      this.selectedCharacter = character
      this.isEdit = true
      this.showForm = true
    },
    hideForm(){
      this.selectedCharacter = {}
      this.isEdit = false
      this.showForm = false
    },
    search(term){
      this.nameStartsWith = term
      this.params.offset = 0
      this.characters = []
      if(term){
        this.params['nameStartsWith'] = term
      }
      else{
        delete this.params['nameStartsWith']
      }
      this.loadCharacters()
    },
    onEdit(data){
      this.showForm = false;
      this.show = true;
      const index = this.characters.findIndex((e) => e.id ===data.id);
      this.characters[index] = data;
      this.isEdit = false;
      this.selectedCharacter = {}
      this.show = false;
    },
    onCreated(data){
      this.showForm = false;
      this.show = true;
      this.characters.unshift(data)
      this.show = false;
    }
  },
  created(){
    this.loadCharacters()
    this.scroll()
  }

}
</script>

<style>
</style>