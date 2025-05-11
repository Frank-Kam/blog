---
title: "Docker 基礎教學 Part2"
description: "Docker 基本指令"
pubDate: "2025-5-11 13:15:00"
category: "develop"
banner: "@images/posts/docker-guide_banner.webp"
tags: ["Docker"]
oldViewCount: 8084
oldKeywords: [""]
---
如果還沒看過上篇教學的，點[這裡](https://blog.frankk.uk/posts/docker-guide/)

## 操作 Docker 的方式
~~當然學一種指令最快的方法是<code>man git</code>~~。docker-cli 故名思議是用來操作 Docker 的指令，而個人認為這是最直覺操作 Docker 的方法，當然還有其他方式，在這裡不做贅述，但還是列出常見的方式和學習資源。
- [docker-cli](https://docs.docker.com/reference/cli/docker/)
- [Docker Desktop](https://docs.docker.com/desktop/)
- [Portainer](https://docs.portainer.io/)
## 常見指令
權限不夠在前面加<code>sudo</code>，或加入到 Docker User Group
### ps
ps 在其他軟體的指令很常當做列出OOXX的意思，在 Docker 中也不例外 </br>
```bash
docker ps
```
> 列出目前在跑的所有 Services
```
docker compose ps
```
> 列出當前目錄下用 Compose 啟動的 Services



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