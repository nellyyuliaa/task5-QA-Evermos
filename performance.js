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