---
title: Every CLI Local Development
description: The Every CLI is a developer tool that includes a local gateway server
---

## Installation

```shell
npm i -g @everywhere-computer/every-cli
```

## Usage

### Prerequisites

1. Ensure you have the IPFS daemon running via [ipfs daemon](https://docs.ipfs.tech/how-to/command-line-quick-start/#take-your-node-online) or [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)
2. Create a custom TS or Wasm function, or clone TS examples repo [github.com/everywhere-computer/custom-homestar-functions-ts](https://github.com/everywhere-computer/custom-homestar-functions-ts).

### Creating the Everywhere Computer environment

Running the Every CLI will start a [Homestar](/homestar/what-is-homestar/) node, API gateway, CloudFlare tunnel and locally running copy of the Everywhere Computer [control panel](https://control.everywhere.computer).

#### To create a single function Homestar workflow

```shell
every dev --fn <ABSOLUTE_PATH_TO_FUNCTION_FILE>
```

#### To create a multi-function Homestar workflow

```shell
every dev --fn <ABSOLUTE_PATH_TO_FUNCTION_FILE> --fn <ABSOLUTE_PATH_TO_OTHER_FUNCTION_FILE>
```

## Function development loop

:::note
We are currently focusing on pure functions that are deterministic, and thus also cacheable anywhere within the network.
:::


### Creating TypeScript functions

Write a TypeScript function with clearly specified argument and return types

```typescript
// hello.ts

/**
 * Hello world function that will take a `name` param and return `Hello <name>`
 */
export function hello(name: string): string {
  return `Hello ${name}`;
}
```

Start the CLI and point it to your custom TypeScript function

```shell
every cli dev --fn <ABSOLUTE_PATH_TO_YOUR_FUNCTION_DIR>/hello.ts
```

### Creating Wasm functions in Rust

Init a new function lib using [cargo](https://github.com/rust-lang/cargo?tab=readme-ov-file#installing-cargo)

```shell
mkdir hello
cd hello
cargo init --name hello --lib
```

Add [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen) to your `cargo.toml` `dependencies` and specify the `[lib].crate-type`

```toml
// cargo.toml

[package]
name = "hello"
version = "0.1.0"
edition = "2021"

[dependencies]
wit-bindgen = "0.13"

[lib]
crate-type = ["cdylib", "rlib"]
```

Write a Rust function with clearly specified argument and return types

```rust
// src/lib.rs

wit_bindgen::generate!({
    world: "hello",
    exports: {
        world: Component,
    }
});

pub struct Component;

impl Guest for Component {
    /**
     * Hello world function that will take a `name` param and return `Hello <name>`
     */
    fn hello(name: String) -> String {
        format!("Hello {}", name)
    }
}
```

Create a [WebAssembly Interface Type(WIT)](https://component-model.bytecodealliance.org/design/wit.html) file for your rust function

```wit
// wit/host.wit

package fission:hello@0.1.0

world hello {
  export hello: func(name: string) -> string
}
```

Build your rust package by specifying a `wasm32-unknown-unknown` target(Note: if you do not have the `wasm32-unknown-unknown` target installed, you will first need to run `rustup target add wasm32-unknown-unknown`)

```shell
cargo build --target wasm32-unknown-unknown
```

Install [wasm-tools](https://github.com/bytecodealliance/wasm-tools) the generate a Wasm component from the build target of your `cargo build` command

```shell
wasm-tools component new ./target/wasm32-unknown-unknown/debug/hello.wasm -o ./hello.wasm
```

Start the CLI and point it to your custom Wasm function

```shell
every cli dev --fn <ABSOLUTE_PATH_TO_YOUR_FUNCTION_DIR>/hello.wasm
```

## Setting up a tunnel

By default the [every-cli](https://github.com/everywhere-computer/every-cli) will start a [CloudFlare tunnel](https://www.cloudflare.com/en-gb/products/tunnel/) for you.

If you're familiar with [ngrok](https://ngrok.com/) or [tailscale](https://tailscale.com/), you can also use those to expose your local node server to the public Internet.