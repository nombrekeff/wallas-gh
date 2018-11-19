const randomHexColor = require('random-hex-color')


class Issues {
  create(context, options) {
    const defaultOptions = {
      description: 'Default Wallas Description \n > **By** @' + context.pusher.name,
      title: 'Default Wallas Issue Title',
      labels: ['wallas']
    }
    const issue = context.issue({
      ...defaultOptions,
      ...options,
      labels: [...defaultOptions.labels, ...options.labels]
    })

    return context.github.issues.createIssue(issue)
  }

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