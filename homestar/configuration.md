---
description: Configuring a Homestar node
---

# Configuration

Homestar nodes are configured with a [TOML](https://toml.io) settings file. The simplest configuration that accepts all default settings only requires a `node` table.

```toml
[node]

```

Homestar logs its configuration at start up.

## Minimal configuration

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
* `metrics_port`. A port for scraping Prometheus metrics.
* `rpc_port`. An RPC port that accepts requests to run workflows.
* `webserver_port`. A websocket port with JSON-RPC API for running workflows, subscribing to network events, and requesting metrics. Used by the Homestar Control Panel.
* `keypair_config`. An `ed25519` or `secp256k1` keypair that configures the node with a peer ID.

Homestar will generate a temporary keypair if a `keypair_config` is not set.

## Network

Homestar nodes can connect to known peers or discover peers through [mDNS](https://docs.libp2p.io/concepts/discovery-routing/mdns/) or the [rendezvous protocol](https://docs.libp2p.io/concepts/discovery-routing/rendezvous/).

### Known peers

Homestar nodes connect to peers configured in `node_addresses`. For example, we could connect two nodes with the following settings.

```toml
[node.network]
listen_address = "/ip4/127.0.0.1/tcp/7000"
node_addresses = [
  "/ip4/127.0.0.1/tcp/7001/p2p/16Uiu2HAm3g9AomQNeEctL2hPwLapap7AtPSNt8ZrBny4rLx1W5Dc",
]
```

```toml
[node.network]
listen_address = "/ip4/127.0.0.1/tcp/7001"
node_addresses = [
  "/ip4/127.0.0.1/tcp/7000/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

The last segment of the configured node addresses are peer IDs, which are determined by the node's keypair.

### mDNS discovery

Homestar nodes discover each other through mDNS and connect on discovery. This discovery technique only works on a LAN and may not be available on some networks.

Nodes are configured with a `0.0.0.0:0` listen address to allow Homestar to determine their local IP address and select a port automatically.

```toml
[node.network]
listen_address = "/ip4/0.0.0.0/tcp/0"
```

mDNS can be disabled when it is not needed.

```toml
[node.network]
enable_mdns = false
```

### Rendezvous discovery

Homestar nodes can discover each other through a rendezvous server. Each node that wishes to be discovered registers with the rendezvous server. Nodes can discover registered peers by making a discovery request to the rendezvous point.

A Homestar node can act as a rendezvous server by setting `enable_rendezvous_server`.

```toml
[node.network]
enable_rendezvous_server = true
```

A node registers with a rendezvous server by adding its registration address to `announce_addresses` and the rendezvous server to `node_addresses`.

```toml
[node.network]
listen_address = "/ip4/127.0.0.1/tcp/7001"
announce_addresses = [
  "/ip4/127.0.0.1/tcp/7001/p2p/16Uiu2HAm3g9AomQNeEctL2hPwLapap7AtPSNt8ZrBny4rLx1W5Dc",
]
node_addresses = [
  "/ip4/127.0.0.1/tcp/7000/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

A node makes discovery requests by adding a rendezvous server to its `node_addresses`.

```toml
[node.network]
listen_address = "/ip4/127.0.0.1/tcp/7002"
node_addresses = [
  "/ip4/127.0.0.1/tcp/7000/p2p/12D3KooWDpJ7As7BWAwRMfu1VU2WCqNjvq387JEYKDBj4kx6nXTN",
]
```

Rendezvous can be disabled completely by disabling `enable_rendezvous_client`.

```toml
[node.network]
enable_rendezvous_client = false
```

Nodes can configure the life of their registrations and how often they make discovery requests:

* `rendezvous_registration_ttl`. Sets how long a registration is valid for in seconds. The registrant will renew its registration on expiration. Defaults to two hours.
* `rendezvous_discovery_interval`. Sets how often discovery requests are made in seconds. Defaults to ten minutes.
