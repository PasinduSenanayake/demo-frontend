export const withBase = path => {
  return `${process.env.REACT_APP_BASE_URL}${path}`;
};
