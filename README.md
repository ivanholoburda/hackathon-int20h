# Produciton
## This is project is already in production and you can test it out with your own!
### http://34.59.234.46/
### Admin page access:
```
http://34.59.234.46/
Username: admin@admin.com
Password: Secret123!
```

### Installing using Docker

> You need to have [docker](http://www.docker.com) (1.17.0+) and
> [docker-compose](https://docs.docker.com/compose/install/) (1.14.0+) installed.

## You can install the application using the following commands:

### Firstly you need to clone the project and do some basic setup of the .env file:

```sh
git clone *repository name*
cd *folder*
cp .env.example .env
npm install
npm run build or npm run dev
```

### You need to configure the env and change the variables (configure pusher and github OAuth especially)

### Build the project using following commands
```
docker exec -it laravel_app composer remove backpack/devtools
docker exec -it laravel_app composer install
docker exec -it laravel_app php artisan key:generate
docker exec -it laravel_app php artisan storage:link
docker exec -it laravel_app php artisan migrate
docker exec -it laravel_app npm install
docker exec -it laravel_app npm run build
```
### Go to http://localhost and you will see the main page

## Creating an admin user
### When your project have been successfuly installed, you probably would like to acces the admin panel
To do it you can run and fill out the information
```
docker exec -it laravel_app php artisan app:create-admin
```
