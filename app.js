const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

app.use(express.static("public"));

const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "$2a$10$JgD.FDPqI9O.fWg9p.1zxeG8A4C5C5DCa2g6cmw5GLOpQwdoJDb16",
  },
];

const SECRET_KEY = "your_secret_key";

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const payload = {
    userId: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });
  res.json({ token });
});

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
}

app.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
