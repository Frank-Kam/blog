---
title: "Docker 基礎教學 Part1"
description: "Docker 介紹和安裝"
pubDate: "2025-4-30 19:05:00"
category: "develop"
banner: "@images/posts/docker-guide_banner.webp"
tags: ["Docker"]
oldViewCount: 8084
oldKeywords: [""]
---
因為看到蠻多認識的人，連Docker都不會用，故做此篇

## Docker 是什麼？
具體原理和深入介紹請看[維基百科](https://en.wikipedia.org/wiki/Docker_(software))，~~懶得看也沒關係~~ </br>
我會說 Docker 就像一間公寓，每個 Containers 都在自己的房間裡做事，公寓外的土地可以當做底層的系統，負責所有 Containers or Services 的 I/O 吞吐

## "常見"名詞定義
- Containers (容器) -> 可以理解成 Docker 裡的最小單位
- Services (服務) -----> 一組容器
- Image (鏡像) --------> 類似模板，定義了容器和服務的關係

## 安裝 Docker
### Linux
#### Ubuntu (全部複製一起執行)
```bash
# apt update
sudo apt update && sudo apt upgrade -y

# 移除非官方 Docker
sudo apt remove docker docker-engine docker.io containerd runc -y

# 安裝套件
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 加入 Docker GPG Key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 加入 Docker 官方 source
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新 source 並安裝 Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 啟用並啟動 Docker
sudo systemctl enable docker
sudo systemctl start docker
``` 
#### Debian (全部複製一起執行)
```bash
# apt update
sudo apt update && sudo apt-get upgrade -y

# 移除非官方 Docker
sudo apt remove -y docker docker-engine docker.io containerd runc

# 安裝套件
sudo apt install -y ca-certificates curl gnupg lsb-release

# 加入 Docker GPG Key
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 加入 Docker 官方 source
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新 source 並安裝 Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 啟用並啟動 Docker
sudo systemctl start docker
sudo systemctl enable docker
```
### Windows (需要WSL2或Hyper-v)
[選擇適合的版本下載](https://docs.docker.com/desktop/setup/install/windows-install/) </br>
然後點開 xxx.exe 一直下一步

> macOS 和 FreeBSD 手邊剛好沒有就懶得寫了

## 測試
```bash
┬─[frank@Ub:~]
╰─>$ docker -v
Docker version 28.1.1, build 4eba377
```
有輸出以上畫面即可
</br>
</br>
</br>
> 資料來源： </br>
> [Docker Docs](https://docs.docker.com/)

</br>
</br>
</br>

> 系列文章： </br>
> [Part2](https://blog.frankk.uk/posts/docker-guide-2/) Docker 基本指令 </br>
> [Part3](https://blog.frankk.uk/posts/docker-guide-3/) Docker 服務實作 </br>
> [Part4](https://blog.frankk.uk/posts/docker-guide-4/) Dockerfile & Compose 檔案撰寫