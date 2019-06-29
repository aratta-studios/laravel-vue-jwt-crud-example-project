<p align="center">
<img height="300px" src="https://github.com/Esperlos/laravel_esperlos_boilerplate/blob/master/eperlos_laravel_logo.png?raw=true">
</p>

## Laravel Vue Jwt Example Project
This project is an example for this tutorial:
https://medium.com/aratta-studios/easy-jwt-authentication-crud-using-laravel-vue-js-mysql-cdee952f8c87?source=---------2------------------


# Setup

```
composer install
npm install
```

make a .env file and set your db

then
```
php artisan key:generate
php artisan jwt:secret
```

# Usage

Run the backend
```
php artisan serve
```

Run the front-end
```
npm run watch
```

Browse the website using
http://localhost:8000