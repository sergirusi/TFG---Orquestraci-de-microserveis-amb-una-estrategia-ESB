vagrant up
START cmd /k vagrant ssh -c '/vagrant/scripts/remove_machines.sh; cd /vagrant/scripts; sudo su'
TIMEOUT 5
START cmd /k vagrant ssh -c 'cd /vagrant/scripts; /vagrant/scripts/init_machines.sh; sudo su'

