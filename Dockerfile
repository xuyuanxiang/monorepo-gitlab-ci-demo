FROM nginx
COPY ./packages/components/public /usr/share/nginx/html
COPY ./packages/example/public/index.html /usr/share/nginx/html/example.html
COPY ./h5.nginx /etc/nginx/conf.d/default.conf
COPY ./conf.nginx /etc/nginx/nginx.conf
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
 && echo Asia/Shanghai > /etc/timezone \
 && dpkg-reconfigure -f noninteractive tzdata
EXPOSE 80
