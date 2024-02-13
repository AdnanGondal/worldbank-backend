# worldbank-backend

Backend for World for Women frontend [here](https://github.com/gsinghlak12/worldbank).

## API

| Method | URI                  | Parameters               | Description                                               | Status |
| ------ | -------------------- | ------------------------ | --------------------------------------------------------- | ------ |
| POST   | /api/users           | Body: username, password | User registration; checks if user exists in the database. | Done   |
| POST   | /api/users/sessions    | Body: username, password | Check username and password match                       | Done   |
| GET    | /api/sessions/cookie |                          | Check cookie exists                                        | Done |
| GET    | /api/countries |                                | Get a list of countries in the worldbank database          | Done |
| GET    | /api/indicators |                                | Get a list of indicators in the worldbank database        | DONE |
| GET    | /api/:indicator/countries/:country |     | Get an indicator plot for a given country         | DONE |
| GET    | /api/:indicator/countries/:country1?country2|                                | Get plot of two countries     | TO DO |



## Running Locally

Run the app locally:

```

npm install

docker-compose -f docker-compose-pg.yml up

psql -U postgres (on docker container terminal)

CREATE DATABASE worldbank (first time only)

node schema.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
