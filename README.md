# task5-QA-Evermos
Proyek ini bertujuan untuk melakukan pengujian beban menggunakan *k6 load test* pada dua API—POST dan PUT—yang mengakses layanan dari Reqres.in. Pengujian ini dilakukan untuk menilai kinerja dan keandalan dari metode POST dan PUT dalam menangani permintaan ke server Reqres.in.

Untuk melakukan pengujian beban menggunakan k6 pada dua API—POST dan PUT—dari layanan Reqres.in, Anda perlu mengikuti langkah-langkah berikut:

### Langkah 1: Persiapan Lingkungan
1. **Instal k6**: Pastikan Anda telah menginstal k6. Jika belum, Anda dapat menginstalnya dengan mengikuti instruksi di [situs resmi k6](https://k6.io/docs/getting-started/installation/).
2. **Setup Proyek**:
   - Buat folder untuk proyek pengujian Anda.
   - Inisialisasi proyek dengan `npm init` jika Anda berencana menggunakan npm, atau cukup buat beberapa file script di dalam folder tersebut.

### Langkah 2: Buat Skrip Tes
1. **Buat File Skrip**:
   - Buat file JavaScript untuk setiap tipe permintaan. Misalnya, `post_test.js` untuk POST dan `put_test.js` untuk PUT.
2. **Tulis Skrip Pengujian**:
   - **POST Test** (`post_test.js`):
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

     // Menambahkan pengecekan response code
     check(res, {
        'response code was 201': (res) => res.status === 201,
    });

   return res;
   }
     ```
     
   - **PUT Test** (`put_test.js`):
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

     // Menambahkan pengecekan response code
    check(res, {
        'response code was 200': (res) => res.status === 200,
    });

     return res;
     }
     ```
     
- **Integration.js** (`integration.js`):
     ```javascript
     import http from 'k6/http';
     import { check, sleep, group } from 'k6';
     import http_post from './http_post.js';
     import http_put from './http_put.js';

    const BASE_URL = 'https://reqres.in';

    export default function () {
     const name = 'morpheus';
     const job = 'zion resident';

     group('Create with valid request should succeed', function () {
     const FULL_URL = `${BASE_URL}/api/users`;
     const payload = JSON.stringify({
     name: name,
     job: job
     });

    const params = {
    headers: {
        'Content-Type': 'application/json',
      },
    };

    let res = http.post(FULL_URL, payload, params);

    check(res, {
      'response code was 201': (res) => res.status === 201,
      'response name should same with request': (res) => {
        const response = JSON.parse(res.body);
        return response.name === name;
      },
      'response job should same with request': (res) => {
        const response = JSON.parse(res.body);
        return response.job === job;
      },
    });
  });

  sleep(1);

  group('Update with valid request should succeed', function () {
    const FULL_URL = `${BASE_URL}/api/users/2`;
    const payload = JSON.stringify({
      name: name,
      job: job
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let res = http.put(FULL_URL, payload, params);

    check(res, {
      'response code was 200': (res) => res.status === 200,
      'response name should same with request': (res) => {
        const response = JSON.parse(res.body);
        return response.name === name;
      },
      'response job should same with request': (res) => {
        const response = JSON.parse(res.body);
        return response.job === job;
      },
    });
  });
}
 ```

- **Performance.js** (`performance.js`):
     ```javascript
import http_post from './http_post.js';
import http_put from './http_put.js';
import { check, sleep, group } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration: ['avg<2000'],
        http_req_failed: ['rate<0.1'],
    },
};

export function handleSummary(data) {
    return {
        'report.html': htmlReport(data),
    };
}

export default function () {
    // Group for API Create
    group('API Create', function () {
        const name = 'morpheus';
        const job = 'zion resident';

        // Memanggil http_post dengan payload yang diperlukan
        let createRes = http_post({ name: name, job: job });

        // Check response body for API Create
        check(createRes, {
            'response name should same with request': (res) => {
                const response = res && res.json();
                return response && response.name === name;
            },
            'response job should same with request': (res) => {
                const response = res && res.json();
                return response && response.job === job;
            },
        });
    });


    group('API Update', function () {
        const name = 'morpheus';
        const job = 'zion resident';

        // Memanggil http_put dengan payload yang diperlukan
        let updateRes = http_put({ name: name, job: job });

        // Check response body for API Update
        check(updateRes, {
            'response name should same with request': (res) => {
                const response = res && res.json();
                return response && response.name === name;
            },
            'response job should same with request': (res) => {
                const response = res && res.json();
                return response && response.job === job;
            },
        });
    });
}
```

### Langkah 3: Jalankan Tes
1. **Eksekusi Skrip**:
   - Buka terminal.
   - Jalankan tes dengan perintah k6:
     ```bash
     k6 run post_test.js
     k6 run put_test.js
     k6 run integrations.js
     k6 run performance.js
     ```
   - Atau, jalankan keduanya secara bersamaan dengan skrip batch atau bash script.

### Langkah 4: Analisis Hasil
- Setelah menjalankan tes, k6 akan menampilkan hasil pengujian yang mencakup metrik seperti durasi permintaan, jumlah kesalahan, dll.
- Analisis hasil untuk memahami kinerja dan keandalan dari API POST dan PUT yang Anda uji.

### Langkah 5: Iterasi dan Penyesuaian
- Berdasarkan hasil, Anda mungkin perlu menyesuaikan payload, parameter, atau konfigurasi k6.
- Ulangi pengujian untuk memastikan bahwa perubahan yang dilakukan memberikan hasil yang diharapkan.
