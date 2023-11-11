---
description: Getting started with Homestar
---

# Getting Started

## Installation

On macOS, Homestar can installed with a Homebrew formula.

```sh
brew install fission-codes/fission/homestar
```

Other platforms should build the Homestar binary from source.&#x20;

[Install Rust](https://www.rust-lang.org/tools/install) for your platform, then clone the Homestar repository:

```sh
git clone git@github.com:ipvm-wg/homestar.git
```

Build the runtime binary for development.

```sh
cargo build
```

Build the binary for production release.

```sh
cargo build --release
```

Copy the binary to a directory on your `PATH`.

```sh
# Development
cp target/debug/homestar <DIRECTORY-ON-PATH>

# Release
cp target/release/homestar <DIRECTORY-ON-PATH>
```

{% hint style="info" %}
Homestar binaries will be available to download on GitHub soon.
{% endhint %}

## Help

The `--help` option displays a quick reference at any command level.

At the top level, `--help` displays a high-level summary of all commands.

```
$ homestar --help
Commands:
  start  Start Homestar
  stop   Stop Homestar
  ping   Ping Homestar to see if it's running
  run    Run an IPVM-configured workflow file
  help   Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

## Start the runtime

The `homestar start` commands starts a Homestar node.

```
$ homestar start --help
Start Homestar

Usage:

Options:
      --db <DATABASE_PATH>  Database path (SQLite) [optional] [env: DATABASE_PATH=] [default: homestar.db]
  -c, --config <CONFIG>     Runtime configuration file (.toml) [optional] [default: ./config/settings.toml]
  -d, --daemonize           Daemonize the runtime
      --daemon_dir <DIR>    Directory to place daemon file(s) [default: /tmp]
  -h, --help                Print help
```

The runtime must be started with a configuration file and an `sqlite` database file. The database file will be created if it does not exist.

```sh
homestar start -c settings.toml --db homestar.db
```

See our configuration guide for information about node configuration.

## Stop the runtime

The `homestar stop` command stops a Homestar node.

```
$ homestar stop --help
Stop Homestar

Usage:

Options:
      --host <HOST>        Homestar RPC host [default: ::1]
  -p, --port <PORT>        Homestar RPC port [default: 3030]
      --timeout <TIMEOUT>  Homestar RPC tiemout [default: 60s]
  -h, --help               Print help
```

The RPC port should match the port on the running Homestar node.

## Run a workflow

The `homestar run` command requests a workflow run from a Homestar node.

<pre><code><strong>$ homestar run --help
</strong><strong>Run an IPVM-configured workflow file
</strong>
Usage:

Options:
      --host &#x3C;HOST>        Homestar RPC host [default: ::1]
  -p, --port &#x3C;PORT>        Homestar RPC port [default: 3030]
      --timeout &#x3C;TIMEOUT>  Homestar RPC tiemout [default: 60s]
  -n, --name &#x3C;NAME>        Local name given to a workflow (optional)
  -w, --workflow &#x3C;FILE>    IPVM-configured workflow file to run.
                           Supported:
                             - JSON (.json)
  -h, --help               Print help
</code></pre>

A run command must include the workflow to run.

```
homestar run -w tests/fixtures/test-workflow-add-one.json
```

The RPC port should match the RPC port of the Homestar runtime that will run the workflow.

## Ping

The `homestar ping` command pings a Homestar node to check that it is up.

<pre><code><strong>$ homestar ping --help
</strong>Ping Homestar to see if it's running

Usage:

Options:
      --host &#x3C;HOST>        Homestar RPC host [default: ::1]
  -p, --port &#x3C;PORT>        Homestar RPC port [default: 3030]
      --timeout &#x3C;TIMEOUT>  Homestar RPC timeout [default: 60s]
  -h, --help               Print help
</code></pre>
