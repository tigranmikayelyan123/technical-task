# This is a simple project which provides a REST API with authorization and authentication mechanism, file upload and download functionality and pagination when fetching all files

## Getting started

### Required technologies:

[NodeJS 16.x](https://nodejs.org/en/download/)

[docker v20.x](https://docs.docker.com/engine/install)

[docker-compose v1.29.x](https://docs.docker.com/compose/install)

1. Install Dependencies (run script in the root directory)

   ```bash
   npm install
   ```

2. Create environment configs

   ```bash
   cp .env.example .env
   ```

3. Run docker services

   - For initialize

   ```bash
   docker run --name <yourcontainername> -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<yourpassword> -d mysql:8.0.30
   ```

   - Connect to the database

   ```bash
   docker exec -it <yourcontainername> bash
   ```

      and type

   ```bash
   mysql -u root -p
   ```

   - You need to create custom database user to access the database from the app

   ```bash
   CREATE USER 'yourusername'@'%' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
   ```

   - Grant all priveleges on all databases for the user

   ```bash
   GRANT ALL PRIVILEGES ON * . * TO 'yourusername'@'localhost';
   FLUSH PRIVILEGES;  
   ```

4. Run the development server

   ```bash
   yarn start
   ```
