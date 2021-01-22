mkdir -p logs && \
docker-compose -f docker-compose-prd.yml build --no-cache parser && \
docker-compose -f docker-compose-prd.yml down && \
docker-compose -f docker-compose-prd.yml up -d parser && \
docker image prune -f
