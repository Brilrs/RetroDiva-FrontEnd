from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import threading
import sys
import os

PORT = 8000
class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/html')]
    start_response(status, headers)
    
    # Serve the index.html file
    with open('index.html', 'r', encoding='utf-8') as f:
        return [f.read().encode('utf-8')]

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    httpd = make_server('', PORT, application)
    print(f"Serving on port {PORT}...")
    httpd.serve_forever()
