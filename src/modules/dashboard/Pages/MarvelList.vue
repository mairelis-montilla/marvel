<template>
  <div class="row">
    <div class="col-md-12">
      <card-item/>
    </div>
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
  methods:{
    async loadCharacters(){
      try{
        const res = await ServicesCharacters.getCharacters()
        console.log(res)
      }catch(err){
        console.error(err)
      }
    }
  },
  created(){
    //this.loadCharacters()
  }

}
</script>

<style>
</style>