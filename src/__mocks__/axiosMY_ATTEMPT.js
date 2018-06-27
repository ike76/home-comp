const getEndPath = req => {
  const splitPath = req.split("/");
  const endPath = splitPath.slice(3, splitPath.length).join("/");
  return endPath;
};

export default {
  get: jest.fn(req => {
    return Promise.resolve({ data: `/${getEndPath(req)} was called` });
  }),
  post: jest.fn(req => {
    console.log("post req", req);
  })
};
