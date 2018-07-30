#!/bin/bash

docker rm -f $(docker ps -aq); docker network prune;docker rmi dev-peer0.org1.example.com-blockchainchatbot-1.0-a8769b9b98a7b54117b001d4b32686ec285a431edc66b4c55adb4e7ffbfd3187;./startFabric.sh;node enrollAdmin.js;node registerUser.js
