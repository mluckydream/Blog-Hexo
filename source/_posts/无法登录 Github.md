---
title: 无法登录 Github
date: 2021-11-16 12:51:58
layout: 
  - tags
  - categories
categories:
  - Notes
  - Error
tags: 
  - Network
---

### Error

[GIthub] This site can’t provide a secure connection



### 问题描述（对话）

Hello, I’m getting this error when accessing GitHub from my MacBook. It happens on both chrome and safari. When trying to access from other devices (either iMac or iPhone) everything works fine. Is there any certificate problem on my machine?



HI, welcome to the GitHub Support Community! It definitely sounds like it might be a certificate problem on your machine, or it could be as something simple as the date and time.

First, can you please check in `System Preferences` / `Date & Time` that the time and date are set correctly on your computer?

Then, if that is okay, on the error page, please click `Advanced` and copy/paste the error message.

Next, please click the `⚠️ Not Secure` in your address bar and take a screenshot (`Cmd-Shift-4`) of the certificate chain (or let me know any errors you see on that screen).

Also, could you please verify which version of macOS you are running (Apple menu / `About This Mac`) and which version of Chrome you are running (`chrome://version` in your address bar)?

The next step would be to check the CA certificates in `Keychain Access`, based on any errors there. The necessary root CA certificate is `DigiCert High Assurance EV Root CA`.

P.S. - This is not a fix, but a short term workaround… you could use Firefox while you are troubleshooting this, as it uses its own certificate store instead of the system Keychain.



Thanks Allie. Date and time look ok. I’m attaching some screenshots here about what you requested.

Only thing, I’m using a VPN and don’t know if that may cause an issue. I don’t think so because I use it on all of my devices and the MacBook is the only one not working.



### 解决方式

#### 查看日期

check in `System Preferences` / `Date & Time` that the time and date are set correctly on your computer

#### 更换设备、网络、浏览器

#### 查看网络

System Performances  =>  Network  => Proxies

取消 Automatic Proxy Configuration（pac），勾选 Web Proxy、S ecure Web Proxy、SOCKS Proxy ，代理设置为全局，即可成功连接 github

 

取消代理

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```



