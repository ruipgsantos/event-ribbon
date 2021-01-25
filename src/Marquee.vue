<script>
export default {
  name: 'marquee',
  render: function (createElement) {
    const text = createElement('p', {
      class: ['text',
        this.paused || this.locked
          ? 'paused'
          : undefined
      ],
      style: {
        animationDuration: `${this.speed}s`,
        animationDirection: this.reverse ? 'reverse' : undefined
      },
      ref: 'text_el'

    }, [this.$slots.default])

    const container = createElement('div', Array(this.repeat).fill(text))

    return createElement('div', { class: ['main'], on: { mouseenter: this.onMouseEnter, mouseleave: this.onMouseLeave }, ref: 'main_el' }, [container])
  },
  props: {
    speed: {
      type: Number,
      required: false,
      default: 10
    },
    reverse: String
  },
  data () {
    return {
      paused: true,
      locked: false,
      repeat: 1,
      initialized: true
    }
  },
  methods: {
    onMouseEnter: function () {
      this.paused = false
    },
    onMouseLeave: function () {
      this.paused = true
    },
    isOverflown () {
      if (this.$refs.text_el.scrollWidth > this.$refs.main_el.clientWidth) {
        this.repeat = 2
      } else {
        this.locked = true
      }
    }
  },
  created () {
    this.initialized = false
  },
  updated () {
    if (!this.initialized) {
      this.isOverflown()
    }

    this.initialized = true
  }
}

</script>

<style scoped>

  .main{
    overflow: hidden;
    white-space: nowrap;
    height: 40px;
    margin-left: 10px;
  }

  .text {
    animation-direction: normal;
    animation-name: animation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    float: left;
  }

  .text.paused  {
    animation-play-state: paused
  }

@keyframes animation {
        0% { transform:translateX(0); }
        100% { transform:translateX(-100%); }
    }
</style>
