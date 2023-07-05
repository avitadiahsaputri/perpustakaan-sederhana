fetch("/api/anggota")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement("tr");

      const tdAnggota = document.createElement("td");
      tdAnggota.textContent = data[i].id_anggota;
      tr.appendChild(tdAnggota);

      const tdNama = document.createElement("td");
      tdNama.textContent = data[i].nama;
      tr.appendChild(tdNama);

      const tdJk = document.createElement("td");
      tdJk.textContent = data[i].jenis_kelamin;
      tr.appendChild(tdJk);

      const tdTgl = document.createElement("td");
      tdTgl.textContent = data[i].tgl_lahir;
      tr.appendChild(tdTgl);

      const tdAlamat = document.createElement("td");
      tdAlamat.textContent = data[i].alamat;
      tr.appendChild(tdAlamat);

      const tdTlp = document.createElement("td");
      tdTlp.textContent = data[i].no_tlp;
      tr.appendChild(tdTlp);

      const tdEdit = document.createElement("td");
      const anchorEdit = document.createElement("span");
      anchorEdit.textContent = "Edit";
      tdEdit.appendChild(anchorEdit);

      const tdDelete = document.createElement("td");
      const buttonDelete = document.createElement("button");
      buttonDelete.textContent = "Hapus";
      buttonDelete.className = "delete";

      buttonDelete.onclick = (e) => {
        e.preventDefault();
        if (
          confirm(
            `Apakah Anda yakin ingin menghapus ${data[i].judul_buku} (${data[i].kode_buku})?`
          )
        ) {
          fetch(`/api/anggota/${data[i].id_anggota}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          location.reload();
        }
      };
      tdEdit.appendChild(tdDelete);
      tdDelete.appendChild(buttonDelete);
      tr.appendChild(tdDelete);

      table.appendChild(tr);
    }
  });

document.anggota.onsubmit = async (e) => {
  e.preventDefault();
  fetch("/api/tambah", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: document.anggota.kode.value,
      nama: document.anggota.namaAnggota.value,
      jk: document.anggota.jenisKelamin.value,
      ttl: document.anggota.t_tanggalLahir.value,
      alamat: document.anggota.alamat.value,
      telepon: document.anggota.tlpn.value,
    }),
  });
  location.reload();
};
