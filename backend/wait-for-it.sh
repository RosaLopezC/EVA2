#!/bin/bash

host="mysql_db"
port="3306"
timeout=30

echo "Waiting for MySQL at $host:$port..."
while ! nc -z $host $port; do
    if [ "$timeout" -le 0 ]; then
        echo "Timeout waiting for MySQL"
        exit 1
    fi
    timeout=$((timeout-1))
    echo "MySQL is unavailable - sleeping"
    sleep 1
done

echo "MySQL is up - executing command"
exec "$@"