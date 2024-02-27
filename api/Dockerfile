## Selecciona una imagen base de Ubuntu
FROM maven:3.9.6-eclipse-temurin-11 AS build

# Actualiza el índice de paquetes e instala software-properties-common para poder agregar repositorios
RUN apt-get update && apt-get install -y software-properties-common

# Agrega el repositorio de Java 21
RUN add-apt-repository ppa:linuxuprising/java

# Actualiza el índice de paquetes nuevamente
RUN apt-get update

# Instala Java 21 automáticamente aceptando la licencia
RUN echo oracle-java17-installer shared/accepted-oracle-license-v1-3 select true | debconf-set-selections && \
    apt-get install -y oracle-java17-installer

# Establece las variables de entorno para Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-oracle
ENV PATH="$JAVA_HOME/bin:${PATH}"

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo pom.xml para descargar las dependencias
COPY pom.xml .
RUN mvn --version
# Descarga las dependencias definidas en el pom.xml (esto se hace por separado para aprovechar el almacenamiento en caché de Docker)
RUN mvn dependency:go-offline -B

# Copia todo el código fuente al directorio de trabajo
COPY src ./src

# Exponer el puerto en el que la aplicación Spring Boot se ejecutará dentro del contenedor (puerto 8080 por defecto de Tomcat)
EXPOSE 8080

# Inicia automáticamente Tomcat cuando se inicie el contenedor
CMD [ "mvn", "org.springframework.boot:spring-boot-maven-plugin:run"]