# Build N Run Container with DB Container
# 2020. 09. 18 Zini

### You MUST RUN Database Container First ###

docker_username=""
container_name=""
image_name=""
db_container_name=""
version=""
host_port=3000
virtual_port=3000

echo "## Automation docker build and run ##"

# remove container
echo "=> Remove previous container..."
docker rm -f ${container_name}

# remove image
echo "=> Remove previous image..."
docker rmi -f ${docker_username}/${image_name}:${version}

# new-build/re-build docker image
echo "=> Build new image..."
docker build --tag ${docker_username}/${image_name}:${version} .

# Run container connected to existing database container
echo "=> Run container..."
docker run -t -d --name ${container_name} -p ${host_port}:${virtual_port} --link ${db_container_name}:db -e DATABASE_HOST=db ${docker_username}/${image_name}:${version}
