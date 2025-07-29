# backend/Dockerfile
FROM node:22.1.0

WORKDIR /app

COPY . .

RUN npm install

# Auto generate + migrate
# RUN npm run db:generate && npm run db:migrate

EXPOSE 5000

CMD ["npm", "run", "start"]
