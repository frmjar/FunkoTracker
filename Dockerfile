# Usa una imagen base con Node.js y Playwright
FROM mcr.microsoft.com/playwright:focal

# Configura el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si lo tienes)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que utiliza tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
