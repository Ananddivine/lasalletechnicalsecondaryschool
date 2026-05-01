const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 5050
const resultsPath = path.join(__dirname, 'data', 'admissionResults.json')

const credentials = {
  email: 'admin@lasalletech.edu.pg',
  password: 'Admin@2026',
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  response.end(JSON.stringify(payload))
}

function readResults() {
  const raw = fs.readFileSync(resultsPath, 'utf8')
  return JSON.parse(raw)
}

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, { ok: true, service: 'lasalle-admissions-backend' })
    return
  }

  if (request.method === 'GET' && request.url === '/api/admission-results') {
    sendJson(response, 200, { success: true, results: readResults() })
    return
  }

  if (request.method === 'GET' && request.url.startsWith('/api/admission-results/')) {
    const resultId = request.url.split('/').pop()
    const result = readResults().find((item) => item.id === resultId)

    if (!result) {
      sendJson(response, 404, { success: false, message: 'Result not found' })
      return
    }

    sendJson(response, 200, { success: true, result })
    return
  }

  if (request.method === 'POST' && request.url === '/api/admin/login') {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      let parsed = {}

      try {
        parsed = body ? JSON.parse(body) : {}
      } catch {
        sendJson(response, 400, { success: false, message: 'Invalid JSON body' })
        return
      }

      if (
        parsed.email?.toLowerCase() === credentials.email &&
        parsed.password === credentials.password
      ) {
        sendJson(response, 200, {
          success: true,
          user: {
            name: 'Sr. Regina Aihi',
            role: 'Admissions Coordinator',
            email: credentials.email,
          },
        })
        return
      }

      sendJson(response, 401, { success: false, message: 'Invalid credentials' })
    })

    return
  }

  sendJson(response, 404, { success: false, message: 'Route not found' })
})

server.listen(port, () => {
  console.log(`Admissions backend running on http://localhost:${port}`)
})