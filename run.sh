#!/bin/bash

yarn --cwd /backend start & pid=$!
PID_LIST+=" $pid";

yarn --cwd /frontend start & pid=$!
PID_LIST+=" $pid";

trap "kill $PID_LIST" SIGINT

echo "Processos parelelos iniciados.";

wait $PID_LIST

echo
echo "Todos os processos terminaram.";