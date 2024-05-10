# task5-QA-Evermos

## Deskripsi Proyek
Proyek ini bertujuan untuk melakukan pengujian beban menggunakan k6 load test pada dua API—POST dan PUT—yang mengakses layanan dari Reqres.in. Pengujian ini dilakukan untuk menilai kinerja dan keandalan dari metode POST dan PUT dalam menangani permintaan ke server Reqres.in.

## Langkah-langkah Pengujian

### Langkah 1: Persiapan Lingkungan
1. **Instalasi k6**:
   Pastikan Anda telah menginstal k6. Jika belum, Anda dapat menginstalnya dengan mengikuti instruksi di [situs resmi k6](https://k6.io/docs/getting-started/installation/).

2. **Setup Proyek**:
   - Buat folder untuk proyek pengujian Anda.
   - Inisialisasi proyek dengan `npm init` jika Anda berencana menggunakan npm, atau cukup buat beberapa file script di dalam folder tersebut.

### Langkah 2: Buat Skrip Tes
1. **Buat File Skrip**:
   - Buat file JavaScript untuk setiap tipe permintaan. Misalnya, `post_test.js` untuk POST dan `put_test.js` untuk PUT dan `integration.js untuk menangani pengujian integrasi antar komponen, dan `performance.js` untuk fokus pada pengujian performa keseluruhan sistem. Hasil dari semua pengujian ini disajikan dalam report.html, yang memberikan ringkasan komprehensif dan analisis dari berbagai tes yang dilakukan.

2. **Tulis Skrip Pengujian**:
   - **HTTP_POST** (`http_post.js`):
     ```javascript
     import http from 'k6/http';
     import { check } from 'k6';

     export default function postRequest(payload) {
       const params = {
         headers: {
           'Content-Type': 'application/json',
         },
       };

       const res = http.post('https://reqres.in/api/users', JSON.stringify(payload), params);
       check(res, {
         'response code was 201': (res) => res.status === 201,
       });

       return res;
     }
     ```
     
   - **HTTP_PUT** (`http_put.js`):
     ```javascript
     import http from 'k6/http';
     import { check } from 'k6';

     export default function putRequest(payload) {
       const params = {
         headers: {
           'Content-Type': 'application/json',
         },
       };

       const res = http.put('https://reqres.in/api/users/2', JSON.stringify(payload), params);
       check(res, {
         'response code was 200': (res) => res.status === 200,
       });

       return res;
     }
     ```

 - **INTEGRATION** (`integration.js`):
![image](https://github.com/nellyyuliaa/task5-QA-Evermos/assets/122393200/01f5465f-4649-4722-a8ad-8032184ce75f)
![image](https://github.com/nellyyuliaa/task5-QA-Evermos/assets/122393200/bf4e8ea9-c0a8-45b0-a0c2-a1dd981095c0)
![image](https://github.com/nellyyuliaa/task5-QA-Evermos/assets/122393200/31984e0c-21ce-42ac-a93a-1fd21c91c661)

- **PERFORMANCE** (`performance.js`):
![image](https://github.com/nellyyuliaa/task5-QA-Evermos/assets/122393200/2eb71d36-774a-45e2-96bf-929ccf647950)
![image](https://github.com/nellyyuliaa/task5-QA-Evermos/assets/122393200/6b0ea83c-cab2-4174-9457-d6c4fc061dc5)
![image](https://github.com/nellyyuliaa/task5-QA-Evermos/assets/122393200/5ceda602-87d5-46c1-8960-9884098c1a25)


### Langkah 3: Jalankan Tes
1. **Eksekusi Skrip**:
   - Buka terminal.
   - Jalankan tes dengan perintah k6 untuk masing-masing skrip:
     ```bash
     k6 run http_post.js
     k6 run http_put.js
     k6 run integration.js
     k6 run performance.js
     ```

### Langkah 4: Analisis Hasil
- Setelah menjalankan tes, k6 akan menampilkan hasil pengujian yang mencakup metrik seperti durasi permintaan, jumlah kesalahan, dll.
- Analisis hasil untuk memahami kinerja dan keandalan dari API POST dan PUT yang Anda uji.

### Langkah 5: Iterasi dan Penyesuaian
- Berdasarkan hasil, Anda mungkin perlu menyesuaikan payload, parameter, atau konfigurasi k6.
- Ulangi pengujian untuk memastikan bahwa perubahan yang dilakukan memberikan hasil yang diharapkan.
