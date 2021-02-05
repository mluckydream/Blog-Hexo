---
title: VScode常用快捷键整理
date: 2018-10-07 22:38:52
layout: 
  - tags
  - categories
categories:
  - Mac
  - VScode
tags: VScode
---

#### 官方文档

[VScode 快捷键速查 ( windows )](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
[VScode 快捷键速查( mac )](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)


##### 快捷键和平台无关，思想一致，本文主要以 Mac 为主，常用快捷键不断更新中...

####  **常用快捷键**   

| 快捷键                         | 功能                           |
| ------------------------------ | ------------------------------ |
| ⌘/                             | Toggle Line Comment（行注释）  |
| ⇧⌥A                            | Toggle Block Comment（块注释） |
| Option + 左右方向键            | 以单词为颗粒度跳动             |
| Option + 左右方向键 + Shift 键 | 选中光标前/后所有字符          |
| Cmd+ 左方向键                  | 移至行首 (Home）/行尾（End）   |
| Cmd/Ctrl  + Shift + \          | 代码块间的光标移动             |
| fn + delete                    | 删除右侧字符                   |


#### VScode快捷键入门

 -  **命令面板**是个很重要的存在，它是所有快捷键的主要交互界面。
 那么，如何使用它呢？ 
 ⌘⇧P   打开命令面板，搜索 shell 指令：在 PATH 中安装 “Code” 命令并执行，重启模拟器。现在，在终端输入 `code -help`就可以看到VScode所支持的所有参数。![cosw --help](https://img-blog.csdnimg.cn/20190719101252596.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dsb3JpYV9tNjY2,size_16,color_FFFFFF,t_70)
 这时，如果你想打开文件，可以在终端输入 `code -r` 打开vscode，进行窗体的复用。你也可以使用参数 -g <fle:line[:character]> 打开文件，然后滚动到文件中某个特定的行和列。