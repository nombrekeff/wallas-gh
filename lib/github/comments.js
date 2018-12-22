const randomHexColor = require('random-hex-color')
const probot = require('probot')
const varHelper = require('../utils/vars-helper')


class Comments {

  /**
   * @param {probot.Context} context 
   * @param {*} options 
   */
  create(context, options, vars = {}) {
    const defaultOptions = {
      body: '',
    }

    options = varHelper.replaceVars(context, options, vars)

    const issue = context.issue({
      ...defaultOptions,
      ...options
    })

    return context.github.issues.createComment(issue)
  }

  /**
   * 
   * @param {probot.Context} context 
   * @param {*} options 
   */
  edit(context, options, vars = {}) {
    options = varHelper.replaceVars(context, options, vars)
    const comment = context.issue({
      ...options
    })

    return context.github.issues.editComment(comment)
  }
}

module.exports = Comments