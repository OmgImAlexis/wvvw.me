FROM mhart/alpine-node:latest
MAINTAINER Alexis Tyler <xo@wvvw.me>

RUN npm install --global yarn

RUN apk --no-cache add tini git openssh-client \
    && apk --no-cache add --virtual devs tar curl

# Install Caddy Server, and All Middleware
RUN curl "https://caddyserver.com/download/build?os=linux&arch=amd64&features=DNS%2Cawslambda%2Ccors%2Cexpires%2Cfilemanager%2Cgit%2Chugo%2Cipfilter%2Cjsonp%2Cjwt%2Clocale%2Cmailout%2Cminify%2Cmultipass%2Cprometheus%2Cratelimit%2Crealip%2Csearch%2Cupload%2Ccloudflare%2Cdigitalocean%2Cdnsimple%2Cdyn%2Cgandi%2Cgooglecloud%2Clinode%2Cnamecheap%2Crfc2136%2Croute53%2Cvultr" \
    | tar --no-same-owner -C /usr/bin/ -xz caddy

# Remove build devs
RUN apk del devs

WORKDIR /src
ADD . .

RUN yarn install --prefer-offline --production
RUN yarn build

# Copy over a Caddyfile and SPA files
RUN cp /src/Caddyfile /etc/Caddyfile
RUN mkdir -p /var/www/html/dist/ && mkdir /app
RUN cp /src/dist/build.js /var/www/html/dist/build.js
RUN cp /src/index.html /var/www/html/index.html
RUN cp /src/dist/favicon.* /var/www/html/

ADD nginx.conf.sigil .

EXPOSE 5000

ENTRYPOINT ["/sbin/tini"]

CMD ["caddy", "--conf", "/etc/Caddyfile"]
