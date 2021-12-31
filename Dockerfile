FROM node:17.0-alpine
ENV NODE_ENV=production
WORKDIR /backend
COPY ./backend .
RUN yarn
WORKDIR /frontend
COPY ./frontend .
RUN yarn
#ENV ZRPOKE_URL="ds1423.tmddedicated.com"
#ENV ZRPOKE_PORT=3030
EXPOSE 3000 3030
COPY ./run.sh /bin/run.sh
CMD ["sh","/bin/run.sh"]