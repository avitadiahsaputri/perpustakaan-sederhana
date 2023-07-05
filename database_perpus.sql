SELECT peminjaman.id_pinjam,anggota.nama,buku.kode_buku,buku.katagori,tgl_pinjam
FROM ((peminjaman INNER JOIN buku ON peminjaman.kode_buku = buku.kode_buku)
INNER JOIN anggota ON peminjaman.id_anggota = anggota.id_anggota);

INSERT INTO peminjaman VALUES (123,"2022-09-12","03","123");


