FROM nginx:alpine

# Copy the site files
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80