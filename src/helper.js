export const getApi = () => {
  const REACT_APP_STAGE = process.env.REACT_APP_STAGE
  return REACT_APP_STAGE === 'dev'
    ? 'https://ycz8eklv0d.execute-api.us-east-2.amazonaws.com/dev/graphql'
    : REACT_APP_STAGE === 'alpha'
      ? 'https://wgn6mdwplf.execute-api.us-east-2.amazonaws.com/alpha/graphql'
      : REACT_APP_STAGE === 'beta'
        ? 'https://5rrwqnuc98.execute-api.us-east-2.amazonaws.com/beta/graphql'
        : REACT_APP_STAGE === 'prod'
          ? 'https://jfkbhc8dbl.execute-api.us-east-2.amazonaws.com/prod/graphql'
          : 'http://localhost:4000/graphql'
}

export const getSubFilters = (filter, filterCount) => {
  const obj = {}
  Object.keys(filter).filter(key => {
    return filter[key].length !== filterCount[key]
  }).forEach(key => {
    obj[key] = filter[key]
  })
  return obj
}
