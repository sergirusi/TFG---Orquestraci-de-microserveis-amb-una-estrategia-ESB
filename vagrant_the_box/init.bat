vagrant up
START cmd /k vagrant ssh -c 'cd /vagrant/elk/docker-elk; docker-compose up; sudo su'
TIMEOUT 5
START cmd /k vagrant ssh -c 'cd /vagrant/scripts; /vagrant/scripts/restart.sh; sudo su'

