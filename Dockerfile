FROM zzrot/alpine-caddy:latest

# Copy over a Caddyfile
COPY ./Caddyfile /etc/Caddyfile
COPY ./dist/build.js /var/www/html/dist/build.js
COPY ./index.html /var/www/html/index.html
