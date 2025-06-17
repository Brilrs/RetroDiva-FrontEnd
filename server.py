from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser

PORT = 8000

Handler = SimpleHTTPRequestHandler
httpd = HTTPServer(('localhost', PORT), Handler)

print(f"Servidor iniciado en http://localhost:{PORT}")
webbrowser.open(f'http://localhost:{PORT}')

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nDeteniendo servidor...")
    httpd.server_close()
