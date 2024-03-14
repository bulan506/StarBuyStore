# Description
With this example, you can create a C# API REST for the local development environment, as well as run it on Docker.


## Run the aplication in docker container
```bash
sudo docker build --load -t ucr/csharp-api-rest .
sudo docker stop csharpapi                                     
sudo docker rm csharpapi                                       
sudo docker run --name csharpapi -d -p 8081:8080 ucr/csharp-api-rest 
```
