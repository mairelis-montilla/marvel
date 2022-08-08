<template>
  <div class="d-flex justify-center aling-items-center m-3">
    <b-card-group columns>
      <card-item v-for="(character, index) in characters" :character="character" :key="`card-character-${character.id}-${index}`"/>
    </b-card-group>
  </div>
</template>

<script>
import ServicesCharacters from '../Services'
import CardItem from '../components/Card'

export default{
  name: 'MarvelList',
  components: {
    CardItem,
  },
  data(){
    return {
      characters: [],
      params: {
        limit: 20,
        offset: 0,
      },
      nameStartsWith: null,
      totalCharacters: null
    }
  },
  methods:{
    async loadCharacters(){
      try{
        const {data} = await ServicesCharacters.getCharacters(this.params)
        data.data.results.forEach((e)=>{
          this.characters.push(e)
        })
        this.params.offset = data.data.offset +data.data.count
        this.totalCharacters = data.data.total
      }catch(err){
        console.error(err)
      }
    },
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = Math.round(document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.loadCharacters()
        }
      }
    },
  },
  created(){
    this.loadCharacters()
    this.scroll()
  }

}
</script>

<style>
</style>