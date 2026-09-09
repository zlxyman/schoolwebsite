# Panduan Menggunakan 3D Assets (Kenney.nl)

Halo! Sesuai permintaan Anda, saya telah mengunduh **Kenney 3D Starter Kit** dan menyiapkan file-file yang Anda butuhkan untuk membuat *mini-games* 3D di masa mendatang.

## Lokasi File 3D
Semua model 3D (format `.glb` / GLTF) sudah disimpan dengan rapi di dalam folder:
\`assets/3d_models/\`

File `.glb` adalah format standar industri yang paling optimal dan direkomendasikan untuk digunakan pada website, sangat cocok dengan \`Three.js\`.

## Cara Menggunakannya Nanti di Lokal
1. Pastikan Anda menjalankan website melalui **Local Web Server** (seperti *Live Server* di VS Code). Anda tidak bisa membuka file HTML berisikan 3D langsung dengan melakukan klik ganda dua kali pada file (protokol \`file://\`), karena *browser* akan memblokir fitur pembacaan model 3D demi alasan keamanan (CORS).
2. Saya telah membuatkan satu buah *file* contoh bernama **\`demo-3d-mini-game.html\`**. 
3. *File* \`demo-3d-mini-game.html\` tersebut tidak terhubung atau mengubah website utama Anda saat ini sama sekali, tetapi Anda bisa menggunakannya sebagai **"Template Belajar/Boilerplate"** kapanpun Anda siap membuat *mini-game* 3D. 
4. Template tersebut otomatis memanggil pustaka \`Three.js\` melalui *CDN* (Internet), jadi Anda tidak perlu pusing melakukan instalasi \`npm\`.

Semoga panduan dan aset ini bermanfaat untuk proyek *mini game* 3D Anda ke depannya!
