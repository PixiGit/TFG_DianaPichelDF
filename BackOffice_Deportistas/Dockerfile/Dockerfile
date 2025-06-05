FROM mcr.microsoft.com/windows/servercore:ltsc2022

RUN powershell -Command \
  Invoke-WebRequest -UseBasicParsing -Uri https://nodejs.org/dist/v22.1.0/node-v22.1.0-x64.msi -OutFile node.msi; \
  Start-Process msiexec.exe -ArgumentList '/quiet /norestart /i node.msi' -Wait; \
  Remove-Item -Force node.msi

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]