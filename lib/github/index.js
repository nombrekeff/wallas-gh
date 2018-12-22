module.exports = {
  labels: new (require('./labels'))(),
  issues: new (require('./issues'))(),
  releases: new (require('./releases'))(),
  comments: new (require('./comments'))(),
  GithubPluginBase: new (require('./base'))(),
}