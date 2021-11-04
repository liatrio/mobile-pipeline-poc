!#/bin/bash
while [ 1 ]
do
    pid=`ps -ef | grep "WebDriverAgentRunner-Runner"`
    echo $pid
    if [ "$pid"="" ]
    then
            echo "Process has ended lets get this show on the road..."
            exit
    else
            echo "Process has not ended yet"
    fi
    sleep 6
done