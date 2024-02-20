---
title: Every CLI
description: The Every CLI is a developer tool that includes a local gateway server
---

Every CLI is an experimental CLI for developers written in TypeScript. It has a set of convenience functions for interacting with Homestar and the Everywhere Computer control panel.

More info in the Github repo, including usage: https://github.com/everywhere-computer/every-cli

## Wasmify

In order to make an easy experience for JavaScript developers, the Every CLI has a `gen-wasm` function. 

```
every gen-wasm <ABSOLUTE_PATH_TO_TS_FUNCTION_FILE>
```

This relies on [ComponentizeJS](https://github.com/bytecodealliance/ComponentizeJS):

> Provides a Mozilla SpiderMonkey embedding that takes as input a JavaScript source file and a WebAssembly Component using the [WIT format](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md), and outputs a [WebAssembly Component](https://github.com/WebAssembly/component-model) binary with the same interface.

:::note
We're using this as part of the Wasmtime runtime we use for Homestar. Components and WIT are evolving rapidly. These functions each embed an entire Spidermonkey instance, so will be slower than functions written in Rust and compiled to Wasm.
:::

## Custom TypeScript Functions

We are stashing some custom functions written by the Fission team in this repo: https://github.com/everywhere-computer/custom-homestar-functions-ts

This will eventually migrate to published functions available through the control panel.


## API Gateway

Running the CLI locally will start a Homestar node, API gateway, and local control panel[^ipfs]. 

Integration with Cloudflare Tunnels will expose this as a live public endpoint. This means you can build apps and other experiences that are running on compute from your local Homestar node.

[^ipfs]: Follow the [setup your local node](/getting-started/setup-your-local-node/#prepare-ipfs) instructions to run IPFS locally.