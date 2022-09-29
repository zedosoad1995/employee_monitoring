#!/usr/bin/env ts-node
import app from '../app'
import http from 'http'

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// Create HTTP server.
const server = http.createServer(app)

server.listen(port)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}
