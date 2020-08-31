FROM node:10.17.0-alpine as BASE
ENV iasModule="ias-mailer"
WORKDIR /$iasModule
COPY index.js package.json package-lock.json .npmrc /$iasModule/
COPY src ./src
RUN apk --no-cache add ca-certificates \
      git \
      openssh-client \
      bash \
      python \
      make \
      g++ \
    && adduser -u 1501 -g $iasModule -s /bin/bash -D -h /$iasModule $iasModule \
    && chown -R $iasModule:$iasModule /$iasModule
USER $iasModule
################################################################################
FROM BASE as TESTER
COPY .snyk .eslintrc.js ./
RUN npm install --only=prod \
    && npm install --only=dev \
    && npm run test
################################################################################
FROM BASE as BUILDER
RUN npm install --production 
################################################################################
FROM node:10.16.0-alpine
ENV iasModule="ias-mailer"
WORKDIR /$iasModule
COPY --from=BUILDER /$iasModule/index.js ./
COPY --from=BUILDER /$iasModule/node_modules ./node_modules
COPY --from=BUILDER /$iasModule/src ./src
ADD config/.env ./config/.env
RUN adduser -u 1501 -g $iasModule -D -h /$iasModule $iasModule \
    && chown -R $iasModule:$iasModule /$iasModule
USER $iasModule
CMD node ./index.js
