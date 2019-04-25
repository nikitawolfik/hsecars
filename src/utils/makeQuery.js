export default (params) => {
  const query = Object.keys(params).reduce( (pv, cv) => {
    if (pv === '?') {
      pv += `${cv}=${params[cv]}`;
    } else {
      pv += `&${cv}=${params[cv]}`;
    }
    return pv;
  }, '?');
  return query;
};
