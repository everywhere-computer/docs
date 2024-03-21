---
title: Default homestar.toml values
---

```toml
[node]
gc_interval = 1800
shutdown_timeout = 20

[node.monitoring]
console_subscriber_port = 6669
process_collector_interval = 5000

[node.network]
events_buffer_len = 1024
poll_cache_interval = 1000

[node.network.libp2p]
announce_addresses = []
idle_connection_timeout = 60
listen_address = "/ip4/0.0.0.0/tcp/0"
max_connected_peers = 32
max_announce_addresses = 10
node_addresses = []
transport_connection_timeout = 60
dial_interval = 30
bootstrap_interval = 30

[node.network.libp2p.dht]
enable_resolve_receipts_in_background = true
p2p_receipt_timeout = 500
p2p_workflow_info_timeout = 500
p2p_provider_timeout = 10000
receipt_quorum = 2
workflow_quorum = 3

[node.network.libp2p.quic]
enable = true

[node.network.libp2p.mdns]
enable = true
enable_ipv6 = false
query_interval = 300
ttl = 540

[node.network.libp2p.pubsub]
enable = true
duplication_cache_time = 1
heartbeat = 60
max_transmit_size = 10485760
mesh_n_low = 1
mesh_n_high = 10
mesh_n = 2
mesh_outbound_min = 1

[node.network.libp2p.rendezvous]
enable_client = true
enable_server = false
registration_ttl = 7200
discovery_interval = 600

[node.network.metrics]
port = 4000

[node.network.rpc]
host = "::1"
max_connections = 10
port = 3030
server_timeout = 120

[node.network.keypair_config.random_seed]
key_type = "ed25519" | "secp256k1"
seed = "<YOUR_SEED>"

[node.network.ipfs]
host = "127.0.0.1"
port = 5001

[node.network.webserver]
v4_host = "127.0.0.1"
v6_host = "[::1]"
port = 1337
timeout = 120
websocket_capacity = 2048
websocket_sender_timeout = 30000

[node.db]
max_pool_size = 100
```
