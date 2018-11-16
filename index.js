module.exports = app => {
  // Your code here
  // app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    app.log('Issue opened');

    const comment = context.issue({ body: 'Thanks for opening this issue! \nWe will check it ASAP.' });

    context.github.issues.createComment(comment);
    context.github.issues.addLabels(labels);
  })

  app.on('create', async context => {
    if (context.payload.ref_type !== 'tag') return;

    app.log('Tag created: ', context.payload.ref);
    const label = context.issue({
      name: context.payload.ref,
      description: 'A label for issues related to version/tag: ' + context.payload.ref,
      color: '30b227'
    });

    context.github.issues.createLabel(label);
  });

  // app.on('issues.labeled', async ({ issue, label }) => {
  //   app.log(label.name + ' label added to ' + issue.id + '(' + issue.title + ')')
  // })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
