#cloud-config
repo_update: true
repo_upgrade: all

packages:
 - ruby
 - amazon-cloudwatch-agent

runcmd:
 - |
  curl -SL https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install -o /tmp/codedeploy_install && \
    chmod +x /tmp/codedeploy_install && \
    /tmp/codedeploy_install auto
 - |
  amazon-linux-extras enable corretto8 && \
    yum install -y java-1.8.0-amazon-corretto-devel
 - |
  cat <<EOF > /opt/aws/amazon-cloudwatch-agent/bin/config.json
  {
    "agent": { "metrics_collection_interval": 30, "run_as_user": "root" },
      "metrics": {
        "namespace": "polarishare2",
        "metrics_collected": {
          "disk": {
            "resources": ["/"],
            "measurement": [
              {"name": "free", "rename": "disk_free", "unit": "Gigabytes"},
              "total",
              "used"
            ],
             "ignore_file_system_types": ["sysfs", "devtmpfs"]
          },
          "diskio": {
            "resources": ["*"],
            "measurement": [
              "reads",
              "writes",
              "read_time",
              "write_time",
              "io_time"
            ]
          },
          "mem": {
            "measurement": [
              "mem_used",
              "mem_cached",
              "mem_total",
              "mem_used_percent"
            ]
          }
        },
        "append_dimensions": {
          "ImageId": "\${aws:ImageId}",
          "InstanceId": "\${aws:InstanceId}",
          "InstanceType": "\${aws:InstanceType}",
          "AutoScalingGroupName": "\${aws:AutoScalingGroupName}"
        },
        "aggregation_dimensions" : [["ImageId"], ["InstanceId", "InstanceType"], ["AutoScalingGroupName"]],
        "force_flush_interval" : 30
      },
    "logs": { 
      "logs_collected": { 
        "files": {
          "collect_list": [
            {
              "file_path": "/home/ec2-user/app/**.log",
              "log_group_name": "/polarishare/backend",
              "log_stream_name": "{date}/{instance_id}",
              "timezone": "UTC"
            }
          ]
        }
      },
      "force_flush_interval" : 15
    }
  }
  EOF
 - /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json