import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

export function handleSummary(data) {
    return {
      "script.html": htmlReport(data),
    };
  }

export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'per-vu-iterations',
             vus: 1000,
             iterations: 3500,
             maxDuration: '2s',
        },
    },
};

export default function () {
    http.get('http://reqres.in/api/users/')
    sleep(0.5);
}