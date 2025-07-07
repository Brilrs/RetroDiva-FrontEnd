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

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, Handler)
    print(f"Starting server on port {PORT}...")
    httpd.serve_forever()

if __name__ == '__main__':
    # Start server in a separate thread
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()
    
    # Open browser
    webbrowser.open(f'http://localhost:{PORT}')
