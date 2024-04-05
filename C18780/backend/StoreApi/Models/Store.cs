namespace StoreApi;
public sealed class Store
{
    public List<Product> Products { get; private set; }
    public int TaxPercentage { get; private set; }

    private Store(List<Product> products, int TaxPercentage)
    {
        this.Products = products;
        this.TaxPercentage = TaxPercentage;
    }

    public readonly static Store Instance;
    // Static constructor
    static Store()
    {
        var products = new List<Product>();

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "ASUS",
            ImageUrl = "/products/asus-tuf-gaming-f15-i5-12500h-8gb-ssd-rtx-3050-4-gb.jpg",
            Price = 489000,
            Description = "Modelo: ASUS TUF GAMING F15 \nPantalla: 15.6 pulgadas _ 1920 x 1080 resolución - IPS - 144 Hz \nProcesador: Intel Core i5 12500H \nMemoria: 8 GB DDR4 3200 \nGráficos: NVIDIA GeForce RTX 3050 4 GB \nSSD: 512 GB M.2 NVME \nConectividad: WIFI 6 _ Bluetooth 5.1 \nSistema Operativo: Windows 11 \nThunderbolt 4 \nAudio: Dolby Atmos \nTeclado: Iluminado RGB"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "NINTENDO",
            ImageUrl = "/products/nintendo-switch-oled-neon-blueneon-red.jpg",
            Price = 175000,
            Description = "Modelo: NINTENDO SWITCH OLED NEON BLUE/NEON RED\nTamaño de Pantalla 7 pulgadas\nConector USB Type-C.\nConector Audio Conector de 3.5 mm\nSensores Acelerómetro, giroscopio y sensor de brillo\nBatería Batería de iones de litio / 4310mAh\nConexión Wi-Fi (cumple con IEEE 802.11 a/b/g/n/ac) Bluetooth 4.1"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "LOGITECH",
            ImageUrl = "/products/logitech-g413-tkl-se.jpg",
            Price = 39900,
            Description = "Modelo: LOGITECH G413 TKL SE\nMarca: Logitech\nTipo de Teclado: Mecanico\nLED: Blanco\nTipo de Switch: Logitech Romer-G Tactile\nChasis construido de aleación de Aluminio - Magnesio"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "RAZER",
            ImageUrl = "/products/razer-deathadder-essential.jpg",
            Price = 14000,
            Description = "Modelo: LOGITECH G413 TKL SE\nMarca: Razer\nDPI: 6400\n5 botones programables\ninterruptores mecánicos"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "RAZER",
            ImageUrl = "/products/razer-hammerhead-true-wireless-x.jpg",
            Price = 29000,
            Description = "Modelo: RAZER HAMMERHEAD TRUE WIRELESS X\nMarca: Razer\nAudio: Stereo\nConexion: Bluetooth 5.2\nModo de juego de baja latencia de 60 ms\nControles táctiles\nDuración de la batería\nHasta 24 horas (6 + 18) con iluminación encendida\nHasta 28 horas (7 + 21) con iluminación apagada"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "SKULLCANDY",
            ImageUrl = "/products/skullcandy-true-wireless-mod-grisazul.jpg",
            Price = 34000,
            Description = "Modelo: SKULLCANDY TRUE WIRELESS MOD GRIS/AZUL\nMarca: Skullcandy\nAudio: Stereo\nConexion: Bluetooth  5.2"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "SONY",
            ImageUrl = "/products/sony-playstation-ps5-dual-sense-wireless-control-blanco.jpg",
            Price = 36000,
            Description = "Modelo: SONY PLAYSTATION PS5 DUAL SENSE WIRELESS CONTROL BLANCO\nMarca: SONY\nDa vida a los mundos de los juegos: siente tus acciones en el juego y el entorno simulado a través de la respuesta táctil. Experimenta diferentes fuerzas y tensiones al alcance de tu mano con los disparadores adaptables. Disponible cuando es compatible con el juego\nEncuentra tu voz, comparte tu pasión: chat en línea con el micrófono integrado. Conecta un audífono directamente a través del conector de 0.14 pulgadas (3.5 milímetros). Graba y transmite tus momentos épicos de juego con el botón Crear\nUn icono de juego en tus manos: disfruta de un diseño cómodo y evolucionado con un diseño icónico y golpes mejorados. Escucha efectos de sonido de alta fidelidad a través del parlante integrado en los juegos compatibles"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "AMAZON",
            ImageUrl = "/products/amazon-echo-pop-negro.jpg",
            Price = 17000,
            Description = "Modelo: AMAZON ECHO POP - NEGRO\nMarca: AMAZON\nDimensiones: 3.9” (ancho) x 3.3” (diámetro) x 3.6” (alto)\nConectividad: WiFi /Bluetooth.\nSonido: Parlantes de proyección frontal de 1.95”"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "XBOX",
            ImageUrl = "/products/xbox-series-x-1tb.jpg",
            Price = 285000,
            Description = "Consola Xbox Series X.\nControl inalámbrico Xbox.\nCable HDMI.\nCable de alimentación"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "XIAOMI",
            ImageUrl = "/products/xiaomi-mi-band-7.jpg",
            Price = 20000,
            Description = "Modelo: XIAOMI MI BAND 7\nPantalla a color 1.62 pulgadas\nResolución de pantalla: 192 x 490\nConexión: Bluetooth 5.2\nCompatibilidad: Android 6.0 o iOS 10.0\nBatería Litio 180 mAh"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "SAMSUNG",
            ImageUrl = "/products/samsung-galaxy-z-flip5-8512-gb-lavanda.jpg",
            Price = 425000,
            Description = "Procesador: Qualcomm SM8550-AC Snapdragon 8 Gen 2 (4 nm)\nGPU: Adreno 740\nMemoria RAM: 8 GB\nPantalla: 6.7 pulgadas AMOLED dinámico plegable 2X, 120 Hz, HDR10+\nResolucion: 1080 x 2640\nMemoria Interna: 512 GB\nCamara: 12 MP + 12 MP\nSistema Operativo: Android 14, One UI 6\nResistente al agua IPX8\nMarco de aluminio con mayor resistencia a caídas y rayones"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "JBL",
            ImageUrl = "/products/jbl-tune-130nc-azul.jpg",
            Price = 34000,
            Description = "Marca: JBL\nAudio: Estereo\nConexion: Bluetooth\nResistente al agua y al sudor\nCancelación activa de ruido"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "THONET & VANDER",
            ImageUrl = "/products/thonet-vander-vertrag-flug-bt.jpg",
            Price = 39000,
            Description = "Marca: Thonet & Vander\nSalida: 32 Watts\nConectividad: Bluetooth + 3.5 mm + RCA Stereo"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "LOGITECH",
            ImageUrl = "/products/logitech-z313.jpg",
            Price = 29000,
            Description = "Marca: LOGITECH\nSalida: 25 Watts"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "XIAOMI",
            ImageUrl = "/products/xiaomi-1c-24-ips.jpg",
            Price = 55000,
            Description = "Marca: Xiaomi\nTamaño: 24 pulgadas\nResolucion: 1920 x 1080\nTipo de Panel: IPS\nFrecuencia Vertical: 60 Hz\nTiempo de Respuesta: 6 ms\nEntradas: HDMI - VGA\nMT1505"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "XIAOMI",
            ImageUrl = "/products/xiaomi-smart-band-8-active-negro.jpg",
            Price = 14000,
            Description = "Marca:XIAOMI SMART BAND 8 ACTIVE - NEGRO\nPantalla de 1,47\nCarga rápida y batería de duración extralarga\nGran resistencia al agua de 5ATM\nControl de oximetría y 50 modos de ejercicio\nCarga magnetica "
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "MSI",
            ImageUrl = "/products/msi-force-gc30-v2-blanco.jpg",
            Price = 22000,
            Description = "Marca: MSI FORCE GC30 V2 BLANCO\nConexion Wireless o cableada\nSoporte para PC, Android\nMotores de vibración dual en el interior\nHasta 8 horas de duracion de bateria"
        });

        products.Add(new Product
        {
            Uuid = Guid.NewGuid(),
            Name = "LOGITECH",
            ImageUrl = "/products/volante-de-carreras-y-pedales-logitech-g923-para-playstation-5-y-playstation-4.jpg",
            Price = 175000,
            Description = "Marca: LOGITECH G923\nSistema de juego PlayStation®5 o PlayStation®4\nWindows® 11,10, 8, 8.1 y 7\n150 MB de espacio en disco duro disponible\nPuerto USB 2.0\nJuego compatible con volante de carreras Logitech con Force Feedback.\nPara ver una lista de juegos compatibles, visita logitechG.com/g923"
        });


        Store.Instance = new Store(products, 13);
    }

    public Sale Purchase(Cart cart)
    {
        if (cart.ProductIds.Count == 0) throw new ArgumentException("Cart must contain at least one product.");
        if (string.IsNullOrWhiteSpace(cart.Address)) throw new ArgumentException("Address must be provided.");

        // Find matching products based on the product IDs in the cart
        IEnumerable<Product> matchingProducts = Products.Where(p => cart.ProductIds.Contains(p.Uuid.ToString())).ToList();

        // Create shadow copies of the matching products
        IEnumerable<Product> shadowCopyProducts = matchingProducts.Select(p => (Product)p.Clone()).ToList();

        // Calculate purchase amount by multiplying each product's price with the store's tax percentage
        decimal purchaseAmount = 0;
        foreach (var product in shadowCopyProducts)
        {
            product.Price *= (1 + (decimal)TaxPercentage / 100);
            purchaseAmount += product.Price;
        }

        // Create a sale object
        var sale = new Sale(shadowCopyProducts, cart.Address, purchaseAmount);

        return sale;

    }
}