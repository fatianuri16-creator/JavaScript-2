console.log("Bismillah Praktikum anti Error")

//Aktivitas 1 DOM SELECTION / Selesksi elemen
// Kenapa kita harus seleksi karena "menangkap" atau ambil id/class 
// Mengambil elemen html tersebut lalu disimpan di variabel JavaScript 

// 1.Mengambil elemen judul utama & sub judul
// document.getelementById("..") mengambil berdasarkan atriut id.
const judulUtama = document.getElementById("judul-utama"); // Menangkap: <h1 id="judul-utama">

// document.querySelector("#...")
// tanda pagar artinya ID
const subJudul = document.querySelector("#sub-judul"); // Menangkap: <p id="#sub-judul">

// 2.mengambil elemen pada kartu 1 (Kartu manipulasi teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3.Mengambil elemen tombol - tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4.Untuk memgambil elemen pada kartu ke 2 (Fitur Catatan Dinamis / To Do List sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatab");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas ke 2 Manipulasi Teks & Style (card 1)
// addEventListener("click", function() {...}) artinya adalah Tolong dengarkan dulu/ tunggu
// Sampai di klik user ketika diklik jalankan perintahdidalam function 

// A. Mengubah Teks & warna secara langsung 
BtnUbahTeks.addEventListener("click", function () {
    //.innertext = mengganti atau mengisi secara langsung teks yang ada didalam elemen HTML
    teksPreview.innerText = "Hebat! Teks Ini Berhasil diubah pake DOM!";
    
    //.style.color= mengubah warna teks secara langsung (Inline Style)
    teksPreview.style.color = "#fbff00";

    // console.log = mencetak pesan di console browser
    console.log("[DOM] Teks Preview telah diperbaharui!");
});

// B. manipulasi class Css Menguunakan ClassList.toggle()
btnToggleWarna.addEventListener("click", function(){
    // .classlist.toggle("nama-class") = fitur saklar otomatis (ON/OF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di Switch!");

});

// C.Mengembalikan Reset Teks ke koindisi semula
btnReset.addEventListener("click", function(){
    // 1. Kembalikan Teks semula teks asli
    teksPreview.innerText = "Halo ! Teks ini siap diubah oleh javascript";

    // 2. Kosongkan Warna agar kembali ke warna css bawaan 
    teksPreview.style.color = "";

    // 3. hapus class khusus untyuk menggunakan .classList.remove("")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilkan di reset");
});

// aktivitas 3&4 : elemen dinamis & Event handling (TO-DO List Sederhana)
// Di aktivitas ini kita belajar elemen HTML baru (<li>) secara otomatis dalam javasrcript
// Mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)

// Langkah 1 : membuat variable penampung angka jumlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah bisa bertambah bisa berkurang (counting)
let totalCatatan = 0;

// langkah 2 : Fungsi Update angkat counter & pesan status
function perbaruiJumlah(){
    //masukan angka total catatan terbaru kedalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    //Conditional statement berupa apakah ctattannya itu kosong/0 ?
    if(totalCatatan === 0){
        // jika 0: hapus class "hidden" supaya teks "Belum ada catatan" ,umcul ke layar
        pesanKosong.classList.remove("hidden");
    }else{
        // jika > 0: Tambahkan class "hidden" agar teks "belum ada catatan" tersembunyi
        pesanKosong.classList.add("hidden");
    }
}

// Langkah 3: Fungsi Utama Logika Tambah catatan baru
function tambahCatatan() {
    // 3.1 inputCatatan.value fungsi nya untuk mengambil teks yang diketik oleh user 
    //. trim() = menghapus spasi diawal dan diakhir
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi input: Jka isi teks kosong maka tampilkan alert
    if (isiTeks === "") {
        alert("catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menembahkan tag pada li

    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus
    // Tanda backtick (`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan Telinga / Event Listener untuk Tombol hapus pada catatan dinamis 
    // liBaru.querySelector(".btn-hapus") = untuk mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function(){
        liBaru.remove(); //menghapus elemen list dari layar HTML
        totalCatatan--; //total catatan dikurangi sebanyak 1x
        perbaruiJumlah(); //panggil fungsi perbaruiJumlah untuk update angka dilayar
        console.log(`Dom Catatan "${isiTeks}" dihapus.`);
    });

    // 3.6 appendChild = memasukan elmen li kedalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.7 mengosongkan kembali sis kolom input (inputCatatan.value = "") supaya bisa diketik lagi
    inputCatatan.value="";

    // 3.8 totalCatatan++ artinya tambah nilai total catatan sebanyak 1, lalu update angka ke layar 
    totalCatatan++;
    perbaruiJumlah();

    console.log(`Dom Catatan baru ditambahkan: ${isiTeks}`);
}

//langhkah 4 : Event Listener klik Tombol + "Tambah"
//Ketika tombol "+ Tambah" di klik oleh user, maka jalankan fungsi tambah catatan()
btnTambah.addEventListener("click", function (){
    tambahCatatan();
});

//Langkah 5: Event Listener Keyboard "Enter" pada kolom input
//Ketika usere mengetik di kolom input dan melepas tombol keyboard ('Event keyup);
inputCatatan.addEventListener("keyup", function (event){
    //periksa apakah tombil keyboard yang ditekan user adalah enter ?
    if (event.key === "Enter") {
        tambahCatatan(); //jika ya, jalankan fungsi tambahCatatan()
    }
});
