import express from "express";
import conn from "./database.js";
import jwt from "jsonwebtoken";

const app = express();

// supaya folder "public" bisa diakses melalui server localhost:3000
app.use(express.static("public"));

// supaya bisa membaca req.body
app.use(express.json());

function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "rahasia", async (err, _decoded) => {
      if (!err) {
        next();
      } else {
        res.status(401).send("Token salah.");
      }
    });
  }else{
    res.status(401).send("token belum ada");
  }
}


//registrasi
app.post("/api/registrasi", async (req, res) => {
  console.log(req);
  await conn.query(
    `INSERT INTO registrasi VALUES (NULL, '${req.body.userr}', '${req.body.pass}' ,'${req.body.email}')`
  );
  res.send("data telah ditambahkan.");
});




//login




// //tambah satu
// app.post("/api/registrasi", async (req, res) => {
//   const rows = await conn.query(
//     ` SELECT * FROM registrasi('${req.body.user}','${req.body.pass}')`);
//   // res.send(rows);
//   // students.push(req.body);
//   res.send("data telah ditambahkan.");
// });
// //


app.post("/api/login", async (req, res) => {
  const rows = await conn.query(
    `SELECT * FROM registrasi WHERE user= '${req.body.user}'`
  );
  // console.log(rows[0]);
  console.log(rows)
  if (rows.length > 0) {
    if (req.body.pass === rows[0].pass) {
      const token = jwt.sign(rows[0], "rahasia");
      res.send(token);
    } else {
      res.status(401).send("Kata sandi salah.");
    }
  } else {
    res.status(401).send("Nama pengguna tidak ditemukan.");
  }
});
app.use(authMiddleware);
app.listen(3000, () => console.log("Server sedang berjalan."));
