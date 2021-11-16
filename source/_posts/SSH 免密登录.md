---
title: SSH 免密登录远程服务器
date: 2019-08-03 22:19:30
layout: 
  - tags
  - categories
categories:
  - Guide
  - Linux
tags:
  - Linux
  - SSH
---

本地通过 SSH 访问远程系统时，登录链接需要频繁手动输入密码，不仅枯燥无趣且不安全。因此，可通过密钥认证访问远程系统。


### 本地客户端

#### 生成密钥，本地普通用户下执行

```shell
ssh-keygen
```

可输入密码或按两次回车不设置 SSH 访问密码, 同时可看到密钥保存的路径。



若想重新设置密码，执行如下

```shell
ssh-keygen -p -f ~/username/zhangsan/.ssh/id_rsa
```

可以查看  ~/username/zhangsan/.ssh 下已经生成了 公钥 和 私钥 文件。



### 远程服务器

#### SSH 公钥拷到远程服务器 authorized_keys 

```shell
ssh-copy-id sk@192.168.225.22
```

执行上述命令会将本地 `~/username/zhangsan/.ssh/id_rsa.pub` 文件中的内容拷到远程系统 `~/.ssh/authorized_keys` 中。



或者可以使用文件传输工具，例如 [filezilla](https://filezilla-project.org/download.php?platform=osx) 将 id_rsa.pub 传到远程服务器上，登录远程服务器，将 id_rsa.pub 文件内容粘到 ~/.ssh/authorized_keys。



#### 禁用密码验证

打开 ssh_config 文件

```shell
sudo vi /etc/ssh/ssh_config
```

去掉如下一行注释然后将值设为 `no`：

```shell
PasswordAuthentication no
```

重启 ssh 服务

```text
$ sudo systemctl restart ssh
```

