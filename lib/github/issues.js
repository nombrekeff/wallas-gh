const randomHexColor = require('random-hex-color')
const probot = require('probot')
const format = require('string-format')
const varRegExp = /<[\w\d_$]+>/g;
const replace_vars = (vars, m, match) => {
  if (vars[match]) {
    return vars[match]
  } else return ''
}

class Issues {

  /**
   * 
   * @param {probot.Context} context 
   * @param {*} options 
   */
  create(context, options, vars) {
    const defaultOptions = {
      body: 'Default Wallas Description \n > **By** @' + context.payload.sender.login,
      title: 'Default Wallas Issue Title',
      labels: ['wallas']
    }

    if (options.body) {
      options.body = format(options.body, context)
      options.body = options.body.replace(varRegExp, replace_vars.bind(this, vars))
    }
    if (options.title) {
      options.title = format(options.title, context)
      options.title = options.title.replace(varRegExp, replace_vars.bind(this, vars))
    }
    if (options.labels) {
      options.labels.map(l => {
        l = format(l, context)
        l = l.replace(varRegExp, replace_vars.bind(this, vars))
        return l
      })
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