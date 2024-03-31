import { InitialStore } from '../lib/products-data-definitions';

const initialStore:InitialStore = {
  products: [
    {
      id: 1,
      name: "ASUS",
      description: "Modelo: ASUS TUF GAMING F15 \nPantalla: 15.6 pulgadas _ 1920 x 1080 resolución - IPS - 144 Hz \nProcesador: Intel Core i5 12500H \nMemoria: 8 GB DDR4 3200 \nGráficos: NVIDIA GeForce RTX 3050 4 GB \nSSD: 512 GB M.2 NVME \nConectividad: WIFI 6 _ Bluetooth 5.1 \nSistema Operativo: Windows 11 \nThunderbolt 4 \nAudio: Dolby Atmos \nTeclado: Iluminado RGB",
      imageUrl: "/products/asus-tuf-gaming-f15-i5-12500h-8gb-ssd-rtx-3050-4-gb.jpg",
      price: 489000
    },
    {
      id: 2,
      name: "NINTENDO",
      description: "Modelo: NINTENDO SWITCH OLED NEON BLUE/NEON RED\nTamaño de Pantalla 7 pulgadas\nConector USB Type-C.\nConector Audio Conector de 3.5 mm\nSensores Acelerómetro, giroscopio y sensor de brillo\nBatería Batería de iones de litio / 4310mAh\nConexión Wi-Fi (cumple con IEEE 802.11 a/b/g/n/ac) Bluetooth 4.1",
      imageUrl: "/products/nintendo-switch-oled-neon-blueneon-red.jpg",
      price: 175000
    },
    {
      id: 3,
      name: "LOGITECH",
      description: "Modelo: LOGITECH G413 TKL SE\nMarca: Logitech\nTipo de Teclado: Mecanico\nLED: Blanco\nTipo de Switch: Logitech Romer-G Tactile\nChasis construido de aleación de Aluminio - Magnesio",
      imageUrl: "/products/logitech-g413-tkl-se.jpg",
      price: 39900
    },
    {
      id: 4,
      name: "RAZER",
      description: "Modelo: LOGITECH G413 TKL SE\nMarca: Razer\nDPI: 6400\n5 botones programables\ninterruptores mecánicos",
      imageUrl: "/products/razer-deathadder-essential.jpg",
      price: 14000
    },
    {
      id: 5,
      name: "RAZER",
      description: "Modelo: RAZER HAMMERHEAD TRUE WIRELESS X\nMarca: Razer\nAudio: Stereo\nConexion: Bluetooth 5.2\nModo de juego de baja latencia de 60 ms\nControles táctiles\nDuración de la batería\nHasta 24 horas (6 + 18) con iluminación encendida\nHasta 28 horas (7 + 21) con iluminación apagada",
      imageUrl: "/products/razer-hammerhead-true-wireless-x.jpg",
      price: 29000
    },
    {
      id: 6,
      name: "SKULLCANDY",
      description: "Modelo: SKULLCANDY TRUE WIRELESS MOD GRIS/AZUL\nMarca: Skullcandy\nAudio: Stereo\nConexion: Bluetooth  5.2",
      imageUrl: "/products/skullcandy-true-wireless-mod-grisazul.jpg",
      price: 34000
    },
    {
      id: 7,
      name: "SONY",
      description: "Modelo: SONY PLAYSTATION PS5 DUAL SENSE WIRELESS CONTROL BLANCO\nMarca: SONY\nDa vida a los mundos de los juegos: siente tus acciones en el juego y el entorno simulado a través de la respuesta táctil. Experimenta diferentes fuerzas y tensiones al alcance de tu mano con los disparadores adaptables. Disponible cuando es compatible con el juego\nEncuentra tu voz, comparte tu pasión: chat en línea con el micrófono integrado. Conecta un audífono directamente a través del conector de 0.14 pulgadas (3.5 milímetros). Graba y transmite tus momentos épicos de juego con el botón Crear\nUn icono de juego en tus manos: disfruta de un diseño cómodo y evolucionado con un diseño icónico y golpes mejorados. Escucha efectos de sonido de alta fidelidad a través del parlante integrado en los juegos compatibles",
      imageUrl: "/products/sony-playstation-ps5-dual-sense-wireless-control-blanco.jpg",
      price: 36000
    },
    {
      id: 8,
      name: "AMAZON",
      description: "Modelo: AMAZON ECHO POP - NEGRO\nMarca: AMAZON\nDimensiones: 3.9” (ancho) x 3.3” (diámetro) x 3.6” (alto)\nConectividad: WiFi /Bluetooth.\nSonido: Parlantes de proyección frontal de 1.95”",
      imageUrl: "/products/amazon-echo-pop-negro.jpg",
      price: 17000
    },
    {
      id: 9,
      name: "Xbox",
      description: "Consola Xbox Series X.\nControl inalámbrico Xbox.\nCable HDMI.\nCable de alimentación",
      imageUrl: "/products/xbox-series-x-1tb.jpg",
      price: 285000
    },
    {
      id: 10,
      name: "XIAOMI",
      description: "Modelo: XIAOMI MI BAND 7\nPantalla a color 1.62 pulgadas\nResolución de pantalla: 192 x 490\nConexión: Bluetooth 5.2\nCompatibilidad: Android 6.0 o iOS 10.0\nBatería Litio 180 mAh",
      imageUrl: "/products/xiaomi-mi-band-7.jpg",
      price: 20000
    },
    {
      id: 11,
      name: "SAMSUNG ",
      description: "Procesador: Qualcomm SM8550-AC Snapdragon 8 Gen 2 (4 nm)\nGPU: Adreno 740\nMemoria RAM: 8 GB\nPantalla: 6.7 pulgadas AMOLED dinámico plegable 2X, 120 Hz, HDR10+\nResolucion: 1080 x 2640\nMemoria Interna: 512 GB\nCamara: 12 MP + 12 MP\nSistema Operativo: Android 14, One UI 6\nResistente al agua IPX8\nMarco de aluminio con mayor resistencia a caídas y rayones",
      imageUrl: "/products/samsung-galaxy-z-flip5-8512-gb-lavanda.jpg",
      price: 425000
    },
    {
      id: 12,
      name: "JBL",
      description: "Marca: JBL\nAudio: Estereo\nConexion: Bluetooth\nResistente al agua y al sudor\nCancelación activa de ruido",
      imageUrl: "/products/jbl-tune-130nc-azul.jpg",
      price: 34000
    },
    {
      id: 13,
      name: "THONET & VANDER",
      description: "Marca: Thonet & Vander\nSalida: 32 Watts\nConectividad: Bluetooth + 3.5 mm + RCA Stereo",
      imageUrl: "/products/thonet-vander-vertrag-flug-bt.jpg",
      price: 39000
    },
    {
      id: 14,
      name: "LOGITECH",
      description: "Marca: LOGITECH Z313\nSalida: 25 Watts",
      imageUrl: "/products/logitech-z313.jpg",
      price: 29000
    },
    {
      id: 15,
      name: "xiaomi",
      description: "Marca: Xiaomi\nTamaño: 24 pulgadas\nResolucion: 1920 x 1080\nTipo de Panel: IPS\nFrecuencia Vertical: 60 Hz\nTiempo de Respuesta: 6 ms\nEntradas: HDMI - VGA\nMT1505",
      imageUrl: "/products/xiaomi-1c-24-ips.jpg",
      price: 55000
    },
    {
      id: 16,
      name: "XIAOMI",
      description: "Marca:XIAOMI SMART BAND 8 ACTIVE - NEGRO\nPantalla de 1,47\nCarga rápida y batería de duración extralarga\nGran resistencia al agua de 5ATM\nControl de oximetría y 50 modos de ejercicio\nCarga magnetica ",
      imageUrl: "/products/xiaomi-smart-band-8-active-negro.jpg",
      price: 14000
    },
    {
      id: 17,
      name: "MSI",
      description: "Marca: MSI FORCE GC30 V2 BLANCO\nConexion Wireless o cableada\nSoporte para PC, Android\nMotores de vibración dual en el interior\nHasta 8 horas de duracion de bateria",
      imageUrl: "/products/msi-force-gc30-v2-blanco.jpg",
      price: 22000
    },
    {
      id: 18,
      name: "LOGITECH",
      description: "Marca: LOGITECH G923\nSistema de juego PlayStation®5 o PlayStation®4\nWindows® 11,10, 8, 8.1 y 7\n150 MB de espacio en disco duro disponible\nPuerto USB 2.0\nJuego compatible con volante de carreras Logitech con Force Feedback.\nPara ver una lista de juegos compatibles, visita logitechG.com/g923",
      imageUrl: "/products/volante-de-carreras-y-pedales-logitech-g923-para-playstation-5-y-playstation-4.jpg",
      price: 175000
    },
  ],
  cart: {
    products: [],
    subtotal: 0,
    taxPercentage: 0.13,
    total: 0,
    deliveryAddress: "",
    methodPayment: null
  }
};

export default initialStore;