<template>
  <div id="app">
    <div class="centerFlex">
      <div class="events_container size0">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size0" style="flex-grow: 4">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size0">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size0">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size0">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size1">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size2">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size3">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size1">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size3">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size1">
        <Ribbon :events="getRandomEvents()"/>
      </div>

      <div class="events_container size2">
        <Ribbon :events="getRandomEvents()"/>
      </div>
    </div>


  </div>
</template>

<script>
import Ribbon from "./Ribbon"
import {events} from "./mockdata"


export default {
  name: 'App',
  components: {
    Ribbon
  },

  //TODO
  // change size of containers
  methods: {
    getRandomEvents(){
      let resultArray = []
      let length = events.length
      let numberOfEvents = Math.floor(((Math.random() + 1) * 2) -1)

      for(let i = 0; i<=numberOfEvents; i++){
        let randomEvent = Math.floor((Math.random() * length-1) + 1)
        resultArray.push(events[randomEvent])
      }

      return resultArray
    }
  },
  data () {
    return {
      events: events
    }
  }
}
</script>

<style>
.events_container{
  border: solid lightgray;
  border-radius: 5px;
  margin: 4px;
  position: relative;
}

.size0{
  width: 100px;
  height: 100px;
}

.size1{
  width: 200px;
  height: 200px;
}

.size2{
  width: 120px;
  height: 200px;
}

.size3{
  width: 300px;
  height: 300px;
}

.centerFlex {
  align-content: stretch;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  margin: 2% 25%;
  flex-wrap: wrap;
}
</style>
