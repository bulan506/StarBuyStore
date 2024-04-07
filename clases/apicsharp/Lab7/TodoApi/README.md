
dotnet add package MySqlConnector --version 2.3.6


docker pull mysql
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag