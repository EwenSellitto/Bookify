# Utiliser l'image officielle Node.js pour construire le projet
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier tous les fichiers et construire l'application
COPY . .
RUN npm run build

# Utiliser une image Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
