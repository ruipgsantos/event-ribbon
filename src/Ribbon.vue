<template>
    <div v-if="events">
        <!--RIBBONS-->
        <div @mouseover="onMouseOverRibbon(index, $event)"
            @mouseleave="onMouseLeaveRibbon(index)"
        v-for="(myEvent, index) in events" :key="index"
        class="ribbon-look" :style="{top: getNewRibbonPosition(index) + 'px',
        'background-color': getEventColor(myEvent.id), 'z-index': getZIndex(events.length, index)}">
            <div style="margin-left: 5px" v-if="index===0">
              <div class="main-text">{{myEvent.text}}</div>
              <div class="sub-text">{{myEvent.subtext}}</div>
            </div>
        </div>

        <!--POPOVER ELEMENT-->
        <transition name="pop">
          <div v-if="events && events.length > 0" v-show="popover.isPoppedOver || popover.isBeingHovered" @mouseenter="popoverEnterHover"
          @mouseleave="popoverLeaveHover" class="ribbon-popover disable-select"
          :style="{width: popover.width + 'px', left: popover.x+'px', top: popover.y+'px'}">
            <div v-for="(myEvent, index) in events" :key="index" class="popover-event-container"  style="position: relative"  :style="{'z-index': getZIndex(events.length, index*-1)}" >
              <router-link class="popover-inner-container" :style="{'background-color': getEventColor(myEvent.id)}" :to="myEvent.clickRoute || '/'" tag="div">
                <div align-v="center" class="popover-main-text-container" >
                  <div cols="12">
                      <div class="popover-text popover-main-text">{{myEvent.text}}</div>
                    </div>
                </div>
                <div align-v="center">
                  <div cols="12" class="popover-text popover-sub-text">{{myEvent.subtext}}</div>
                </div>
                  <div align-v="center">
                  <!--div cols="12"><MarqueeText @mouseenter="marqueePaused=true" @mouseleave="marqueePaused=false" :paused=marqueePaused class="popover-text popover-description-text">{{myEvent.description}}</MarqueeText></div-->
                  <marquee>{{myEvent.description}}</marquee>
                </div>
              </router-link>
            </div>
          </div>
        </transition>

    </div>
</template>

<script>
import ribbonstore from './ribbonstore.js'
import marquee from './Marquee'

// TODO:
// -change order of ribbon if the event has already been displayed (may be tricky, as events exist in the store througout the whole application in memory)
// maybe save a state of exposure?
// -make everything responsive!! (size of containers may change a lot)
export default {
  components: {
    marquee
  },
  props: {
    // array should contain objects with:
    // -id
    // -text
    // -subtext
    // -description
    // -clickRoute
    events: Array,
    ribbonColor: {
      type: Object,
      validator: (ribboncolor) => {
        return (!ribboncolor.saturation && !ribboncolor.value) ||
        (!isNaN(ribboncolor.saturation) && !isNaN(ribboncolor.value))
      },
      default: () => {
        return {
          saturation: 0.3,
          value: 0.90
        }
      }
    }
  },
  methods: {
    getEventColor (eventId) {
      const color = ribbonstore.getEventColor(eventId,
        this.ribbonColor.saturation,
        this.ribbonColor.value)

      return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'
    },
    popoverEnterHover () {
      this.popover.isBeingHovered = true
      this.marqueePaused = true
    },
    popoverLeaveHover () {
      this.popover.isBeingHovered = false
      this.popover.isPoppedOver = false
      this.marqueePaused = false
    },
    onMouseOverRibbon (index, event) {
      const currentElementPos = this.$el.getBoundingClientRect()

      if (this.isPoppedOver) { return }

      this.popover.isPoppedOver = true

      this.popover.x = event.clientX - currentElementPos.x - this.popover.width / 3
      this.popover.y = event.clientY - currentElementPos.y
    },
    onMouseLeaveRibbon () {
      if (!this.popover.isBeingHovered) {
        this.popover.isPoppedOver = false
      }
    },
    getZIndex (eventNumber, index) {
      return eventNumber - index
    },
    getNewRibbonPosition (index) {
      return this.ribbonPosition + index * 8
    }
  },
  data () {
    return {
      ribbonPosition: 30,
      popover: {
        isBeingHovered: false,
        isPoppedOver: false,
        x: 0,
        y: 0,
        width: 245
      },
      marqueePaused: false
    }
  },
  created () {
    // if events in event array have no id,
    // provide a new generated id for each one to manage the colors correctly
    if (this.events && Array.isArray(this.events)) {
      const existingEvents = []

      this.events.forEach((event, index, object) => {
        // do not allow repeating events
        if (existingEvents.indexOf(event.id) !== -1) {
          object.splice(index, 1)
        }

        // set a generated id if there is none
        if (!event.id) {
          event.id = ribbonstore.getNewEventId()
        } else {
          existingEvents.push(event.id)
        }
      })
    }
  }
}
</script>

<style scoped>
div{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: white;
}

.popover-main-text{
  font-size: 20px;
  margin-bottom: -5px;
  font-weight: 800;
}

.popover-inner-container{
  flex-direction: column;
  border-radius: 5px;
}

.ribbon-look{
    position: absolute;
    top: 30px;
    width: 100%;
    font-weight: 700;
    height: 40%;
}

.main-text{
  font-weight: 900;
}

.sub-text{
  font-size: 14px;

  font-weight: 500;
  font-style: italic;
}

.ribbon-popover{
  background-color: white;
  position: relative;
  z-index: 10;
  border-radius: 5px;
}

.popover-text{
  margin-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popover-description-text{
  height: 20px;
}

.popover-inner-container:hover{
  cursor: pointer;
  transform: translate(1.5px, -3px);
  transition: transform 300ms;
  transition-timing-function: ease-in;
  font-style: italic;
}

.popover-sub-text{
  font-size: 12px;
  font-weight: 600;
}

.event-router-link{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.popover-inner-container{
  border: 1px solid lightgray
}

.pop-enter-active, .pop-leave-active {
  transition: all .3s ease;
}

.pop-enter, .pop-leave-to {
  transform: translate(0, -5px);
  opacity: 0;
}

.disable-select{
   -ms-user-select:none;
   -moz-user-select:none;
   -webkit-user-select:none;
   -webkit-touch-callout: none;
   -khtml-user-select: none;
    user-select:none;
}

</style>
