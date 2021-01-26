mkdir -p logs && \
docker-compose -f docker-compose-prd.yml build --no-cache parser api && \
docker-compose -f docker-compose-prd.yml down --remove-orphans && \
docker-compose -f docker-compose-prd.yml up -d parser-auchan parser-aquamarket parser-fozzy api && \
docker image prune -f
