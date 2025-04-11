FROM node:14

WORKDIR /app

COPY package*.json ./

# Cài tất cả dependencies trong package.json
RUN npm install

# Cài react-app-rewired (vì script "start" đang dùng nó)
RUN npm install -g react-app-rewired

# Copy toàn bộ source code vào image
COPY . .

CMD ["npm", "start"]
