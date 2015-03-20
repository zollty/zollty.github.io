---
layout: post
title: Linux中的一些点
category: 技术
tags: Linux
keywords: Linux
---

## 前言 ##
本文记录一些日常使用linux的一些点。

## Linux中的引号 ##

首先，单引号和双引号，都是为了解决中间有空格的问题。

- 单引号

	当shell碰到第一个单引号时，它忽略掉其后直到右引号的所有特殊字符

- 双引号

	双引号只要求忽略大多数，具体说，括在双引号中的三种特殊字符不被忽略：美元符号，反斜杠和反引号

- 反引号

    命令替换：在执行一条命令时，会先将其中反引号之间的语句，或者是`$()`中的语句当作命令执行一遍，再将结果加入到原命令中重新执行。其中，`$()`格式受到POSIX标准支持，也利于嵌套。比如`docker rm -f $(docker ps -aq)`。常见的用法：将命令的输出结果赋给一个变量
        
        var=`command`

## pid文件 ##

- pid文件内容：pid文件为文本文件，内容只有一行, 记录了该进程的ID。 

- pid文件作用：防止进程启动多个副本。只有获得pid文件(固定路径固定文件名)写入权限(F_WRLCK)的进程才能正常启动并把自身的PID写入该文件中。其它同一个程序的多余进程则自动退出。

## /etc/issue和/etc/motd ##

登陆linux的欢迎界面可由/etc/issue和/etc/motd控制。/etc/issue文件的使用方法与/etc/motd文件相差不大,它们的主要区别在于：当一个网络用户或通过串口登录系统上时,/etc/issue的文件内容显示在login提示符之前,而/etc/motd内容显示在用户成功登录系统之后。

## socket文件 ##

socket文件，只有在本级通信（AF_UNIX）时才会用到；对于远程TCP通信（AF_INET）来说，是不存在sock文件一说的。以mysql.sock文件为例，假定AB两台主机，mysql服务运行在B主机上。

- 那么对于A主机来说，访问mysql服务只能通过`ip:port`的方式。
- 对于B主机上程序来说，访问mysql服务除了通过`localhost:port`外，还可以通过socket文件方式。后者的好处是：如果通过mysql.conf更改mysql的服务端口，那么mysql服务重新启动时将生成新的socket文件，对于程序来说，不用做任何改变。而前者则需要改变程序中的端口设置。

另外，指定socket文件url一个例子：`unix:///home/docker/docker.sock`，其中`unix://`类似于`tcp://`，后面的`/home/docker/docker.sock`表明socket文件的路径。

## rsync

负责进行文件同步的

`rsync -vzrtopgu --delete dir_path1 dir_path2`

注意，dir_path1中的改变都会被同步到dir_path2中，但是，如果dir_path2改变，并且dir_path2在命令中的先后顺序不变的话，其改变不会被同步到dir_path1中。也就是说，这种同步是单向的，以dir_path1为准。

## source和**.** 命令##

有两种方法执行shell scripts:

1. 一种是新产生一个shell，然后执行相应的shell scripts
2. 一种是在当前shell下执行，不再启用其他shell

假设一文件`file`,文件内容为`echo "test!!!!!!!!!!!!!!!!!!!!!"`:

1. 没有可执行权限

  1.1. `./file` 输出`Permission denied`
  
  1.2. `. ./file` 执行成功
  
  1.3. `source file` 执行成功
  
2. 具有可执行权限，file添加一行为`a=test`

  2.1 `./file;echo $a` 输出"test!!!!!!!!!!!!!!!!!!!!!"`,没有输出$a
  
  2.2 `. ./file;echo $a` he `source file;echo $a`则都输出
  
`./file`中的点代表当前路径的意思，会产生一个新的子shell来执行file，也即file中如果设置环境变量，当前shell无法得到。子shell可以继承父shell的环境变量值。与此同时，file必须具有可执行权限。

`. ./file`中第一个点，代表`source`，第二个点代表当前路径。file不需要具备可执行权限，file中的所有指令将在当前shell中执行。也即如果file设置环境变量，当前shell也能感知到。 

## 一次创建多个文件夹

    mkdir -p /etc/confd/{conf.d,templates}
    
## 创建并管理自己的后台程序

/sbin/start-stop-daemon

