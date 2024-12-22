---
title: "如何避免被監控(反鑑識)-持續更新"
description: "政府或網路服務供應商監控用戶或人民的手段越來越多和密集，如何避免被監控是個重要議題"

draft: false
slug: "protect-how"
cascade:
  showDate: false
  showAuthor: false
  invertPagination: true
---
> 這篇是從我之前HackMD搬過來的

## 會介紹這幾個層面的安全
* 網路層面
* 操作系統層面
* 附近裝置可能不安全
* 社會工程學層面
* 其他要注意的
## 網路層面
* Tor
* DNScrypto
* HTTPS
* 
### 什麼是Tor
又叫做"洋蔥路由"
根據[維基百科](https://zh.wikipedia.org/zh-tw/Tor)
```
Tor通過一種叫做路徑選擇演算法的方式自動在網路中選擇3個Tor節點，這三個節點分別叫做入口節點（Guard relay）、中間節點（Middle relay）和出口節點（Exit relay）
```
```
資料首先在使用者端連續加密三層，而三個中繼各自解密一層，這樣它們就能知道接下來把資料傳送給誰。
```
近年來，有些組織featured(據說包括CIA)架設了自己(不安全)的出口節點
而如果你訪問的網站沒有HTTPS等保護，出口節點會知道你的封包內容
會在"其他要注意的"來講解
#### 從Tor瀏覽器層面實現匿名
1. 先下載Tor瀏覽器
下載[連結](https://www.torproject.org/zh-TW/download/)
