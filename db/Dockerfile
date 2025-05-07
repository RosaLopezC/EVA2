FROM mysql:8.0.33
ENV MYSQL_ROOT_PASSWORD=rootpass
ENV MYSQL_DATABASE=ecommerce_db
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306