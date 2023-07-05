const book = document.querySelector(".activity");
fetch("/api/buku")
  .then((response) => response.json())
  .then((data) => {
    const table = document.querySelector("table");

    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement("tr");

      const tdBuku = document.createElement("td");
      tdBuku.textContent = data[i].kode_buku;
      tr.appendChild(tdBuku);

      const tdJudul = document.createElement("td");
      tdJudul.textContent = data[i].judul_buku;
      tr.appendChild(tdJudul);

      const tdPengarang = document.createElement("td");
      tdPengarang.textContent = data[i].pengarang;
      tr.appendChild(tdPengarang);

      const tdPenerbit = document.createElement("td");
      tdPenerbit.textContent = data[i].penerbit;
      tr.appendChild(tdPenerbit);

      const tdKatagori = document.createElement("td");
      tdKatagori.textContent = data[i].katagori;
      tr.appendChild(tdKatagori);

      const tdThn = document.createElement("td");
      tdThn.textContent = data[i].tahun_terbit;
      tr.appendChild(tdThn);


      const tdEdit = document.createElement("td");
      const anchorEdit = document.createElement("a");
      anchorEdit.textContent = "Edit";
      anchorEdit.href = `../tambah/edit_buku.html?buku=${data[i].kode_buku}`;
      tdEdit.appendChild(anchorEdit);
      tr.appendChild(tdEdit);

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
          fetch(
            `/api/buku/${data[i].kode_buku}`, {
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

document.push.onsubmit = async (e) => {
  e.preventDefault();
  fetch("/api/buku", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kode: document.push.kode.value,
      judul: document.push.namaBuku.value,
      pengarangg: document.push.pengarang.value,
      penerbitt: document.push.penerbit.value,
      tahunn: document.push.tahunTerbit.value,
      katagori: document.push.jenisBuku.value
    })
  });
  location.reload();
}
