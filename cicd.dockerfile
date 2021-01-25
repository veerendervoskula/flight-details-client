FROM 237579344283.dkr.ecr.eu-west-1.amazonaws.com/nodejs-base:10.18.0

USER root

RUN chown node:node /usr/src/app

COPY ./templates/ ./templates/

USER node
WORKDIR /usr/src/app/templates


CMD ["start"]