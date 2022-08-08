<template>
  <b-overlay :show="show" rounded="lg">
    <div class="d-flex flex-column justify-center aling-items-center m-4">
      <search-bar @onSearch="search"></search-bar>
      <b-card-group columns>
        <card-item v-for="(character, index) in characters" :character="character" :key="`card-character-${character.id}-${index}`"/>
      </b-card-group>
    </div>
  </b-overlay>
</template>

<script>
import ServicesCharacters from '../Services'
import CardItem from '../components/Card'
import SearchBar from '../components/SearchBar'

export default{
  name: 'MarvelList',
  components: {
    CardItem,
    SearchBar
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
      show: false
    }
  },
  methods:{
    async loadCharacters(){
      try{
        this.show = true
        const {data} = await ServicesCharacters.getCharacters(this.params)
        this.characters = this.characters.concat(data.data.results)
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