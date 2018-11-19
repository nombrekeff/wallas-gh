const WPEBase = require('./base')
const WFilter = require('./filter')

// <event_name>:
//   - <filter>:
//     ... 
//   - <filter>:
//     ... 
//   - <filter>:
//     ... 

class WEvent extends WPEBase {
  constructor(name, args) {
    super(name, args)

    this.actions = []
    this.filters = []
    this.filterToActionMap = {}

    this.processArgs(args)
  }

  processArgs(args) {
    console.log('procesing args: ', args)

    // Can be array of filters
    if (args.constructor === Array) {
      console.log('args is array')

      for (let filt of args) {
        let name = Object.keys(filt).pop()
        console.log('checking filter: ' + name, filt[name])

        let filter = WFilter.get(name, filt[name])
        this.addFilter(filter)
      }
    }

    // or just an object with a "do" property
    else if (Object.keys(args).some(e => ['do'].includes(e))) {
      console.log('args is single action')

      let filter = new WFilter('*', {})
      this.addFilter(filter)
    } else {
      throw new Error('"args" must be array of filters (branch: { is: "", do: [] }) or a single action (do: [])')
    }
  }

  addFilter(filter) {
    this.filters.push(filter)
    this.actions.push(filter.actions)
    this.filterToActionMap[filter.name] = filter.actions
  }

  dispatch(context) {
    this.filters.forEach(filter => {
      filter.feed(context)
    })
  }

  getGHEvent() {
    return WEvent.eventMap[this.name]
  }

  static exists(name) {
    return WEvent.eventMap[name]
  }
}

WEvent.eventMap = {
  on_push: 'push',
  on_issue: 'issues'
}


module.exports = WEvent