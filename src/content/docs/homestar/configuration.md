---
title: Configuration
description: Configuring a Homestar node
---

Homestar nodes are configured with a [TOML](https://toml.io) settings file. Homestar logs its configuration at start up.

Run `homestar init --dry-run` to view the default Homestar settings.

## Minimal configuration

A minimal configuration sets a listen address, metrics port, RPC port, webserver port, and a key pair.

```toml
[node]

[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7001"

[node.network.metrics]
port = 4020

[node.network.rpc]
port = 9820

[node.network.webserver]
port = 8020

[node.network.keypair_config]
existing = { key_type = "ed25519", path = "./config/ed25519.pem" }
```

These settings configure:

* **Listen address.** The multiaddress where the node will listen for `libp2p` network events. Nodes can listen on `0.0.0.0` to serve on all IP addresses or you can assign specific IP addresses.
* **Metrics port.** A port for scraping Prometheus metrics.
* **RPC port.** An RPC port that accepts requests to run workflows.
* **Webserver port.** A websocket port with JSON-RPC API for running workflows, subscribing to network events, and requesting metrics. Used by the [Homestar Control Panel](https://github.com/fission-codes/everywhere-computer-control-panel).
* **Key pair.** An `ed25519` or `secp256k1` key pair that configures the node with a peer ID.

Homestar will generate a temporary key pair if a `keypair_config` is not set.

## Network

Homestar nodes can connect to known peers or discover peers through [mDNS](https://docs.libp2p.io/concepts/discovery-routing/mdns/) or the [rendezvous protocol](https://docs.libp2p.io/concepts/discovery-routing/rendezvous/).

### Known peers

Homestar nodes connect to peers configured in `node_addresses`. We could connect two nodes with the following settings.

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7001"
node_addresses = [
  "/ip4/<NODE-TWO-ADDRESS>/tcp/7002/p2p/16Uiu2HAm3g9AomQNeEctL2hPwLapap7AtPSNt8ZrBny4rLx1W5Dc",
]
```

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7002"
node_addresses = [
  "/ip4/<NODE-ONE-ADDRESS>/tcp/7001/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

`NODE-ONE-ADDRESS` and `NODE-TWO-ADDRESS` are the externally reachable addresses of each node. The last segment of the node addresses are peer IDs, which are determined by the node's key pair.

For example, we could connect two nodes on a local network.

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7001"
node_addresses = [
  "/ip4/192.168.1.11/tcp/7002/p2p/16Uiu2HAm3g9AomQNeEctL2hPwLapap7AtPSNt8ZrBny4rLx1W5Dc",
]
```

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7002"
node_addresses = [
  "/ip4/192.168.1.26/tcp/7001/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

### mDNS discovery

Homestar nodes discover each other through mDNS and connect on discovery. This discovery technique only works on a LAN and may not be available on some networks.

Nodes are configured with a `0.0.0.0:0` listen address to allow Homestar to automatically determine their local IP address and select a port.

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/0"
```

mDNS can be disabled when it is not needed.

```toml
[node.network.libp2p.mdns]
enable = false
```

### Rendezvous discovery

Homestar nodes can discover each other through a rendezvous server. Each node that wishes to be discovered registers with the rendezvous server. Nodes can discover registered peers by making a discovery request to the rendezvous point.

A Homestar node can act as a rendezvous server by setting `enable_rendezvous_server`.

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7000"

[node.network.libp2p.rendezvous]
enable_server = true
```

A node registers with a rendezvous server by adding its registration address to `announce_addresses` and the rendezvous server to `node_addresses`.

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7001"
announce_addresses = [
  "/ip4/<EXTERNAL-ADDRESS>/tcp/7001/p2p/16Uiu2HAm3g9AomQNeEctL2hPwLapap7AtPSNt8ZrBny4rLx1W5Dc",
]
node_addresses = [
  "/ip4/<RENDEZVOUS-SERVER-ADDRESS>/tcp/7000/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

The `EXTERNAL-ADDRESS` is an externally reachable address for the node. `RENDEZVOUS-SERVER-ADDRESS` is the address of the rendezvous server.

A node makes discovery requests by adding a rendezvous server to its `node_addresses`.

```toml
[node.network.libp2p]
listen_address = "/ip4/0.0.0.0/tcp/7002"
node_addresses = [
  "/ip4/<RENDEZVOUS-SERVER-ADDRESS>/tcp/7000/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

Rendezvous can be turned off entirely by disabling `enable_rendezvous_client`.

```toml
[node.network.libp2p.rendezvous]
enable_client = false
```

Nodes can configure the life of their registrations and how often they make discovery requests:

* `registration_ttl`. Sets how long a registration is valid for in seconds. The registrant will renew its registration on expiration. Defaults to two hours.
* `discovery_interval`. Sets how often to make discovery requests in seconds. Defaults to ten minutes.
