module.exports = {
  labels: new (require('./labels'))(),
  issues: new (require('./issues'))(),
  releases: new (require('./releases'))(),
  GithubPluginBase: new (require('./base'))(),
}