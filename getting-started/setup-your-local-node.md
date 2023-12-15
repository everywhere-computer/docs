---
description: Get the Everywhere Computer✵ up and running on your local machine.
---

# Setup Your Local Node

The **Everywhere Computer (**[**ϵ✵**](#user-content-fn-1)[^1]**)** is powered by [Homestar](https://github.com/ipvm-wg/homestar) nodes — a reference implementation of the [IPVM](https://github.com/ipvm-wg) protocol. This guide will help you:

1. **Prepare** IPFS on your local machine — a dependency of the Everywhere Computer
2. **Setup** your local Homestar node
3. **Access** the Everywhere Computer control panel

## Preparing IPFS

The Everywhere Computer is both portable and durable. These two traits are made possible by [IPFS’ content addressing](https://fission.codes/blog/content-addressing-what-it-is-and-how-it-works/) and web assembly’s ability to execute in _any_ environment — including browsers.

### 1. Install IPFS

Just as the Everywhere Computer is powered by Homestar nodes, IPFS is powered by kubo nodes — the GoLang IPFS implementation. You have two options for installing it:

1. Install the kubo binary directly: [https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)
2. or, install IPFS Desktop GUI which includes kubo: [https://docs.ipfs.tech/install/ipfs-desktop/](https://docs.ipfs.tech/install/ipfs-desktop/)

### 2. Run IPFS

Make sure kubo is running! Either by launching IPFS Desktop, or running `ipfs daemon` in your terminal.

## Installing Homestar

To install your first Everywhere Computer `Homestar` node, we recommend downloading a build directly from github.

<mark style="background-color:orange;">🚧 This is still under very active development! 🚧</mark>

### macOS

Install `homestar` using brew by running:

```
brew install fission-codes/fission/homestar  
```

### Linux

1. Go to this page and scroll down to `Artifacts`: [https://github.com/ipvm-wg/homestar/actions/runs/7117766904](https://github.com/ipvm-wg/homestar/actions/runs/7117766904)
2. Download the `.zip` file for your platform - we recommend the `musl` build for linux
3. Unzip the file and move the `homestar` binary to somewhere in your path (e.g. `/usr/local/bin`)
4. Make sure the binary is executable (`chmod +x /usr/local/bin/homestar`)

### Windows

Using WSL2 is recommended for this workshop. If you're using Windows, please follow the Linux instructions above.

## Setting up your workspace

We'll store settings for your local Homestar node and the registry of functions that your workflows will run on Everywhere Computer in a workspace.

### 1. Clone the \`default-workspace\` repo

{% embed url="https://github.com/everywhere-computer/getting-started" %}

Open your terminal and navigate to the `default-workspace` folder.

### 2. Add the default functions to IPFS

Earlier, we got IPFS running on your machine via kubo.&#x20;

This default workspace includes a set of image manipulation functions that our sample workflows will run.&#x20;

All functions on the Everywhere Computer are [content addressed](https://fission.codes/blog/content-addressing-what-it-is-and-how-it-works/) on IPFS, which means they are identified and located using something called a CID (Content IDentifier).

To add the functions to your local IPFS node, run:

```
ipfs add --cid-version 1 ./functions.wasm  
```

### 3. Generate an identifying keypair

Your local Homestar node needs to be identifiable on the Everywhere Computer network. To do this, run:

```
openssl ecparam -genkey -name secp256k1 -outform DER -out secp256k1_key.der  
```

## Booting up the Everywhere Computer

We can now start the node by running:

```
homestar start -c ./settings.toml  
```

**🧟 **_**It's alive!**_** 🧟**

## Accessing the control panel

You'll manage your Homestar node and its view of the Everywhere Computer network via the Control Panel. You have two options:

* Use our hosted version: [control.everywhere.computer](https://control.everywhere.computer/)
* Run it local-first: [install and run the control panel locally](https://github.com/everywhere-computer/control-panel)

Now that Everywhere Computer (via `homestar`) and IPFS (via `kubo`) are running locally, it's time to experiment by [running a workflow](run-a-workflow.md).

[^1]: Everywhere Computer
