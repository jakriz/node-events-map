# Real-time Events Map
This is a simple [node.js](https://nodejs.org/) application which displays a location extracted from an IP address to all connected clients in real time on the world map. This app can be used, for example, to show your users' activity around the world.

The application uses [express.js](http://expressjs.com/) framework and [socket.io](http://socket.io/) to push the events to the client. The geolocation of IP addresses is done using a free database from [maxmind](https://www.maxmind.com).

## How to run
The app listens to new events at endpoint `events/` which is protected by HTTP Basic auth with credentials set in `config/default.json` (by default set to username `admin` and password `admin`).

To show sample data on the map you can also run `ruby mock_events.rb` which generates and posts random IP addresses in random intervals.

### With docker
1. Download a `mmdb` database file from maxmind and put it in `mmdb/GeoLite2-City.mmdb`
http://dev.maxmind.com/geoip/geoip2/geolite2/
2. Run command `docker-compose up`

### Manually
1. Install [node](https://nodejs.org/) and [npm](https://www.npmjs.com/)
2. Install npm dependencies `npm install`
3. Install [MongoDB](https://docs.mongodb.org/manual/installation/) and start it
4. Download a `mmdb` database file from maxmind and put it in `mmdb/GeoLite2-City.mmdb`
http://dev.maxmind.com/geoip/geoip2/geolite2/
5. Specify environment variables used to connect to MongoDB and start the server, e.g. `MONGO_PORT_27017_TCP_ADDR=localhost MONGO_PORT_27017_TCP_PORT=27017 npm start npm start`

## How to deploy
For easy production deployment you can use [docker](https://www.docker.com/) with the included `Dockerfile` and `docker-compose`. To run in production, use the included production file, e.g.

    docker-compose -f docker-compose.yml -f production.yml up -d

You can specify the `/events` endpoint credentials for production in `config/production.json`.
