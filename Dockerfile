#Use uma imagem base do PostgreSQL
FROM postgres:latest

#Variáveis de ambiente
ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_DB mydatabase

#Copie o arquivo SQL de inicialização para o diretório de inicialização
COPY init.sql /docker-entrypoint-initdb.d/

#Exponha a porta padrão do PostgreSQL (opcional)
EXPOSE 5432