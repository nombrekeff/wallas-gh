module.exports = app => {
  // Your code here
  // app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    app.log('Issue opened')

    const comment = context.issue({ body: 'Thanks for opening this issue! \nWe will check it ASAP.' })
    const labels = context.issue({ labels: [{ name: 'bug' }] })

    context.github.issues.createComment(comment)
    context.github.issues.addLabels(labels)
  })

  app.on('tags.create', async context => {
    app.log('tag create', context)
  })

  // app.on('issues.labeled', async ({ issue, label }) => {
  //   app.log(label.name + ' label added to ' + issue.id + '(' + issue.title + ')')
  // })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
