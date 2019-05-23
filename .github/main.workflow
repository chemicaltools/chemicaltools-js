workflow "Test and release" {
  on = "push"
  resolves = ["yarn exec semantic-release"]
}

action "yarn install" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}

action "yarn test" {
  uses = "Borales/actions-yarn@master"
  args = "test"
  needs = ["yarn install"]
}

action "yarn build" {
  uses = "Borales/actions-yarn@master"
  args = "build"
  secrets = ["BUNDLESIZE_GITHUB_TOKEN"]
  needs = ["yarn test"]
  env = {
    GITHUB_REPOSITORY = "chemicaltools-js"
    CI_REPO_OWNER = "njzjz"
    CI_COMMIT_MESSAGE = ""
    GITHUB_SHA = "$CI_COMMIT_SHA"
  }
}

action "yarn coverage" {
  uses = "Borales/actions-yarn@master"
  args = "coverage"
  secrets = ["CODECOV_TOKEN"]
  needs = ["yarn build"]
}

action "yarn exec semantic-release" {
  uses = "Borales/actions-yarn@master"
  args = "exec semantic-release"
  secrets = ["GH_TOKEN", "NPM_TOKEN"]
  needs = ["yarn coverage"]
}
