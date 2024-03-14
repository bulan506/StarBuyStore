# Description
With this example, you can create a Spring Boot application of type API REST for the local development environment, as well as run it on Docker.


## Local dev environment setup command in MAC
```bash
brew install maven 
mvn spring-boot:run
```

## Run the aplication in docker container
```bash
sudo docker build --load -t ucr/java-api-rest .
sudo docker stop springapi                                     
sudo docker rm springapi                                       
sudo docker run --name springapi -d -p 8080:8080 ucr/java-api-rest 
```
