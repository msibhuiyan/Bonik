# Performance Analysis for BONIK

## Configuration

Caliper Version 0.3.2
Hyperledger fabric version 1.4.1
node version v10.15.3

## BenchMark Configuration

In benchmark config number of worker node, transaction rate, etc are configured for the test.

## Network Configuration

The network where the test will run is configured. It also generates the certs required for different peers and orgs.

## src
The chaincode for test is kept here.

## Command To Test

npx caliper launch master     --caliper-workspace . --caliper-benchconfig benchmarks/blockchainChatbot/config.yaml --caliper-networkconfig networks/fabric/fabric-v1.4.1/2org1peercouchdb/blockchainchatbot2O2P.yaml

