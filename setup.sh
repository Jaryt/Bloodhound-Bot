#!/bin/bash
echo Killing old node process
kill $(ps aux | grep '[n]ode' | awk '{print $2}')
echo Starting server
node index.js&
exit