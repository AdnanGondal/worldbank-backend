# worldbank-backend

Backend for World for Women frontend [here](https://github.com/gsinghlak12/worldbank).

## API

| Method | URI                  | Parameters               | Description                                               | Status |
| ------ | -------------------- | ------------------------ | --------------------------------------------------------- | ------ |
| POST   | /api/users           | Body: username, password | User registration; checks if user exists in the database. | Done   |
| POST   | /api/users/verify    | Body: username, password | Check username and password match                         | To Do  |
| POST   | /api/sessions        | Body: username, password | Add a user session and send cookie                        | To Do  |
| GET    | /api/sessions/cookie |                          | Check cookie exists                                       |        |

## Running Locally

Run the app locally:

```

npm install

docker-compose -f docker-compose-pg.yml

psql -U postgres

CREATE DATABASE worldbank

node schema.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
