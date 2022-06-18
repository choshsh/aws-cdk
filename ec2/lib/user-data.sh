#cloud-config
repo_update: true
repo_upgrade: all

packages:
 - docker
 - ruby

runcmd:
 - [ sh, -c, "usermod -aG docker ec2-user" ]
 - systemctl enable --now docker
 - |
  curl -SL https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install -o /tmp/codedeploy_install && \
    chmod +x /tmp/codedeploy_install && \
    /tmp/codedeploy_install auto
 - |
  curl -SL https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose