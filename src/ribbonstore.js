import colors from './colorutils'

let defaultEventId = 0

var ribbonStore = {

  colorByEvent: {},

  /**
   * Returns a random color that will be associated with the provided event Id
   * If event Id is undefined, we'll just assume every call is a different Id
   *
   * @param {*} eventId
   * @param {*} saturation
   * @param {*} value
   */
  getEventColor (eventId, saturation, value) {
    if (!this.colorByEvent[eventId]) {
      const color = colors.generateRandomColor(saturation, value)

      this.colorByEvent[eventId] = color
    }

    return this.colorByEvent[eventId]
  },

  /**
   * returns a new incremental id for event   *
   */
  getNewEventId () {
    return defaultEventId++
  }
}

export default ribbonStore
