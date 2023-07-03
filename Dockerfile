# This is the base of our final image, has nginx.
FROM nginx:1.19-alpine AS nginx-base
COPY nginx.conf /etc/nginx/nginx.conf

# Install jq and gawk.
# We need this to be able to overwrite config based on environment variables.
#RUN apk update && apk add jq=1.6-r1 gawk=5.1.0-r0

# This is the image we use to build the angular application.
FROM node:16-alpine AS node-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# create log dir configured in nginx.conf
RUN mkdir -p /var/log/app_engine
RUN npm run build

# Switch to the final runtime image.
FROM nginx-base AS final


# Copy and make the entrypoint script executable.
# This will be used to make sure we use the correct configuration (based on env variables).
#COPY --from=node-build /app/entrypoint.sh docker-entrypoint.d/40-entrypoint.sh
#RUN chmod +x docker-entrypoint.d/40-entrypoint.sh
#RUN ["chmod", "+xxx", "docker-entrypoint.d/40-entrypoint.sh"]
#RUN chmod -rwxrwxr-x docker-entrypoint.sh
# Copy the outputs from the build.
COPY --from=node-build /app/dist/shrink-analyzer-ui /usr/share/nginx/html
COPY --from=node-build /var/log/app_engine /var/log/app_engine

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/envconfig.template.js > /usr/share/nginx/html/assets/envconfig.js && exec nginx -g 'daemon off;'"]
