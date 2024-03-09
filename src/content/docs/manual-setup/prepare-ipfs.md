---
title: Prepare IPFS
description: IPFS helps make the Everywhere Computer portable and durable.
sidebar:
  order: 2
---

The Everywhere Computer is both portable and durable. These two traits are made possible by [IPFS’ content addressing](https://fission.codes/blog/content-addressing-what-it-is-and-how-it-works/) and WebAssembly's ability to execute in _any_ environment — including browsers.

## 1. Install IPFS

Just as the Everywhere Computer is powered by Homestar nodes, IPFS is powered by kubo nodes — the GoLang IPFS implementation. You have two options for installing it:

1. Install the kubo binary directly: [https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)
2. or, install IPFS Desktop GUI which includes kubo: [https://docs.ipfs.tech/install/ipfs-desktop/](https://docs.ipfs.tech/install/ipfs-desktop/)

## 2. Run IPFS

Make sure kubo is running! Either by launching IPFS Desktop, or running `ipfs daemon` in your terminal.