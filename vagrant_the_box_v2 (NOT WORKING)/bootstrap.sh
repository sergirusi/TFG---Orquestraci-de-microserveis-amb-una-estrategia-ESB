#!/usr/bin/env bash

sudo cp /vagrant/bash.bashrc /etc/bash.bashrc
sudo cp /vagrant/environment /etc/environment
sudo cp /vagrant/apt.conf /etc/apt/apt.conf
sudo apt-get update
