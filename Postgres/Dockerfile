# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 123
ENV POSTGRES_DB tpdb

# Copy the SQL script to create the table into the container
COPY ./create_table1.sql /docker-entrypoint-initdb.d/
#COPY create_table2.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL default port (5432)
EXPOSE 5432