[gh-events]: https://developer.github.com/webhooks/#events 


# Wallas # under-development
[![Version](https://img.shields.io/github/package-json/v/nombrekeff/wallas-gh.svg)](https://github.com/nombrekeff/wallas-gh)
[![Build Status](https://travis-ci.com/nombrekeff/wallas-gh.svg?branch=master)](https://travis-ci.com/nombrekeff/wallas-gh)
[![License](https://img.shields.io/github/license/nombrekeff/wallas-gh.svg)]()

:octocat: A github automation utility, to help your develpoment process.

> ### NOTICE: 
> I've stopped development because GH Actions where released and mostly makes Wallas Obsolete, I will leave the repo as is. Maybe somebody can take something out of it.


**Overview**
```yml
sender: nombrekeff

on_push:                   
  - match:         
      branch: master
      sender: <sender>
    do:
      - create:
          what: issue
          title: A test issue
          body: A test issue **by** @{payload.sender.login}
          labels: 
            - bug
            - duplicate
```

## Index
  - [Description](#description)
  - [Events](#events)
  - [Matchers](#matchers)
  - [Actions](#actions)
  - [Functions](#functions)
  - [Variables](#variables)
  <!-- - [Posibilities](#posibilities) -->

## Description
Hey there ✌️, let me explain a bit what **wallas** is,  
Basicaly it's a tool to help you automate github tasks, 
like **autoclosing issues**, **autoasigning issues**, **automatic releases** to name a few. Check [this](#posibilities) list for a more in depth look at all the posibilities. 

It's all configured from a **YAML** config file that lives at `.github/wallas.yml` in your project, where you will configure a series of [Events](#events) and [Actions](#actions).  
Here is a basic example: 
```yml
# on create event check if ref is a tag
# if so, create a new label for that tag
on_create:
  - match:
      ref: tag
    do: 
      - create: 
          what: label 
          name: "@{payload.ref.tag_name}"
          color: ffddee
```


## Events
Events are the main part of the automation cycle, and are the first thing you will define in your config file. 
You can only define each event once in your config but each event can have multiple [actions](#actions). 

| name             | description                                                                                                                                                                                                                |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `on_push`          | Triggered on a push to a branch. Branch pushes and repository tag pushes also trigger webhook `push`  check github [events][gh-events] for more info on how they work.                                                     |
| `on_label`         | Triggered when a repository's label is created, edited, or deleted.                                                                                                                                                        |
| `on_create`        | Represents a created repository, branch, or tag.                                                                                                                                                                           |
| `on_delete`        | Represents a deleted branch or tag.                                                                                                                                                                                        |
| `on_fork`          | Triggered when a user forks a repository.                                                                                                                                                                                  |
| `on_issues`        | Triggered when an issue is `opened` , `edited` , `deleted` , `transferred` , `closed` , `reopened` , `assigned` , `unassigned` , `labeled` , `unlabeled` , `milestoned` , or `demilestoned` .                              |
| `on_issue_comment` | Triggered when an issue comment is created, edited, or deleted.                                                                                                                                                            |
| `on_pull_request`  | Triggered when a pull request is assigned, unassigned, labeled, unlabeled, opened, edited, closed, reopened, or synchronized. Also triggered when a pull request review is requested, or when a review request is removed. |
| `on_release`          | Triggered when a release is published.                                                                                                                                                                            |

> **NOTICE**
> If you are looking for a specific event and its not in the list, please leave an issue and I will add it as soon as posible.  
> _Make sure you check github [event list][gh-events] to make sure it can be handled_  

#### Example:
```yml
on_push:
  ...
on_delete:
  ...
on_issues:
  # List of matchers, see Matching further down
  - match:
      status: opened
    do:
      - create:
          what: issue_comment
          body: Hey thanks for leaving an issue, we will check it!
```

## Matchers
Matchers are the way of evaluating properties within the event.  
Lets say we want to check if the pushed branch is **"release"**, for that we would do:
```yml
on_push:
  - match:
      branch: release
    do:
      # List of actions, see Actions further down for more info
      - create: release latest
```
1. First we listen for event `on_push`
2. Then we add a matcher that checks if pushed ref is a release
3. Then we set the action we want to perform if matcher is truthy

### Available Matchers
All matchers accept a series of checks defined below:

Available matchers:
  * `branch`
  * `commit`
  * `ref`
  * `owner`
  * `branch`
  * `status` [`opened` , `edited` , `deleted` , `transferred` , `closed` , `reopened` , `assigned` , `unassigned` , `labeled` , `unlabeled` , `milestoned` , or `demilestoned`]
  * `body`


<!-- Matchers for `on_issues`:
  * `status` one of: [`opened` , `edited` , `deleted` , `transferred` , `closed` , `reopened` , `assigned` , `unassigned` , `labeled` , `unlabeled` , `milestoned` , or `demilestoned`]

#### Available Checks
  * `is` `<any>` checks if the value is exactly what is passed 
  * `matches` `<string>` checks if the value matches the pattern passed 
  * `one_of` `<any[]>` checks if the one of the values match 
  * `all_of` `<any[]>` checks if the all of the values match 
  * `some_of` `<any[]>` checks if the some of the values match  -->





## Actions
Actions are the way of telling wallas what to do, for example **create an issue**, **reply to an issue comment**, **etc**.
#### `create`
  - `label   <label_opts>`
  - `issue   <issue_opts>`
  - `tag     <tag_opts>`
  - `release <release_opts>`
#### `delete`
  - `label   <label_opts>`
  - `issue   <issue_opts>`
  - `tag     <tag_opts>`
  - `release <release_opts>`
#### `edit`
  - `label   <label_opts>`
  - `issue   <issue_opts>`
  - `tag     <tag_opts>`
  - `release <release_opts>`

## Functions
Inside you `wallas.yml` config file you can also create a set of functions for reducing repetition. Wich can be used as actions inside a `Filter.do` statement. Here is a little example:

```yml
defs: 
  # Function definitions
  createTag:
    # Series of actions/commands
    - create: tag $arg1
    # or
    - create: 
        what: tag 
        name: $arg1 
        # or 
        name: $name 

...
  do: 
    - createTag:
        - tag-name
        # or
        name: tag-name

```


## Variables
You can also set some variables wich can be used anywhere a **String** is expected, by placing inside `<>`.
Here is an example:
```yml 
name:    test-project
version: v0.0.1

...
  what: <name>
```

## Contributing

If you have suggestions for how **wallas** could be improved, or want to report a bug, [open an issue]()! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Setup 

```sh
# clone
git clone git@github.com:nombrekeff/wallas.git

# Install dependencies
npm install

# Run the bot
npm start
```

## License
[ISC](LICENSE) © 2018 nombrekeff <manoloedge96@gmail.com>
