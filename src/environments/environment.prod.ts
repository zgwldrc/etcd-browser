export const environment = {
  production: true,
  get etcdEndPoint() {
    return location.host
  }
};
