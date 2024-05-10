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