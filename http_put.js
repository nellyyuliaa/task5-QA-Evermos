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