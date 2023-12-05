---
description: >-
  We ran a live workshop in Istanbul in November 2023 at IPFS Connect. This is
  the self guided workshop version that will let you run and test the Everywhere
  Computer experience.
---

# Self Guided Workshop

Here is a small repo with supporting files for this exercise:

{% embed url="https://github.com/fission-codes/ipfsconnect-istanbul-workshop-2023" %}

You can check out the contents of this repo, or download the `functions.wasm` and `settings.toml` directly.

### Preparation

#### Install dependencies

Please ensure you have the following tools installed and available `kubo`:

* Install kubo: [https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)
* or IPFS Desktop, which will install and manage kubo along with a graphical app [https://docs.ipfs.tech/install/ipfs-desktop/](https://docs.ipfs.tech/install/ipfs-desktop/)

#### Run kubo

Make sure kubo is running! Either by launching IPFS Desktop, or running `ipfs daemon`.

#### Add web assembly functions

All functions (along with inputs and receipts) are content addressed. We will refer to them by their CID. To add the functions to your local IPFS node, run:

```sh
ipfs add --cid-version 1 ./functions.wasm
```

### Installing Homestar

To install homestar for this workshop, use one of the follow methods.

#### Any platform supporting NodeJS

(npx command for installing goes here)

#### macOS

Install homestar using brew by running:

```sh
brew install fission-codes/fission/homestar
```

#### Linux

1. Go to [this page](https://github.com/ipvm-wg/homestar/actions/runs/6883723147) and scroll down to "Artifacts".
2. Download the `.zip` file for your platform - we recommend the `musl` build for linux
3. Unzip the file and move the `homestar` binary to somewhere in your path (e.g. `/usr/local/bin`)
4. Make sure the binary is executable (`chmod +x /usr/local/bin/homestar`)

#### Windows

Using WSL2 is recommended for this workshop. If you're using Windows, please follow the Linux instructions above.

### Starting your homestar node

We'll want to generate a key for your homestar instance. This will be used to identify your node on the network. To do this, run:

```sh
openssl ecparam -genkey -name secp256k1 -outform DER -out secp256k1_key.der
```

We can now start the node by running:

```sh
homestar start -c ./settings.toml
```

### Running the control panel

Visit [https://control.everywhere.computer/](https://control.everywhere.computer/).

With your Homestar and IPFS node running locally, you can experiment with creating your own workflows and running them locally.



