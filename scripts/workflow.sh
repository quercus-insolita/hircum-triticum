docker-compose build --no-cache parser && \
docker-compose down && \
docker-compose up -d parser && \
docker image prune -f
