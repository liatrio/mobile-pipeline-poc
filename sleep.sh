#!/bin/bash
until curl -s -f -o /dev/null "http://localhost:8100/status"
do
  sleep 5
done