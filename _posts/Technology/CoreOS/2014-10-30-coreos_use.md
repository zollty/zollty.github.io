---
layout: post
title: CoreOS 使用
category: 技术
tags: CoreOS
keywords: CoreOS Docker
---

## 一些点

查看coreos版本：`cat /etc/os-release`

`/etc/hosts`文件默认没有，可以自己创建，作用和一般linux系统是一样的。

coreos的`/etc/profile`文件是自动生成的，不能更改，但是可以更改`/etc/profile.env`

`journalctl -xe` 查看日志的最后部分

`journalctl -xe -u etcd`  查看etcd组件的最后输出

`sudo systemctl status etcd -l` 如何日志一行显示不完，可以加上"-l"

## cloud-config

https://coreos.com/docs/cluster-management/setup/cloudinit-cloud-config/

cloud-config　语法有要求