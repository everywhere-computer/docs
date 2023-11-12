---
description: Configuring a Homestar node
---

# Configuration

Homestar nodes are configured with a [TOML](https://toml.io) configuration file. The simplest configuration that accepts all default settings only requires a `node` table.

```toml
[Node]

```

Homestar logs its configuration at start up.

A minimal configuration sets a `listen_address`, `metrics_port`, `rpc_port`, `webserver_port`, and a `keypair_config`.

```toml
[node]

[node.network]
listen_address = "/ip4/127.0.0.1/tcp/7000"
metrics_port = 4020
rpc_port = 9820
webserver_port = 8020

[node.network.keypair_config]
existing = { key_type = "ed25519", path = "./config/ed25519.pem" }
```

These settings configure:

* `listen_address`. The multiaddress where the node will listen for `libp2p` network events.
* `metrics_port`. The port for scraping Prometheus metrics.
* `rpc_port`. An RPC port that accepts workflow run requests.
* `webserver_port`. A websocket port with JSON-RPC API for running workflows, requesting metrics, and subscribing to network events. Used by the Homestar Control Panel.
* `keypair_config`. An `ed25519` or `secp256k1` keypair that configures the node with a peer ID.

If a `keypair_config` is not configured, Homestar will generate a temporary keypair.

## Network

Homestar nodes can connect to known peers or discover peers through mDNS or the rendezvous protocol.
