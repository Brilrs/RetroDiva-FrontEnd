const fs = require('fs');
const axios = require('axios');

// Configuración de directorios
const productsDir = './img/products/';
const musiciansDir = './img/musicians/';

// Crear directorios si no existen
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
}
if (!fs.existsSync(musiciansDir)) {
    fs.mkdirSync(musiciansDir, { recursive: true });
}

// Datos de productos y músicos
const products = [
    { id: 1, name: 'Jumpsuit Neon', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 2, name: 'Vestido Glam', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 3, name: 'Top Glam', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 4, name: 'Pantalones Power', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 5, name: 'Chaqueta Moto', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 6, name: 'Falda Midi', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 7, name: 'Crop Top', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 8, name: 'Vestido Mini', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 9, name: 'Blazer', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' },
    { id: 10, name: 'Body', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' }
];

const musicians = [
    { name: 'Madonna', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd', youtubeId: '3tmd-ClpJxA' },
    { name: 'Prince', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd', youtubeId: 'o0U4YvjBxoc' },
    { name: 'Cyndi Lauper', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd', youtubeId: 'K642wY6Q41Q' },
    { name: 'Michael Jackson', image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd', youtubeId: 'iNpXCzaWW1w' }
];

// Función para descargar imágenes
async function downloadImage(url, filename) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        
        return new Promise((resolve, reject) => {
            response.data.pipe(fs.createWriteStream(filename))
                .on('finish', resolve)
                .on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading ${filename}:`, error);
        throw error;
    }
}

// Función para descargar imágenes de productos
async function downloadProductImage(product) {
    try {
        const filename = `${productsDir}product${product.id}.jpg`;
        await downloadImage(product.image, filename);
        console.log(`Descargada imagen de ${product.name}`);
    } catch (error) {
        console.error(`Error descargando imagen de ${product.name}:`, error);
    }
}

// Función para descargar imágenes de músicos
async function downloadMusicianImage(musician) {
    try {
        const filename = `${musiciansDir}${musician.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        await downloadImage(musician.image, filename);
        console.log(`Descargada imagen de ${musician.name}`);
    } catch (error) {
        console.error(`Error descargando imagen de ${musician.name}:`, error);
    }
}

// Función principal para descargar todas las imágenes
async function downloadAllImages() {
    try {
        // Descargar imágenes de productos
        for (const product of products) {
            await downloadProductImage(product);
        }

        // Descargar imágenes de músicos
        for (const musician of musicians) {
            await downloadMusicianImage(musician);
        }
        
        console.log('Todas las imágenes han sido descargadas exitosamente');
    } catch (error) {
        console.error('Error general:', error);
    }
}

// Ejecutar la descarga
downloadAllImages();
