---
title: Linux 配置 LEMP 环境
date: 2019-08-03 23:04:53
layout: 
  - tags
  - categories
categories:
  - Guide
  - Linux
tags: 
  - Linux 
  - Nginx
---

### 安装环境

#### 安装Nginx

```
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'

```

#### 验证

sudo ufw status

浏览器输入ip地址或域名

#### 安装MySQL

```
sudo apt install mysql-server
```

mysql -u root -p

```
sudo mysql_secure_installation
```

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1

y

```
sudo mysql
```

```mysql
SELECT user,authentication_string,plugin,host FROM mysql.user;
```



此时root用户通过 auth_socket插件进行身份验证，以下将root用户改成通过密码进行身份验证

password改成自己刚改密码

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

```mysql
FLUSH PRIVILEGES;

```

```mysql
SELECT user,authentication_string,plugin,host FROM mysql.user;
```



有以上输出，则可以退出mysql

```mysql
exit
```



**Note**  : 此时 sudo mysql 无法继续访问mysql，我们可以通过以下命令登入：

```
mysql -u root -p
```

##### ERROR 1819(HY000)

如果出现 ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

则

`sudo mysql_secure_installation`

改一个强度高的密码

密码强度最好一百以上

Estimated strength of the password: 100 

q继续上述命令验证



#### 安装PHP并配置Nginx组件

```
sudo add-apt-repository universe 
```



```
sudo apt install php-fpm php-mysql
```

到此LEMP必要的组件已经安装完毕，帮极啦！不过仍然要进行一些配置更改，以使Nginx使用PHP处理器来处理动态内容。



### 配置环境

#### 新建服务器配置文件

新建的服务器配置文件，Example.com 即是，可自主命名。（不记得跟目录查一下 ps  -ef | grep nginx）

```
sudo vi /etc/nginx/sites-available/man.com
```

内容如下

```bash
server {
        listen 80;
        root /var/html;
        index index.php index.html index.htm index.nginx-debian.html;
        server_name man.com;

        location / {
                try_files $uri $uri/ =404;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }
}

```

#### 在 **sites-enabled** 下创建 symbol link 链接 **sites-available** 下的配置文件启用代理配置

```bash
sudo ln -s /etc/nginx/sites-available/man.com /etc/nginx/sites-enabled/
```

#### 取消默认启动指向

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

#### 检查配置文件是否错误

```bash
sudo nginx -t
```

#### 重启 Nginx

```bash
sudo systemctl reload nginx
```

### 建一个PHP文件测试配置

```
sudo nano /var/html/info.php
```

配置如下

```
<?php
phpinfo();
```

```
http://your_server_domain_or_IP/info.php
```

wow！配置成功！

最后，我们最好删除测试文件，因为它实际上可以为未经授权的用户提供有关您的配置的一些提示，这些提示可能有助于他人尝试闯入。

```
sudo rm /var/html/info.php
```


