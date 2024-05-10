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