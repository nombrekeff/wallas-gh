const randomHexColor = require('random-hex-color')
const probot = require('probot')
const varHelper = require('../utils/vars-helper')


class Issues {

  /**
   * @param {probot.Context} context 
   * @param {*} options 
   */
  create(context, options, vars = {}) {
    const defaultOptions = {
      body: 'Default Wallas Description \n > **By** @' + context.payload.sender.login,
      title: 'Default Wallas Issue Title',
      labels: ['wallas']
    }

    options = varHelper.replaceVars(context, options, vars)

    const issue = context.issue({
      ...defaultOptions,
      ...options,
      labels: [...defaultOptions.labels, ...options.labels]
    })

    return context.github.issues.create(issue)
  }

  /**
   * @param {probot.Context} context 
   * @param {*} options 
   */
  comment(context, options, vars = {}) {
    options = varHelper.replaceVars(context, options, vars)
    const issue = context.issue(options)
    return context.github.issues.createComment(issue)
  }

  /**
   * @param {probot.Context} context 
   * @param {*} options 
   */
  addLabels(context, options, vars = {}) {
    options = varHelper.replaceVars(context, options, vars)
    const labels = context.issue(options)
    return context.github.issues.addLabels(labels);
  }

  /**
   * 
   * @param {probot.Context} context 
   * @param {*} options 
   */
  edit(context, options, vars = {}) {
    options = varHelper.replaceVars(context, options, vars)
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