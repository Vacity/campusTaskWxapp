Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {}
        },
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        },
    },

  methods: {
    clickExtra() {
      this.triggerEvent('clickExtra', this.data, this.data)
    }
  }
});
