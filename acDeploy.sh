#!/usr/bin/env bash

all=$(ls -l /sys/class/net/ | grep -v virtual | awk '{print $9}')
one=$(echo $all | cut -d " " -f 1)
m=$(cat /sys/class/net/$one/address)




#start docker
docker port ac
#ac started
if [ $? -eq 0 ]
then
    docker stop ac
    docker run -d --name acc --restart always --volumes-from ac -p 3003:443 -p 3002:80 -p 3001:8001 -p 9999:9999 -p 5246:5246/udp -p 5247:5247/udp --mac-address=$m cassia/updater
    docker rm -f ac
    echo "from ac run acc"
    exit 0
fi

docker port acc
#acc started
if [ $? -eq 0 ]
then
    docker stop acc
    docker run -d --name ac --restart always --volumes-from acc -p 3003:443 -p 3002:80 -p 3001:8001 -p 9999:9999 -p 5246:5246/udp -p 5247:5247/udp --mac-address=$m cassia/updater
    docker rm -f acc
    echo "from acc run ac"
    exit 0
fi

#nothing started
echo "run ac"
docker run -d --name ac --restart always -p 3003:443 -p 3002:80 -p 3001:8001 -p 9999:9999 -p 5246:5246/udp -p 5247:5247/udp --mac-address=$m cassia/updater
