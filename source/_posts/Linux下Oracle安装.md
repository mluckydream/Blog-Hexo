---
title: Linux下Oracle安装
date: 2019-01-07 22:03:33
layout: 
  - tags
  - categories
categories:
  - Guide
  - Linux
tags: 
  - Linux
  - Oracle
---



#### 1. 下载插件

在目前有网络的情况下下载如下插件，使用yum即可

libstdc++-devel(x86_64)

 libaio-devel(x86_64)

 gcc-c++(x86_64) 

elfutils-libelf-devel



进入/etc/sysconfig/network-scirpts/

看是否有ifcfg-eth0和ifcfg-eth1



hostnamectl set-hostname name01

Hostname



#### 2.添加组

```
groupadd oinstall
groupadd dba
useradd -g oinstall -G dba oracle
passwd oracle
TYPE THE PASSWORD
vim /etc/sysctl.conf
```



```
fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152
kernel.shmmax = 2147483648
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586
```



```
sysctl -p
sysctl -a
```



```
vim /etc/security/limits.conf
```



```
oracle soft nproc 2047
oracle hard nproc 16384
oracle soft nofile 1024
oracle hard nofile 65536
```



127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4 ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6



​    \#public ip

192.168.122.100  ym01 192.168.122.101  ym02

​    # Virtual

192.168.122.103  ym01-vip 192.168.122.104  ym02-vip

​    # private ip 

10.10.10.10 ym01-priv 10.10.10.20  ym02-priv

​    # Scan ip

192.168.122.105 rac-scan



#### 2、找出scsi的id号

/usr/lib/udev/scsi_id -g -u /dev/sdb #注意scsi_id的二进制文件路径

#### 3.安装

```
yum groupinstall -y "X Window System"
ssh -X oracle@192.168.33.15
```

cd /stage/grid



检查环境



./runcluvfy.sh stage -pre crsinst -n ym01,ym02 -fixup -verbose





```
./runInstaller
```

后面后弹出安装Oracle图形界面，根据提示走就好，大致流程如下



Skip software updates. => Advanced installation => Simplified Chinese => raw-scan ran-scan 1521 =>ym01-vip => eth0 eth1





**一、查看系统环境**

**内核版本：**

**[root@rh64 rules.d]# uname -a**

**Linux rh64 2.6.32-358.el6.x86_64 #1 SMP Tue Jan 29 11:47:41 EST 2013 x86_64 x86_64 x86_64 GNU/Linux**

**系统用户：**

**[root@rh64 rules.d]# id grid**

uid=400(grid) gid=400(asmadmin) groups=400(asmadmin)



**二、创建共享磁盘（可以采用分区或独立的磁盘）**

[root@rh64 ~]# fdisk -l

Disk /dev/sdc: 24.3 GB, 24323964928 bytes

255 heads, 63 sectors/track, 2957 cylinders

Units = cylinders of 16065 * 512 = 8225280 bytes

Sector size (logical/physical): 512 bytes / 512 bytes

I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk identifier: 0x00000000

**查看磁盘UUID:**

**[root@rh64 ~]# /sbin/scsi_id -g -u -d /dev/sdc**

**1ATA_VBOX_HARDDISK_VB3d5ccb5e-9c197b67**

** **

**scsi_id -gud /dev/sdc**

** **

**磁盘分区：**

**[root@rh64 ~]# fdisk -l**

Disk /dev/sdc: 24.3 GB, 24323964928 bytes

255 heads, 63 sectors/track, 2957 cylinders

Units = cylinders of 16065 * 512 = 8225280 bytes

Sector size (logical/physical): 512 bytes / 512 bytes

I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk identifier: 0xeb09f8d3

 Device Boot   Start     End   Blocks  Id System

**/dev/sdc1        1     915   7349706  83 Linux**

**/dev/sdc2       916    1830   7349737+ 83 Linux**

**/dev/sdc3      1831    2957   9052627+ 83 Linux**

**三、建立UDEV规则文件**

**[root@rh64 ~]# cd /etc/udev/rules.d/**

[root@rh64 rules.d]# ls

60-fprint-autosuspend.rules 60-raw.rules       80-kvm.rules  97-bluetooth-serial.rules

60-openct.rules       70-persistent-cd.rules  90-alsa.rules 98-kexec.rules

60-pcmcia.rules       70-persistent-net.rules 90-hal.rules  99-fuse.rules

**[root@rh64 rules.d]# cat 99-oracle-asmdisk.rules**

KERNEL=="sdc1", BUS=="scsi", PROGRAM=="/sbin/scsi_id -g -u -d /dev/$parent", RESULT=="1ATA_VBOX_HARDDISK_VB3d5ccb5e-9c197b67", NAME="asm_disk1", OWNER="grid", GROUP="asmadmin", MODE="0660"

KERNEL=="sdc2", BUS=="scsi", PROGRAM=="/sbin/scsi_id -g -u -d /dev/$parent", RESULT=="1ATA_VBOX_HARDDISK_VB3d5ccb5e-9c197b67", NAME="asm_disk2", OWNER="grid", GROUP="asmadmin", MODE="0660"

KERNEL=="sdc3", BUS=="scsi", PROGRAM=="/sbin/scsi_id -g -u -d /dev/$parent", RESULT=="1ATA_VBOX_HARDDISK_VB3d5ccb5e-9c197b67", NAME="asm_disk3", OWNER="grid", GROUP="asmadmin", MODE="0660"



**四、启动udev service**

**载入配置文件\****：**

**[root@rh64 rules.d]# udevadm control --reload-rules**

**启动udev service：**

**[root@rh64 rules.d]# start_udev**

Starting udev:

**查看asm disks：**

[root@rh64 rules.d]# ls -l /dev/asm*

**brw-rw---- 1 grid asmadmin 8, 33 Jan 13 16:52 /dev/asm_disk1**

**brw-rw---- 1 grid asmadmin 8, 34 Jan 13 16:52 /dev/asm_disk2**

**brw-rw---- 1 grid asmadmin 8, 35 Jan 13 16:52 /dev/asm_disk3**

** **

**--------至此，asm disk创建成功 ！**

1c3b15b1-cd13-4a73-b2a8-449fa3aa039f

babf62f1-d914-434c-a1a3-d323a01d1e81