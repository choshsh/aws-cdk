#cloud-config
repo_update: true
repo_upgrade: all

packages:
 - docker

runcmd:
 - [ sh, -c, "usermod -aG docker ec2-user" ]
 - systemctl enable --now docker
 - sleep 5
 - curl -SL https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose 
 - chmod +x /usr/local/bin/docker-compose