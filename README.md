## Longshoreman CLI

You can use the CLI to easily administer a Longshoreman cluster from the command line. The tool talks to the Longshoreman controller server over HTTP.

## Installation

`npm install -g longshoreman`

## Set up

To use the CLI, you'll first have to initialize your Longshoreman configuration file. Run `longshoreman init` to create a credentials file in your home directory. If you don't yet have a controller URL or token, see the [quick start](https://github.com/longshoreman/longshoreman#quick-start) to get started.

## Usage

```bash
Usage: longshoreman [COMMAND] [--app APP] [command-specific-options]

Commands:
init: Interactive configuration
apps: List all applications
apps:add: Add a new application
apps:rm: Remove an application
hosts: List all hosts in the cluster
hosts:add: Add a host to the cluster
hosts:rm: Remove a host from the cluster
instances: List all instances of an application on the cluster
deploy: Deploy an image to the application
envs: Displays all environmental variables for an application
envs:set: Sets an environmental variable for an application
envs:rm: Removes a variable from the application
```

## License

MIT
