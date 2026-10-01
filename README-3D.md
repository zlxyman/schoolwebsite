# Panduan Menggunakan 3D Assets (Kenney.nl)

Halo! Sesuai permintaan Anda, saya telah mengunduh **Kenney 3D Starter Kit** dan menyiapkan file-file yang Anda butuhkan untuk membuat *mini-games* 3D di masa mendatang.

## Lokasi File 3D
Semua model 3D (format `.glb` / GLTF) sudah disimpan dengan rapi di dalam folder:
`assets/3d_models/`

File `.glb` adalah format standar industri yang paling optimal dan direkomendasikan untuk digunakan pada website, sangat cocok dengan `Three.js`.

## Cara Menggunakannya Nanti di Lokal
1. Pastikan Anda menjalankan website melalui **Local Web Server** (seperti *Live Server* di VS Code). Anda tidak bisa membuka file HTML berisikan 3D langsung dengan melakukan klik ganda dua kali pada file (protokol `file://`), karena *browser* akan memblokir fitur pembacaan model 3D demi alasan keamanan (CORS).
2. Anda dapat memanfaatkan pustaka `Three.js` melalui CDN atau bundler untuk memuat model-model 3D `.glb` tersebut kapan pun dibutuhkan.

Semoga aset ini bermanfaat untuk pengembangan mini game 3D Anda ke depannya!
