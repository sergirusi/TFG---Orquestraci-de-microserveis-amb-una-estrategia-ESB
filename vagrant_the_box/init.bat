vagrant up
START cmd /k vagrant ssh -c 'cd /vagrant/scripts; sudo su'
TIMEOUT 5
START cmd /k vagrant ssh -c 'cd /vagrant/scripts; /vagrant/scripts/restart.sh; sudo su'

