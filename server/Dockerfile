FROM node:20-alpine AS dev

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS build

COPY . .

RUN npm install --production

RUN npm run build

FROM build AS production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 5000

CMD ["node", "/app/dist/main.js"]
