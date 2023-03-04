import express from "express";

const port = 8080;

const app = express();

const users = [
  { id: 1, user: "user1", edad: 18 },
  { id: 2, user: "user2", edad: 54 },
  { id: 3, user: "user3", edad: 29 },
];

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const findUser = users.find((u) => u.id === userId);

  if (!findUser) {
    res.send("User not existent");
  } else {
    res.send(findUser);
  }
});

app.listen(port, () => {
  console.log("Listen port 8080");
});
