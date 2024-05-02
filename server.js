const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gearup_db",
});

app.listen(port, () => {
  console.log("Listening");
});

app.post("/add_customer", (req, res) => {
  const sql =
    "INSERT INTO customer_details (`name`,`email`,`phone`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.phone];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Customer added successfully" });
  });
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM product_details";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
