# bin/bash!

docker rm $(docker ps -a -f status=exited -f status=created -q)
