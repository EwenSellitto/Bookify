# =================##
##  DEVELOPPEMENT  ##
##=================#

FROM node:20-alpine AS dev

ENV NODE_ENV=development

WORKDIR /app

COPY . .

RUN npm install \
  && npx prisma generate

CMD ["npm", "run", "start:dev"]

# =========##
##  BUILD  ##
##=========#

FROM node:20-alpine AS build

COPY . .

RUN npm ci \
  && npx prisma generate \
  && npm run build \
  && npm prune --omit=dev;

# ==============##
##  PRODUCTION  ##
##==============#

FROM node:20-alpine AS production

ENV NODE_ENV=production

USER node

COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/prisma /app/prisma
COPY --chown=node:node --from=build /app/package*.json /app/

EXPOSE 5000

CMD ["./entrypoint.sh"]
