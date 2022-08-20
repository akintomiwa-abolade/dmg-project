# DMG Media Take Home Test
```
A backend service that consumes third party API and make it available for client to render.
```

# Quick Setup
``` 
 $ Start local Redis Server
 $ npm install
 $ npm run dev
```

## Caching
```
 $ All unique repository requests are cached to improve performance
```

## Retries
```
 $ Retries are executed twice, this sufficiently caters for intermittent access denied exception.
```

## Containerization
```
 $ I added a docker file for app containerization 
 $ Next run a docker build : "docker build . -t dmg-app:latest"
 $ And Finally : "docker run -p 5000:5000 -d dmg-app:latest"
```

# Running Test
```
 $ The application can be tested by running: npm test
```

## Documentation Using Open API
```
 $ The API Documentation can be found on the swagger link at http://localhost:5000/api-docs
```
http://localhost:5000/api-docs
