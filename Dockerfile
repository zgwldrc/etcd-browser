FROM golang:alpine AS s1
ADD ./genconf.go /genconf.go
WORKDIR /
RUN go build -o genconf .

FROM node:alpine AS fr
ADD ./package.json /app/package.json
RUN cd /app && npm install
ADD . /app
WORKDIR /app
RUN ./node_modules/@angular/cli/bin/ng build -prod

FROM alpine AS end
RUN apk update && apk add nginx openssl easy-rsa
RUN cd /etc/nginx && \
    sh /usr/share/easy-rsa/easyrsa init-pki && \
    sh /usr/share/easy-rsa/easyrsa --batch build-ca nopass && \
    sh /usr/share/easy-rsa/easyrsa --batch build-server-full server nopass
COPY --from=s1 /genconf /usr/bin/genconf
COPY ng-server.tmpl.conf /ng-server.tmpl.conf
COPY --from=fr /app/dist /html
RUN chmod u+x /usr/bin/genconf && mkdir /run/nginx
CMD genconf && exec nginx -g 'daemon off;'
EXPOSE 443 80