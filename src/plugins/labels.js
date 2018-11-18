const probot = require('probot')

module.exports = class Labels {

  /**
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   */
  constructor(robot, context) {
    this.github = context.github
    this.repo = context.repo
  }

  find() {
    return this.github.issues.getLabels(this.wrapAttrs({})).then(res => res.data)
  }

  comparator(existing, attrs) {
    return existing.name === attrs.name || existing.name === attrs.oldname
  }

  changed(existing, attrs) {
    return attrs.oldname === existing.name || existing.color !== attrs.color
  }

  update(existing, attrs) {
    attrs.oldname = attrs.oldname || attrs.name
    return this.github.issues.updateLabel(this.wrapAttrs(attrs))
  }

  add(attrs) {
    return this.github.issues.createLabel(this.wrapAttrs(attrs))
  }

  remove(existing) {
    return this.github.issues.deleteLabel(this.wrapAttrs({ name: existing.name }))
  }

  wrapAttrs(attrs) {
    return Object.assign({}, attrs, this.repo, { headers: previewHeaders })
  }
}