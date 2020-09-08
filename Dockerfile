FROM nginx

COPY ./docs/ /usr/share/nginx/html/
COPY ./vhost.nginx.conf /etc/nginx/conf.d/vue-screen-lock.conf

EXPOSE 80