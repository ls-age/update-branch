# @ls-age/update-branch

> Tired of running `git merge origin/master` all the time?

[![CircleCI](https://circleci.com/gh/ls-age/update-branch.svg?style=svg)](https://circleci.com/gh/ls-age/update-branch)

## Motivation

Updating feature branches or branches created by tools like greenkeeper from master can be a real pain when maintaining a large number of repos. The *update-branch* tool does just this: Update a branch from another.

## Installation

With node >= 10 installed run `npm i -g @ls-age/update-branch` or use directly via *npx*.

## Usage

### Command line interface

**Note: Use `npx @ls-age/update-branch` instead of `update-branch` if you want to run it via *npx*.**

In most cases you'll just run `update-branch update`, which update your current branch from *origin/master*.

```
usage: update-branch update [-h] [--branch TARGET] [--from SOURCE]
                            [-m MESSAGE] [--no-fetch]


Updates a branch

Optional arguments:
  --branch TARGET       The branch to update. Defaults to the currently
                        active branch.
  --from SOURCE         The branch to update from. The default value is
                        "master".
  -m, --message MESSAGE The merge commit message. The default value is
                        "chore: Update from SOURCE".
  --no-fetch            Do not fetch changes.

Global arguments:
  -h, --help            Show help message and exit.
  --verbose             Enable additional logging
  -S, --silent          Suppress all logging
  -L, --log-level LEVEL Set the log level
```

## API

**Coming soon**

> Check out the source code in the meantime.
