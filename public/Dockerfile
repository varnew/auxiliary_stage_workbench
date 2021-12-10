FROM openresty/openresty:alpine
RUN apk update \
 && apk upgrade \
 && apk add bash \
 && apk add git

# 系统设置(设置时区)
RUN rm -rf /etc/localtime \
 && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

#https
RUN git clone https://github.com/certbot/certbot \
 && cd certbot \
 && ./certbot-auto certonly --webroot --agree-tos -v -t --email varnew@163.com -w /usr/local/nginx/html/ -d www.varnew.com \
 && cd ../

RUN set -ex && \
    rm /etc/nginx/conf.d/default.conf

ADD ./nginx.conf /usr/local/openresty/nginx/conf/


RUN cd /
RUN mkdir data_nginx
RUN mkdir /data_nginx/auxiliary_stage_workbench
COPY ./ /data_nginx/auxiliary_stage_workbench

# 配置环境变量
ENV PROXY_FANYI https://v2.alapi.cn/api/fanyi
ENV PROXY_PASS https://api.jisuapi.com
ENV PROXY_SW http://120.77.244.40:38081
ENV PROXY_SERVICE http://varnew.com:3001

EXPOSE 8082
