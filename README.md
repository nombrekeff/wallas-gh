<!-- Links -->
[rules]:  
[probot-repo]: https://github.com/probot/probot

# better-issues

> A GitHub App built with [Probot][probot-repo] that enhances issue management

## Motivation
I usually work with tags in my projects, and relly heavilly on labels for managing stuff, and always come with the idea of automatic closing of labels based on some [rules][rules].  
Lets say our project is planing on releasing version `v2.0.0`, so all feature request and bug fixes that are included in that version will have the label `v2.0.0`.  
Then when version is released you must close all those issues manually, or done in the moment of fixing... but I usually prefer to close them when version is released.  
This comes to help that specific problem.  

## Setting up



## Contributing

If you have suggestions for how better-issues could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Setup 

```sh
# clone
git clone git@github.com:nombrekeff/better-issues.git

# Install dependencies
npm install

# Run the bot
npm start
```

## License

[ISC](LICENSE) © 2018 nombrekeff <manoloedge96@gmail.com>
