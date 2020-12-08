module.exports = {
  client: {
    tagName: "gql",
    includes: ["./src/**/*.tsx"],
    service: {
      name: "yuber-eats-backend",
      url: "http://127.0.0.1:8000/graphql",
    },
  },
};
