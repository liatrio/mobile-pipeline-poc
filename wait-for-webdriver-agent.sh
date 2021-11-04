#!/bin/bash
while [ 1 ]
do
    curl  http://localhost:8100/status > temp.json
    status=$(jq -r .value.state temp.json)
    echo "${status}"
    if [ "$status" = "success" ]
    then
        echo "Process has started."
        exit
    fi
    sleep 5
done