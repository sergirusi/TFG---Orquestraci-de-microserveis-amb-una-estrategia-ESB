# Use Node v4 as the base image.
FROM node:4

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# Expose our server port.
EXPOSE 8000

# Run our app.
CMD ["node", "/app/index.js"]
