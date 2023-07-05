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
  } else {
    res.status(401).send("token belum ada");
  }
}


//registrasi
app.post("/api/registrasi", async (req, res) => {
  await conn.query(
    `INSERT INTO registrasi VALUES (NULL, '${req.body.email}', '${req.body.userr}' ,'${req.body.pass}')`
  );
  res.send("data telah ditambahkan.");
});
//tampil buku
app.get("/api/buku", async (req, res) => {

  const rows = await conn.query(
    `SELECT * FROM buku `
  );
  res.send(rows);
});

//tambah buku
app.post("/api/tambah", async (req, res) => {
  console.log(req.body);
  await conn.query(`INSERT INTO buku VALUES ('${req.body.kode}', '${req.body.judul}','${req.body.pengarangg}','${req.body.penerbitt}','${req.body.katagori}','${req.body.tahunn}')`);
})


//tampil anggota
app.get("/api/anggota", async (req, res) => {

  const rows = await conn.query(
    `SELECT * FROM anggota `
  );
  res.send(rows);
});

//tambah anggota/api/anggota
app.post("/api/anggota", async (req, res) => {
  console.log(req.body);
  await conn.query(`INSERT INTO anggota VALUES ('${req.body.id}', '${req.body.nama}','${req.body.jenisKlm}','${req.body.tgl}','${req.body.alamat}','${req.body.telepon}')`);
})

//hapus anggota
app.delete("/api/anggota/:id_anggota", async (req, res) => {
  console.log(req.params);
  await conn.query(`DELETE FROM anggota WHERE id_anggota = '${req.params.id_anggota}'`);
  res.send("Mahasiswa telah dihapus.");

});
//hapus buku
app.delete("/api/buku/:kode_buku", async (req, res) => {
  console.log(req.params);
  await conn.query(`DELETE FROM buku WHERE kode_buku = '${req.params.kode_buku}'`);
  res.send("Mahasiswa telah dihapus.");

});



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


app.get("/api/anggota/:anggota", async (req, res) => {
  const data = await conn.query(`select * from anggota where id_anggota = ${req.params.anggota}
  `);
  res.send(data[0]);
});

app.put("/api/anggota/:anggota", async (req, res) => {
  const data = await conn.query(`update anggota set nama = "${req.body.nama}",jenis_kelamin = "${req.body.jenisKlm}",
  tgl_lahir = "${req.body.tgl}" , no_tlp = "${req.body.telepon}" WHERE id_anggota = "${req.params.anggota}"`);
})

app.put("/api/buku/:buku", async (req, res) => {
  console.log(req.params.buku);
  await conn.query(`update buku set judul_buku = "${req.body.nama}",katagori = "${req.body.kategori}",pengarang = "${req.body.pengarang}",
   penerbit = "${req.body.penerbit}",tahun_terbit = "${req.body.tahun}" WHERE kode_buku = "${req.params.buku}"`);
})

app.get("/api/buku/:buku", async (req, res) => {
  const data = await conn.query(`SELECT * from buku WHERE kode_buku = "${req.params.buku}"`);
  res.send(data[0]);
});

app.post("/api/buku/", async (req, res) => {
  await conn.query(`insert into buku values("${req.body.id}","${req.body.nama}","${req.body.jenis}","${req.body.tgl}","${req.body.penerbit}","${req.body.tahunTerbit}")`);
});

///peminjaman//
app.get("/api/pinjam/", async (req, res) => {
  const data = await conn.query(`SELECT peminjaman.id_pinjam,anggota.nama,buku.judul_buku,tgl_pinjam
  FROM ((peminjaman INNER JOIN buku ON peminjaman.kode_buku = buku.kode_buku)
  INNER JOIN anggota ON peminjaman.id_anggota = anggota.id_anggota)`);
  res.send(data);
})

app.post("/api/tam_pinjam/", async (req, res) => {
  console.log(req.body);
  await conn.query(`insert into peminjaman values("${req.body.id_pinjam}","${req.body.tgl_pinjam}","${req.body.kode_buku},"${req.body.id_anggota}")`);
});



app.delete("/api/pinjamm/:id_pinjam", async (req, res) => {
  console.log(req.params);
  await conn.query(`DELETE FROM peminjam WHERE id_pinjam = '${req.params.id_pinjam}'`);
  res.send("data berhasil dihapus.");

});
app.use(authMiddleware);


app.listen(3000, () => console.log("Server sedang berjalan."));

