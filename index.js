const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql2.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12786587",
  password: "vVYrAGUcQ7",
  database: "sql12786587"
});

// CREATE student
app.post("/ss", (req, res) => {
  let sql = "insert into student values(?, ?, ?)";
  let data = [req.body.rno, req.body.name, req.body.marks];
  con.query(sql, data, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

// READ students
app.get("/gs", (req, res) => {
  let sql = "select * from student";
  con.query(sql, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

// DELETE student
app.delete("/ds", (req, res) => {
  let sql = "DELETE FROM student WHERE rno = ?";
  let data = [req.body.rno];

   con.query(sql, data, (error, result) => {
    if (error)		res.send(error);
    else 		res.send(result);
  });
});

// UPDATE student
app.put("/us", (req, res) => {
  console.log("UPDATE DATA:", req.body);
  let sql = "UPDATE student SET name = ?, marks = ? WHERE rno = ?";
  let data = [req.body.name, req.body.marks, req.body.rno];

  con.query(sql, data, (error, result) => {
    if (error) {
      console.error("Update Error:", error);
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});


app.listen(9000, () => {
  console.log("server running at http://localhost:9000");
});
