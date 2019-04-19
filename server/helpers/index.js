module.exports.getTokenFromHeaders = headers => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');

    if (parted[1]) {
      return parted[1];
    }
  }
  return null;
};
