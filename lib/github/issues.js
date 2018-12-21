const randomHexColor = require('random-hex-color')
const probot = require('probot')
const format = require('string-format')

class Issues {

  /**
   * 
   * @param {probot.Context} context 
   * @param {*} options 
   */
  create(context, options) {
    console.log(context.payload.sender);
    const defaultOptions = {
      body: 'Default Wallas Description \n > **By** @' + context.payload.sender.login,
      title: 'Default Wallas Issue Title',
      labels: ['wallas']
    }

    if (options.body) {
      options.body = format(options.body, context)
    }
    if (options.title) {
      options.title = format(options.title, context)
    }
    if (options.labels) {
      options.labels.map(l => format(l, context))
    }

    const issue = context.issue({
      ...defaultOptions,
      ...options,
      labels: [...defaultOptions.labels, ...options.labels]
    })

    return context.github.issues.create(issue)
  }
  /**
   * 
   * @param {probot.Context} context 
   * @param {*} options 
   */
  edit(context, options) {
    const issue = context.issue({
      ...options
    })

    return context.github.issues.editLabel(issue)
  }


  lock(number, locked = true, locked_reason = 'Default Wallas Lock Reason: NONE') {
    return this.edit({
      number,
      locked,
      locked_reason
    })
  }

  close(number) {
    return this.edit({ number, state: 'closed' })
  }

  open(number) {
    return this.edit({ number, state: 'open' })
  }
}

module.exports = Issues