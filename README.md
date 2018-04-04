# two-phase-live-config

## Usage Example
```js
//Terminal
LIVELY_RESOLVERS="SECRET,HTTP,FILE,ENV" FILE="file:///Users/user/code/configs/config.json" HTTP="http://example.com" HTTP_INTERVAL=5000 SECRET="object://{\"foo\":\"bar\"}" ENV="env://" node index.js

//In code
var config = require("two-phase-live-config");
config.ready.then(() => {
  //config is ready
  //See LivelyConfig library for api
})
```

## Description
This library is to support config setup via command line rather than application level setup.

To Library will check environment variables first for a 'LIVELY_RESOLVERS' environment variable whose format is a comma separated list of Environment Variable Names, these names will be used to resolve the underlying config values

The order of resolvers in the LIVELY_RESOLVERS determines the priority of resolution

## Resolvers

### File
```js
{ENV_NAME}="file://{absolute_file_path}"
{ENV_NAME}_INTERVAL={NUMBER} (optional)
```

### Object
```js
{ENV_NAME}="object://{JSON_STRING}"
{ENV_NAME}_INTERVAL={NUMBER} (optional)
```

### Environment Variable
```js
{ENV_NAME}="env://"
{ENV_NAME}_INTERVAL={NUMBER} (optional)
```

### HTTP or HTTPS
```js
{ENV_NAME}="http://{url}"
{ENV_NAME}_INTERVAL={NUMBER} (optional)
{ENV_NAME}_HEADERS={JSON_STRING} (optional)
```
