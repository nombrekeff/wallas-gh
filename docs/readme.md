# wallas # in-development
:octocat: A github automation utility, to help your develpoment process.

**Overview**
```yml
vars:
  color: ff2244
  
defs:
  createLbl: 
     - create: 
        what: label
        name: $1
        color: <color>
        
on_push:
  - branch:
      matches: dev
      do: 
        - create: 
            what: tag
            type: patch
            suffix: dev

on_tag:
  do: 
    - createLbl: latest
```

## Index
  - [Description](#initial-description)
  - [Events](#events)
  - [Filtering](#filtering)
  - [Actions](#actions)
  - [Functions](#functions)
  - [Variables](#variables)
  - [Posibilities](#posibilities)

## Description
Hey there ✌️, let me explain a bit what **wallas** is,  
Basicaly it's a tool to help you automate github tasks, 
like **autoclosing issues**, **autoasigning issues**, **automatic releases** to name a few. Check [this](#posibilities) list for a more in depth look at all the posibilities. 

It's all configured from a **YAML** config file that lives at `.github/wallas.yml` in your project, where you will configure a series of [Events](#events) and [Actions](#actions).  
Here is a basic example: 
```yml
# 
on_create:
  - ref: 
      is: tag
      do: 
        - create: 
            what: label 
            name: {tag.version}
            color: 
```


## Events
Events are the main part of the automation cycle, and are the first thing you will define in your config file. You can only define each event once in your config but each event can have multiple actions based on some [filters](#filtering).

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

> **NOTICE**
> If you are looking for a specific event and its not in the list, 
> please leave an issue and I will added as soon as posible.
> _Make sure you check github [event list][gh-events] to make sure it can be handled_

#### Example:
```yml
on_push:
  ...
on_delete:
  ...
on_issues:
  # List of filters, see Filtering further down
  - status:
      is: opened
      do:
        - create:
            what: issue_comment
            body: Hey thanks for leaving an issue, we will check it!
```

## Filtering
Filtering is the way of deciding what to do when an event happens, could be compared with an `if` statement.  
Lets say we want to create a release when we push to branch `release`, we could create the following filter:
```yml
on_push:
  - branch:
      is_oneof: 
        - release
        - release-candidate
      do:
        # List of actions, see Actions further down for more info
        - create: release latest
        # or
        - create:
            what: release
            version: latest
```
1. First we listen for event `on_push`
2. Then we set a filter for `branch`
3. Wich check if it is `release`
4. We set `do`, wich will be processed if check passes  
  4.1. Inside we tell to create a new release for latest version

### Available Fiters
All filters accept a series of checks defined below:

Global filters:
  * `branch`
  * `commit`
  * `ref`
  * `owner`
  * `branch`

Filters for `on_issues`:
  * `status` one of: [`opened` , `edited` , `deleted` , `transferred` , `closed` , `reopened` , `assigned` , `unassigned` , `labeled` , `unlabeled` , `milestoned` , or `demilestoned`]

#### Available Checks
  <!-- * `is` `<any>` checks if the value is type (if filter accepts a type) -->
  * `is` `<any>` checks if the value is exactly what is passed 
  * `matches` `<string>` checks if the value matches the pattern passed 
  * `one_of` `<any[]>` checks if the one of the values match 
  * `all_of` `<any[]>` checks if the all of the values match 
  * `some_of` `<any[]>` checks if the some of the values match 





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
vars: 
  name:    test-project
  version: v0.0.1

...
  what: <name>
```


## Posibilities

[gh-events]: https://developer.github.com/webhooks/#events 
<!-- Wallas -->
<!-- Wilbur -->

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
