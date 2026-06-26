const coffeeMethods = {
    prensa: {
        name: "Prensa Francesa",
        idealCoffee: "Cafés con cuerpo denso, perfiles terrosos o achocolatados (ej. Sumatra, Brasil).",
        grind: "Gruesa (como sal marina).",
        time: "4 minutos.",
        pros: ["Mucho cuerpo y aceites naturales", "Fácil de usar", "No requiere filtros de papel"],
        cons: ["Puede dejar sedimentos (borra) en la taza", "Difícil de limpiar", "Si se deja mucho tiempo se sobreextrae"],
        steps: [
            "Calienta agua a 90-96°C.",
            "Añade el café molido (ratio 1:15 - 1 gramo de café por 15 ml de agua).",
            "Vierte un poco de agua para que el café haga 'bloom' (florezca) por 30 segundos.",
            "Vierte el resto del agua y revuelve suavemente.",
            "Coloca la tapa con el émbolo arriba y espera 4 minutos.",
            "Baja el émbolo lentamente y sirve de inmediato."
        ]
    },
    moka: {
        name: "Moka Italiana",
        idealCoffee: "Tuestes medios a oscuros, mezclas para espresso.",
        grind: "Fina-media (similar a arena fina).",
        time: "3 - 5 minutos al fuego.",
        pros: ["Café fuerte e intenso, cercano al espresso", "Económica y duradera", "Icono del diseño italiano"],
        cons: ["Fácil quemar el café si el fuego es muy alto", "Puede resultar amargo si no se controla la temperatura", "No hace crema real de espresso"],
        steps: [
            "Llena la base con agua caliente hasta justo por debajo de la válvula de seguridad.",
            "Llena el filtro con café molido sin prensarlo.",
            "Enrosca firmemente la parte superior (usa un paño si la base está caliente).",
            "Coloca a fuego medio-bajo.",
            "Cuando escuches un gorgoteo y veas salir el café, retira del fuego inmediatamente.",
            "Sirve o enfría la base con agua para detener la extracción."
        ]
    },
    espresso: {
        name: "Máquina de Espresso",
        idealCoffee: "Mezclas específicas para espresso, equilibradas en acidez y dulzor.",
        grind: "Muy fina (como sal de mesa fina).",
        time: "25 - 30 segundos.",
        pros: ["Textura densa, rica crema y sabor muy concentrado", "Base para muchas bebidas (Latte, Capuchino)", "Rápida preparación por taza"],
        cons: ["Equipo costoso y requiere mantenimiento", "Curva de aprendizaje empinada", "Sensible a cambios ambientales y de molienda"],
        steps: [
            "Purga la máquina y calienta el portafiltro.",
            "Muele el café y llena el filtro (aprox. 18-20g para un doble).",
            "Distribuye uniformemente y apisona (tamp) con firmeza y nivelado.",
            "Coloca el portafiltro y arranca la extracción de inmediato.",
            "Apunta a unos 36-40g de líquido en 25-30 segundos.",
            "Sirve y disfruta de la crema dorada."
        ]
    },
    turca: {
        name: "Café Turco (Cezve)",
        idealCoffee: "Tueste claro o medio, tradicionalmente Yemen o Etiopía.",
        grind: "Extra fina (como azúcar glas o harina).",
        time: "2 - 3 minutos.",
        pros: ["Método tradicional con mucha historia", "Sabor muy intenso y aromático", "No requiere filtros"],
        cons: ["Mucho sedimento en la taza", "Requiere técnica para obtener la espuma correcta", "El café puede quemarse si hierve"],
        steps: [
            "Añade agua (temp. ambiente), café y azúcar (opcional) al cezve (ibrik).",
            "Mezcla bien hasta que el azúcar se disuelva y no haya grumos.",
            "Coloca a fuego medio-bajo.",
            "Observa atentamente; cuando la espuma suba y esté a punto de hervir, retíralo.",
            "Vierte un poco de espuma en las tazas, vuelve a calentar brevemente y termina de servir.",
            "Espera un minuto para que los posos se asienten antes de beber."
        ]
    },
    vacio: {
        name: "Sifón / Vacío",
        idealCoffee: "Cafés florales, cítricos o afrutados (ej. Kenia, Etiopía lavados).",
        grind: "Media (como arena).",
        time: "2 - 3 minutos de infusión.",
        pros: ["Extracción muy limpia que resalta notas brillantes", "Visualmente espectacular (parece un experimento científico)", "Temperatura muy estable"],
        cons: ["Equipo frágil (vidrio)", "Limpieza tediosa", "Largo tiempo de preparación general"],
        steps: [
            "Coloca agua en el bulbo inferior y enciende el mechero debajo.",
            "Asegura el filtro en la cámara superior y colócala floja sobre el bulbo.",
            "Cuando el agua casi hierva, ajusta la cámara superior.",
            "El agua subirá por el vacío. Añade el café molido y revuelve.",
            "Deja infusionar 1-2 minutos.",
            "Retira la fuente de calor. El café filtrado bajará de nuevo al bulbo.",
            "Retira la parte superior y sirve desde el bulbo inferior."
        ]
    },
    filtro: {
        name: "Cafetera de Filtro (V60)",
        idealCoffee: "Cafés de especialidad de origen único con notas complejas.",
        grind: "Media a fina (V60) o Media a gruesa (Chemex).",
        time: "3 - 4 minutos.",
        pros: ["Taza muy limpia, sin sedimentos", "Resalta la claridad, acidez y notas sutiles", "Control total sobre la extracción"],
        cons: ["Requiere equipo adicional (hervidor cuello de cisne, báscula)", "Filtros de papel constantes", "Técnica exigente de vertido"],
        steps: [
            "Coloca el filtro y enjuágalo con agua caliente para quitar sabor a papel y calentar la cafetera.",
            "Descarta esa agua. Añade el café molido.",
            "Vierte un poco de agua (92°C) y espera 30-45s para la floración (bloom).",
            "Continúa vertiendo agua en círculos concéntricos lentos.",
            "Mantén un flujo constante hasta alcanzar el peso objetivo.",
            "Deja que el agua termine de gotear (drawdown) y sirve."
        ]
    },
    coldbrew: {
        name: "Cold Brew",
        idealCoffee: "Cualquier café funciona, los de baja acidez dan resultados muy achocolatados.",
        grind: "Muy gruesa.",
        time: "12 - 24 horas.",
        pros: ["Muy baja acidez, amigable para el estómago", "Naturalmente dulce y suave", "Se conserva varios días en la nevera"],
        cons: ["Requiere mucha planificación (tiempo largo)", "Usa mucha cantidad de café (ratios 1:8 o 1:5)", "Pierde notas florales sutiles por la falta de calor"],
        steps: [
            "Mezcla café molido grueso con agua a temperatura ambiente o fría (ratio 1:8 aprox).",
            "Revuelve bien para que todo el café se humedezca.",
            "Cubre el recipiente y déjalo reposar a temperatura ambiente o en nevera por 12-24 hrs.",
            "Filtra la mezcla (puedes usar filtro de papel o malla muy fina).",
            "El resultado es un concentrado. Para beber, diluye con agua o leche al gusto."
        ]
    }
};

const drinks = [
    {
        name: "Espresso",
        icon: "☕",
        composition: [
            { name: "Espresso (30ml)", class: "comp-espresso" }
        ]
    },
    {
        name: "Americano",
        icon: "☕",
        composition: [
            { name: "Agua Caliente", class: "comp-water" },
            { name: "Espresso (30ml)", class: "comp-espresso" }
        ]
    },
    {
        name: "Macchiato",
        icon: "☕",
        composition: [
            { name: "Mancha de Espuma", class: "comp-foam" },
            { name: "Espresso (30ml)", class: "comp-espresso" }
        ]
    },
    {
        name: "Latte",
        icon: "🥛",
        composition: [
            { name: "Poca Espuma", class: "comp-foam" },
            { name: "Mucha Leche Vaporizada", class: "comp-milk" },
            { name: "Espresso (30ml)", class: "comp-espresso" }
        ]
    },
    {
        name: "Cappuccino",
        icon: "☕",
        composition: [
            { name: "Mucha Espuma (1/3)", class: "comp-foam" },
            { name: "Leche Vaporizada (1/3)", class: "comp-milk" },
            { name: "Espresso (1/3)", class: "comp-espresso" }
        ]
    },
    {
        name: "Flat White",
        icon: "☕",
        composition: [
            { name: "Microespuma Fina", class: "comp-foam" },
            { name: "Leche Vaporizada", class: "comp-milk" },
            { name: "Doble Espresso", class: "comp-espresso" }
        ]
    },
    {
        name: "Mocha",
        icon: "🍫",
        composition: [
            { name: "Espuma/Crema", class: "comp-foam" },
            { name: "Leche Vaporizada", class: "comp-milk" },
            { name: "Espresso", class: "comp-espresso" },
            { name: "Sirope de Chocolate", class: "comp-chocolate" }
        ]
    },
    {
        name: "Espresso Martini",
        icon: "🍸",
        composition: [
            { name: "Espuma de Espresso", class: "comp-foam" },
            { name: "Licor de Café", class: "comp-coffee-liqueur" },
            { name: "Vodka", class: "comp-vodka" },
            { name: "Espresso Frío", class: "comp-espresso" }
        ]
    },
    {
        name: "Irish Coffee",
        icon: "🥃",
        composition: [
            { name: "Crema Batida", class: "comp-cream" },
            { name: "Whiskey Irlandés", class: "comp-whiskey" },
            { name: "Café de Filtro Caliente", class: "comp-water" },
            { name: "Azúcar Morena", class: "comp-sugar" }
        ]
    },
    {
        name: "White Russian",
        icon: "🧊",
        composition: [
            { name: "Crema o Leche", class: "comp-milk" },
            { name: "Licor de Café", class: "comp-coffee-liqueur" },
            { name: "Vodka", class: "comp-vodka" }
        ]
    },
    {
        name: "Carajillo",
        icon: "🥂",
        composition: [
            { name: "Espresso", class: "comp-espresso" },
            { name: "Licor 43", class: "comp-liqueur43" },
            { name: "Hielo", class: "comp-ice" }
        ]
    }
];

const regionData = {
    latam: "América Latina: Destaca por cafés balanceados, con notas a cacao, nueces y acidez brillante. Países clave: Brasil, Colombia, Honduras, Guatemala.",
    africa: "África: La cuna del café. Famoso por perfiles exóticos, florales, cítricos y frutales (bayas). Países clave: Etiopía, Kenia, Ruanda.",
    asia: "Asia / Pacífico: Cafés con mucho cuerpo, terrosos, especiados y de baja acidez. Países clave: Indonesia, Vietnam, India."
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Methods
    const methodsList = document.getElementById('methods-list');
    const methodDetails = document.getElementById('method-details');

    let isFirst = true;
    for (const [key, data] of Object.entries(coffeeMethods)) {
        const btn = document.createElement('button');
        btn.className = `method-btn ${isFirst ? 'active' : ''}`;
        btn.textContent = data.name;
        btn.dataset.method = key;
        
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderMethodDetails(key);
        });

        methodsList.appendChild(btn);
        
        if (isFirst) {
            renderMethodDetails(key);
            isFirst = false;
        }
    }

    function renderMethodDetails(key) {
        const data = coffeeMethods[key];
        
        let prosHtml = data.pros.map(p => `<li>✅ ${p}</li>`).join('');
        let consHtml = data.cons.map(c => `<li>❌ ${c}</li>`).join('');
        let stepsHtml = data.steps.map(s => `<li>${s}</li>`).join('');

        methodDetails.innerHTML = `
            <div class="method-content">
                <h3>${data.name}</h3>
                <div class="info-grid">
                    <div class="info-card">
                        <h4>☕ Café Ideal</h4>
                        <p>${data.idealCoffee}</p>
                    </div>
                    <div class="info-card">
                        <h4>⚙️ Especificaciones</h4>
                        <p><strong>Molienda:</strong> ${data.grind}</p>
                        <p><strong>Tiempo:</strong> ${data.time}</p>
                    </div>
                    <div class="info-card">
                        <h4>Fortalezas</h4>
                        <ul>${prosHtml}</ul>
                    </div>
                    <div class="info-card">
                        <h4>Debilidades</h4>
                        <ul>${consHtml}</ul>
                    </div>
                </div>
                <div class="steps">
                    <h4>📝 Cómo prepararlo paso a paso</h4>
                    <ol>
                        ${stepsHtml}
                    </ol>
                </div>
            </div>
        `;
    }

    // 2. Render Drinks
    const drinksGrid = document.getElementById('drinks-grid');
    
    drinks.forEach(drink => {
        const card = document.createElement('div');
        card.className = 'drink-card';
        
        const compHtml = drink.composition.map(layer => 
            `<div class="comp-layer ${layer.class}">${layer.name}</div>`
        ).join('');

        card.innerHTML = `
            <div class="drink-icon">${drink.icon}</div>
            <h3>${drink.name}</h3>
            <div class="drink-composition">
                ${compHtml}
            </div>
        `;
        drinksGrid.appendChild(card);
    });

    // 3. Map Interaction
    const regions = document.querySelectorAll('.region');
    const regionInfo = document.getElementById('region-info');

    regions.forEach(region => {
        region.addEventListener('mouseenter', (e) => {
            const regionKey = e.currentTarget.dataset.region;
            regionInfo.textContent = regionData[regionKey];
        });
        
        region.addEventListener('mouseleave', () => {
            regionInfo.textContent = "Pasa el ratón sobre un punto en el mapa para descubrir los perfiles de sabor.";
        });
    });
});
