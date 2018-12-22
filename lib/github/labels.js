const randomHexColor = require('random-hex-color')
const varHelper = require('../utils/vars-helper')


class Labels {
  create(context, options, vars = {}) {
    const defaultOptions = {
      color: randomHexColor().replace('#', ''),
      description: '',
      name: 'label'
    }
    options = varHelper.replaceVars(context, options, vars)

    const label = context.issue({
      ...defaultOptions,
      ...options
    })

    return context.github.issues.createLabel(label)
  }

  edit(context, options, vars = {}) {
    options = varHelper.replaceVars(context, options, vars)
    const label = context.issue({
      ...options
    })

    return context.github.issues.editLabel(label)
  }

  delete() {

  }
}

module.exports = Labels