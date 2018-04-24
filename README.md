# 如何使用？

## 使用方式 1

### Step1

```bash
git clone https://github.com/zgwldrc/etcd-browser.git
```

### Step2 (请直接使用npm源，而不要使用cnpm，网络问题请翻墙)

```bash
docker build -t etcd-browser .
```

### Step3

```bash
docker run -d -e ETCD_HOST="your etcd ip or host" -e ETCD_PORT="your port" \
[-e ETCD_HTTPS="true"] --name etcd-browser -P etcd-browser
```

## 使用方式 2

利用docker-compose.yml, 直接使用预先构建的docker镜像

```yml
version: "3"
services:
    browser:
        image: registry.cn-hangzhou.aliyuncs.com/xiayu/etcd-browser
        # publish ports can be 443 or 80    
        ports:
        #- "443:443"
        - "80:80"
        environment:
            ETCD_HOST: etcd
            ETCD_PORT: 2379
            # only set this when access via internal port 443
            #ETCD_HTTPS: "TRUE"

    etcd:
      image: quay.io/coreos/etcd
      volumes:
      - etcd-data:/etcd-data
      command: >
        /usr/local/bin/etcd --data-dir=/etcd-data --name node1
        --initial-advertise-peer-urls http://127.0.0.1:2380 --listen-peer-urls http://127.0.0.1:2380
        --advertise-client-urls http://127.0.0.1:2379 --listen-client-urls http://0.0.0.0:2379
        --initial-cluster node1=http://127.0.0.1:2380

volumes:
  etcd-data:
```

```bash
docker-compose up -d
```