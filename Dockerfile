FROM nginx
COPY public /usr/share/nginx/html
COPY ./h5.nginx /etc/nginx/conf.d/default.conf
COPY ./conf.nginx /etc/nginx/nginx.conf
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
 && echo Asia/Shanghai > /etc/timezone \
 && dpkg-reconfigure -f noninteractive tzdata
EXPOSE 80
