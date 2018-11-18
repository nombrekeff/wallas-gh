const detectNext = require('detect-next-version')
const semver = require('semver')
const probot = require('probot')
const handlebars = require('handlebars')
const randomHexColor = require('random-hex-color')


class Action {
  constructor(name, checks = [], actions = []) {
    this.name = name
    this.checks = checks
    this.actions = actions
  }

  /**
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   */
  perform(robot, context) {

  }
}

class ActionChild {
  constructor(args, name, fn) {
    this.args = args
    this.name = name
    this.fn = fn
  }

  /**
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   */
  perform(robot, context) {
    robot.log('perform ', this.fn)
    return this.fn(context, this.args, robot)
  }
}


const actions = {
  _actions: {},
  _cache: {},
  register(name, fn) {
    this._actions[name] = fn
  },
  get(args, name) {
    return new ActionChild(args, name, this._actions[name]);
  },
  getRepo(context) {
    Object.assign({}, context.repo(), {}, {
      ref: context.payload.head_commit.id,
    })
  },

  /**
   * @param {probot.Context} context 
   */
  async createLabel(context, args, robot) {
    robot.log('Creating tag: ', args);
    const label = context.issue({
      name: args.name,
      description: args.description || ('A label for issues related to version/tag: ' + context.payload.ref),
      color: args.color || randomHexColor().replace('#', '')
    });

    return context.github.issues.createLabel(label);
  },

  /**
   * @param {probot.Context} context 
   */
  async createIssue(context, args, robot) {
    robot.log('Creating issue: ', args);
    const issue = context.issue({
      title: args.title,
      body: args.body + '\n' + '> By @' + context.payload.sender.login,
      labels: args.labels,
      assignees: args.assignees,
      assignee: args.assignee
    });

    return context.github.issues.create(issue);
  }
}

actions.register('version', async (context, args, robot) => {
  // ie: type = patch opt = dev 
  let [incr, opt] = args.split(' ')

  const lastTag = (await context.github.repos.getTags(actions.getRepo(context))).data[0]

  // TODO: Consider what to do when there are no tags. Fallback to npm?
  const currentVersion = lastTag.name.slice(1)
  let nextVersion = null

  nextVersion = semver.inc(currentVersion, incr)

  if (opt) {
    nextVersion += '-' + opt
  }

  robot.log('next version is: ' + nextVersion)

  this._cache.nextVersion = nextVersion
})

actions.register('create', async (context, args = {}, robot) => {

  let what = args.what,
    name = args.name

  if (typeof args === 'string') {
    let spl = args.split(' ')
    what = spl[0]
    name = spl[1]
  }

  robot.log('create', { what, name, args })

  switch (what) {
    case 'issue':
      await actions.createIssue(context, args, robot)
      break
    case 'label':
      const getLabelName = (name) => {
        if (name === 'tag') {
          return context.payload.ref.split('/').pop()
        } if (name === 'owner') {
          return context.payload.sender.login
        } else return name
      }
      name = name.replace(/\{(\w+)\}/g, (orig, cg) => getLabelName(cg))

      robot.log('creating label', name)
      await actions.createLabel(context, { ...args, name }, robot)
  }
})


module.exports = {
  Action,
  ...actions
}

