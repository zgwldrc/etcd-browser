FROM golang:alpine AS s1
ADD ./genconf.go /genconf.go
WORKDIR /
RUN go build -o genconf .

FROM alpine
RUN apk update && apk add nginx openssl easy-rsa
RUN cd /etc/nginx && \
    sh /usr/share/easy-rsa/easyrsa init-pki && \
    sh /usr/share/easy-rsa/easyrsa --batch build-ca nopass && \
    sh /usr/share/easy-rsa/easyrsa --batch build-server-full server nopass
COPY --from=s1 /genconf /usr/bin/genconf
COPY ng-server.tmpl.conf /ng-server.tmpl.conf
RUN chmod u+x /usr/bin/genconf && genconf && cat /etc/nginx/conf.d/default.conf