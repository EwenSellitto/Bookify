# Utiliser l'image officielle Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier tous les fichiers
COPY . .

# Exposer le port 5000
EXPOSE 5000
CMD ["node", "server.js"]
