export HIRCUM_TRITICUM_ENV=prd && \
export HIRCUM_TRITICUM_PORT=80 && \
docker-compose build --no-cache parser && \
docker-compose down && \
docker-compose up -d parser
