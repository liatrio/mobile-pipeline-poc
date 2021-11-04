#!/bin/bash
while [ 1 ]
do
    pid=`ps -e | grep -i WebDriverAgentRunner-Runner | grep -v ttys`
    echo $pid
    if [ "$pid"!="" ]
    then
        echo "Process has started."
        exit
    fi
    sleep 5
done
