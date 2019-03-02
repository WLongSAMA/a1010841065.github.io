# a1010841065.github.io
个人博客（ http://www.4dog.win ）的静像存档

### 运行环境:

[Git](https://git-scm.com/downloads)

[Node.js](https://nodejs.org)

### 环境配置:

```
#Git
git config --global user.email "邮箱"
git config --global user.name "用户名"

#Node.js
npm config set registry http://registry.npm.taobao.org/
npm install -g hexo-cli
```

### 使用方法:

```
#克隆源文件
git clone https://github.com/a1010841065/a1010841065.github.io.git

#进入源目录
cd a1010841065.github.io

#配置Hexo环境
npm install

#撰写文章
hexo new "文章标题"

#提交博客更改
hexo clean
hexo g -d

#提交源文件
git add .
git commit -m "更新内容"
git push
```

