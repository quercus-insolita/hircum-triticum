mkdir -p logs && \
docker-compose -f docker-compose-prd.yml build --no-cache parser && \
docker-compose -f docker-compose-prd.yml down --remove-orphans && \
docker-compose -f docker-compose-prd.yml up -d parser-auchan parser-aquamarket parser-fozzy && \
docker image prune -f
