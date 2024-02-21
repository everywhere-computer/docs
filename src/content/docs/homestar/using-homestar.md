---
title: Using Homestar
description: Getting started with Homestar
---

## Install

See [Setup Your Local Node](../../getting-started/setup-your-local-node#install-homestar) for instructions on installing Homestar.

## Help

The `--help` option displays a quick reference at any command level.

At the top level, `--help` displays a high-level summary of all commands.

```
$ homestar --help
Usage: homestar <COMMAND>

Commands:
  start  Start the Homestar runtime
  stop   Stop the Homestar runtime
  ping   Ping the Homestar runtime to see if it's running
  run    Run an IPVM-configured workflow file on the Homestar runtime
  node   Get node identity / information
  info   Get Homestar binary and other information
  help   Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

## Start the runtime

The `homestar start` command starts a Homestar node.

```
$ homestar start --help
Start the Homestar runtime

Usage: homestar start [OPTIONS]

Options:
      --db <DATABASE_PATH>  Database path (SQLite) [optional] [env: DATABASE_PATH=] [default: homestar.db]
  -c, --config <CONFIG>     Runtime configuration file (.toml) [optional]
  -d, --daemonize           Daemonize the runtime
      --daemon_dir <DIR>    Directory to place daemon file(s) [default: /tmp]
  -h, --help                Print help
```

The runtime can be provided a configuration file and an SQLite database file. Homestar will create the database file if it does not exist.

```sh
homestar start -c settings.toml --db my.db
```

See our [configuration guide](configuration) for information about node configuration.

## Ping

The `homestar ping` command pings a Homestar node to check that it is up.

```
$ homestar ping --help
Ping the Homestar runtime to see if it's running

Usage: homestar ping [OPTIONS]

Options:
      --host <HOST>        Homestar RPC host [default: ::1]
  -p, --port <PORT>        Homestar RPC port [default: 3030]
      --timeout <TIMEOUT>  Homestar RPC timeout [default: 60s]
  -h, --help               Print help
```

## Run a workflow

The `homestar run` command requests a workflow run from a Homestar node.

```
$ homestar run --help
Run an IPVM-configured workflow file on the Homestar runtime

Usage: homestar run [OPTIONS] <FILE>

Arguments:
  <FILE>  IPVM-configured workflow file to run.
          Supported:
            - JSON (.json)

Options:
      --host <HOST>        Homestar RPC host [default: ::1]
  -p, --port <PORT>        Homestar RPC port [default: 3030]
      --timeout <TIMEOUT>  Homestar RPC timeout [default: 60s]
  -n, --name <NAME>        Local name given to a workflow (optional)
  -h, --help               Print help
```

A run command must include the workflow to run.

```
homestar run workflow.json
```

The RPC port should match the RPC port of the Homestar runtime that will run the workflow.

## Stop the runtime

The `homestar stop` command stops a Homestar node.

```
$ homestar stop --help
Stop the Homestar runtime

Usage: homestar stop [OPTIONS]

Options:
      --host <HOST>        Homestar RPC host [default: ::1]
  -p, --port <PORT>        Homestar RPC port [default: 3030]
      --timeout <TIMEOUT>  Homestar RPC timeout [default: 60s]
  -h, --help               Print help
```

The RPC port should match the port on the running Homestar node.

## Query node

The `homestar node` command displays information about a running Homestar node, including peer ID, listen addresses, and connections to other nodes.

```
$ homestar node --help
Get node identity / information

Usage: homestar node [OPTIONS]

Options:
      --host <HOST>        Homestar RPC host [default: ::1]
  -p, --port <PORT>        Homestar RPC port [default: 3030]
      --timeout <TIMEOUT>  Homestar RPC timeout [default: 60s]
  -h, --help               Print help
```

## Display info

The `homestar info` command displays information about the `homestar` binary including version, git commit SHA, commit timestamp, and features the binary was compiled with.

## Debug mode

Run Homestar in debug mode for additional logging by setting the [`RUST_LOG`](https://docs.rs/env\_logger/0.10.1/env\_logger/#enabling-logging) environment variable.

```
RUST_LOG=homestar_runtime=debug homestar start
```
