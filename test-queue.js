import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '1m',
};

function generateISBN() {
  const is13 = Math.random() > 0.5;

  if (is13) {
    // ISBN-13
    return '978' + Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
  } else {
    // ISBN-10
    return Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
  }
}

function generateBooks(count) {
  return Array.from({ length: count }, (_, i) => ({
    title: `Book ${i + 1}`,
    author: `Author ${i + 1}`,
    isbn: generateISBN(),
    isRead: Math.random() > 0.5
  }));
}

export default function () {
  const payload = JSON.stringify(generateBooks(500)); // 👈 100 books par requête

  http.post('http://localhost:3000/books/import', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  sleep(0.1);
}