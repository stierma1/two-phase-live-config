
var LivelyConfig = require("lively-config").LivelyConfig;

var config1 = new LivelyConfig();

config1.usingEnvironmentVars().finalize();

var configSources = config1.getNamedValue("LIVELY_RESOLVERS");

if(configSources === null){
  throw new Error("No Environment Variable 'LIVELY_RESOLVERS' found")
}
var configResolvers = configSources.split(",");
if(configResolvers[0] === ""){
  configResolvers = [];
}
var fileRegex = /^file:\/\/(.*)/;
var httpRegex = /^https?:\/\/(.*)/;
var objectRegex = /^object:\/\/(.*)/;

var resolvers = configResolvers.map((val) => {
  var resolverEnvValue = config1.getNamedValue(val);
  //var resolverEnvValue = config1.getNamedValue(resolverEnvValue);
  //console.log(resolverEnvValue, objectRegex.test(resolverEnvValue))
  if(fileRegex.test(resolverEnvValue)){
    return {
      raw:val,
      value: fileRegex.exec(resolverEnvValue)[1],
      resolverName: val,
      interval: parseInt(config1.getNamedValue(val + "_INTERVAL")) || undefined,
      type:"file"
    }
  } else if(httpRegex.test(resolverEnvValue)){
    return {
      raw:val,
      value: httpRegex.exec(resolverEnvValue)[0],
      resolverName: val,
      headers: config1.getNamedValue(val + "_HEADER") || undefined,
      interval: parseInt(config1.getNamedValue(val + "_INTERVAL")) || undefined,
      type:"http"
    }
  } else if(objectRegex.test(resolverEnvValue)){
    return {
      raw:val,
      value: objectRegex.exec(resolverEnvValue)[1],
      resolverName: val,
      interval: parseInt(config1.getNamedValue(val + "_INTERVAL")) || undefined,
      type:"object"
    }
  } else {
      throw new Error("Resolver not formated: " + val)

  }
});

var config2 = new LivelyConfig();

for(var resolver of resolvers){
  switch(resolver.type){
    case "object": config2.usingObject(JSON.parse(resolver.value));
      break;
    case "http": config2.usingHttp(resolver.value, resolver.headers ? JSON.parse(resolver.headers) : {}, resolver.interval)
      break;
    case "file": config2.usingFile(resolver.value, resolver.interval);
      break;
  }
}

config2.finalize();

module.exports = config2;
/*
config2.ready.then(() => {
  console.log(config2.getNamedValue("bob"));
  console.log(config2.getNamedValue("ip"));
})*/
