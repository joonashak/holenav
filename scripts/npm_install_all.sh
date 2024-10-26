#!/bin/bash

# Install NPM modules for all projects.

# List projects here by their folder name.
projects=(
  ""
  "web"
  "docs"
  "server"
)

project_root=$(pwd)

function install_npm_modules {
  project_name=$1
  dir="${project_root}/${project_name}"

  cd $dir
  npm ci
}

for project in ${projects[@]}; do
  install_npm_modules $project
done
