const randomHexColor = require('random-hex-color')


class Labels {
  create(context, options) {
    const defaultOptions = {
      color: randomHexColor().replace('#', ''),
      description: '',
      name: 'label'
    }
    const label = context.issue({
      ...defaultOptions,
      ...options
    })

    return context.github.issues.createLabel(label)
  }

  edit(context, options) {
    const defaultOptions = {
      color: randomHexColor().replace('#', ''),
      description: '',
      name: 'label'
    }
    const label = context.issue({
      ...defaultOptions,
      ...options
    })

    return context.github.issues.editLabel(label)
  }

  delete() {

  }
}

module.exports = Labels