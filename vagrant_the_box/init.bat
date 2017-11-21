vagrant up
START cmd /k vagrant ssh -c 'cd /vagrant/elk; docker-compose up; ./dockbeat-v1.0.0-x86_64 -c dockbeat/dockbeat.yml -v -e &; sudo su'
TIMEOUT 5
START cmd /k vagrant ssh -c 'cd /vagrant/scripts; /vagrant/scripts/restart.sh; sudo su'
START cmd /k vagrant ssh -c 'cd /vagrant/elk; ./dockbeat-v1.0.0-x86_64 -c dockbeat/dockbeat.yml -v -e; sudo su'

