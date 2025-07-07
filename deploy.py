import pythonanywhere
from pythonanywhere import PythonAnywhereClient

def deploy_to_pythonanywhere():
    # Configuración
    username = "mina"
    password = "123456mina"
    email = "bricm304@gmail.com"
    
    try:
        # Iniciar sesión
        client = PythonAnywhereClient(username, password)
        
        # Configurar el dominio
        domain = "mina.pythonanywhere.com"
        
        # Crear el archivo de configuración
        with open("pythonanywhere.yaml", "w") as f:
            f.write(f"""
web:
  wsgi_app: "wsgi:application"
  static_files:
    /static: ./static
  virtualenv: /home/mina/.virtualenvs/retrodiva
  python_version: 3.10
""")
        
        # Subir archivos
        client.upload_file("pythonanywhere.yaml")
        client.upload_file("app.py")
        client.upload_file("wsgi.py")
        client.upload_file("requirements.txt")
        
        # Instalar dependencias
        client.run_command("pip install -r requirements.txt")
        
        # Reiniciar la aplicación
        client.restart_web_app(domain)
        
        print(f"Despliegue exitoso! La aplicación está disponible en: https://{domain}")
        
    except Exception as e:
        print(f"Error durante el despliegue: {str(e)}")

if __name__ == "__main__":
    deploy_to_pythonanywhere()
