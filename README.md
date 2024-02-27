# Description
General setup with Podman

## Docker setup
```bash
brew uninstall podman
brew install podman
podman machine stop
podman machine rm podman-machine-default
podman machine init
podman machine set --rootful
podman machine start
sudo alias docker=podman
```

## Kubernetes setup
```bash
minikube start --driver=podman 
minikube config set driver podman

```

Please create the images from the Docker files in each of nested examples
## Docker setup
```bash
minikube image load docker.io/ucr/react/my-app:latest
minikube image load docker.io/ucr/csharp-api-rest:latest
minikube image load docker.io/ucr/java-api-rest:latest
minikube cache list
```