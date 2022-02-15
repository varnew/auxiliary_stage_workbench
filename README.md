## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### vue-cli对webpack做了深度封装，通过下入指令可以打印出相关配置
```
vue inspect > cli-webpack.config.js 
```

### 内网穿透, 可将本地运行的服务映射到公网ip
```
dev-service: {
  ...
  disableHostCheck: true
  ...
}
```
```
  npm i localtunnel -g
  lt --port 8080 --host http://varnew.com:3000
```