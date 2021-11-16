---
title: Hexo 搭建博客
date: 2020-10-02 20:05:38
layout: 
  - tags
  - categories
categories:
  - Guide
  - Blog
tags: 
  - Hexo
---

## 1.1 安装 Hexo

首先要安装 node.js， git 

```shell
sudo apt-get update
sudo apt-get install git nginx -y
```

安装完成后，使用 npm 安装 Hexo:

```shell
npm install hexo-cli hexo-server -g
```

初始化指定文件夹

```shell
$ hexo init <folder>
$ cd <folder>
$ npm install
```

启动本地服务器查看样例

```
$ hexo s
```

#### 2.1 配置 Nginx 托管文件目录

```shell
sudo mkdir /var/repo/
sudo chown -R $USER:$USER /var/repo/
sudo chmod -R 755 /var/repo/
```

然后，执行如下命令：

```shell
cd /var/repo/
git init --bare hexo_static.git
```

接下来，创建 `/var/www/hexo` 目录，用于 Nginx 托管。

```shell
sudo mkdir -p /var/www/hexo
```

和上一步类似，这里也需要修改目录的所有权和权限。

```shell
sudo chown -R $USER:$USER /var/www/hexo
sudo chmod -R 755 /var/www/hexo
```

然后，修改 Nginx 的 `default` 设置：

```shell
sudo vim /etc/nginx/sites-available/default
```

重启 Nginx 服务，使得改动生效。

```shell
sudo service nginx restart
```

### 2.2 创建 Git 钩子

接下来，在服务器上的裸仓库 hexo_static 创建一个钩子，在满足特定条件时将静态 HTML 文件传送到 Web 服务器的目录下，即 /var/www/hexo。

在自动生成的 hooks 目录下创建一个新的钩子文件：

```shell
vim /var/repo/hexo_static.git/hooks/post-receive
```

在该文件中添加两行代码，指定 Git 的工作树（源代码）和 Git 目录（配置文件等）。

```shell
#!/bin/bash

git --work-tree=/var/www/hexo --git-dir=/var/repo/hexo_static.git checkout -f
```

保存并退出文件，并让该文件变为可执行文件。

```javascript
chmod +x /var/repo/hexo_static.git/hooks/post-receive
```

### 2.3 通过 Git 部署

继续编辑 `_config.yml` 文件，找到 **Deployment** 部分，按照如下情况修改：

```shell
deploy:
    type: git
    repo: ubuntu@CVM 云服务器的IP地址:/var/repo/hexo_static
    branch: master
```

需要安装一个 Hexo 包，负责将博客所需的静态内容发送到设置好的 Git 仓库。

```shell
npm install hexo-deployer-git --save
```

安装好后可以上传服务器测试部署：

```shell
hexo g -d
```

