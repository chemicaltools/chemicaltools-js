workflow "Test and release" {
  on = "push"
  resolves = ["Borales/actions-yarn@master-4"]
}

action "Borales/actions-yarn@master" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}

action "Borales/actions-yarn@master-1" {
  uses = "Borales/actions-yarn@master"
  needs = ["Borales/actions-yarn@master"]
  args = "test"
}

action "Borales/actions-yarn@master-2" {
  uses = "Borales/actions-yarn@master"
  needs = ["Borales/actions-yarn@master-1"]
  args = "build"
  secrets = ["BUNDLESIZE_GITHUB_TOKEN"]
}

action "Borales/actions-yarn@master-3" {
  uses = "Borales/actions-yarn@master"
  needs = ["Borales/actions-yarn@master-2"]
  args = "coverage"
  secrets = ["CODECOV_TOKEN"]
}

action "Borales/actions-yarn@master-4" {
  uses = "Borales/actions-yarn@master"
  needs = ["Borales/actions-yarn@master-3"]
  args = "exec semantic-release"
  secrets = ["GH_TOKEN", "NPM_TOKEN"]
}
