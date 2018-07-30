#!/bin/bash

docker rm -f $(docker ps -aq); docker network prune;docker rmi dev-peer0.org1.example.com-blockchainchatbot-1.0-1f9636c152c2fe2240240be65f04323d78e3af999d2acc7050594e354c6869c3;./startFabric.sh;node enrollAdmin.js;node registerUser.js
