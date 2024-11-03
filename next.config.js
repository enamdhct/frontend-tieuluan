/** @type {import('next').NextConfig} */
const path = require('path')
 
module.exports = {
  experimental: {
    serverActions: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    url: 'http://localhost:8000/api',
    GOOGLE_CLIENT_ID: '295423283087-flkchncvgi5v2qi1mvjkindb9l8g5sfv.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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'
  },

  images: {
    domains: ['firebasestorage.googleapis.com'],
  }
}