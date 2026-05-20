# MHP SPA — Sitio Web Corporativo

Sitio web de marketing para **MHP SPA**, empresa chilena de ingeniería industrial especializada en climatización vehicular, mantenimiento de maquinaria pesada, gestión de activos y el producto flagship **MONCON ON LINE 24/7** — sistema de monitoreo continuo de condiciones para faenas mineras.

---

## Stack

| Capa       | Tecnología                              |
|------------|-----------------------------------------|
| Markup     | HTML5 semántico                         |
| Estilos    | CSS3 modular con Custom Properties      |
| Scripts    | JavaScript ES Modules (sin frameworks)  |
| Fuentes    | Google Fonts (Outfit, Barlow, JetBrains Mono, Bebas Neue) |
| Hosting    | Hostinger — hosting estático            |

---

## Estructura de carpetas

```
MHP/
├── assets/
│   ├── images/          ← Logo, fotos propias, favicon, og-image
│   └── icons/           ← Íconos SVG si se agregan
│
├── css/
│   ├── base/
│   │   ├── variables.css   ← Tokens de diseño (:root)
│   │   └── reset.css       ← Reset global + container .ct
│   ├── components/
│   │   ├── nav.css         ← Barra de navegación + efecto scroll
│   │   ├── hero.css        ← Sección hero
│   │   ├── buttons.css     ← Todos los estilos de botones
│   │   ├── ticker.css      ← Marquee ticker
│   │   ├── cards.css       ← Cards de servicios, valor y arquitectura
│   │   ├── stats.css       ← Stats bar y problem bar
│   │   ├── about.css       ← Sección Nosotros
│   │   ├── moncon.css      ← Sección MONCON (hero, dashboard, parámetros)
│   │   ├── equipment.css   ← Categorías de equipos y sección única Chile
│   │   ├── cta.css         ← CTA + botón flotante WhatsApp
│   │   └── footer.css      ← Footer
│   ├── layout/
│   │   ├── sections.css    ← Wrappers de secciones + headings compartidos
│   │   └── images.css      ← Layouts de imágenes (strip, row, banner)
│   └── utilities/
│       ├── animations.css  ← @keyframes (fadeUp, pulse, ticker scroll)
│       └── responsive.css  ← Media queries (900px y 600px)
│
├── js/
│   ├── components/
│   │   └── nav.js          ← Efecto glassmorphism al hacer scroll
│   └── main.js             ← Entry point — inicializa componentes
│
├── index.html              ← Página principal
├── .editorconfig           ← Configuración de editor (UTF-8, espacios, LF)
├── .gitignore
└── README.md
```

---

## Ejecutar localmente

El proyecto es HTML/CSS/JS puro. No requiere instalación, servidor Node ni build tools.

**Opción 1 — VS Code + Live Server (recomendado):**
1. Abre la carpeta en VS Code.
2. Instala la extensión **Live Server** de Ritwick Dey.
3. Click derecho en `index.html` → **Open with Live Server**.

**Opción 2 — Python (si está instalado):**
```bash
python -m http.server 8080
# Abre http://localhost:8080
```

**Opción 3 — Doble click en index.html:**
Funciona para visualizar, pero `type="module"` en el JS requiere un servidor HTTP real para funcionar (CORS). Usa Live Server para desarrollo completo.

---

## Despliegue en Hostinger

### Pasos

1. **Comprimir el proyecto** — selecciona todas las carpetas y archivos (sin incluir `mhp-completo.html` ni archivos de backup).
2. **Accede al panel Hostinger** → File Manager o FTP (FileZilla).
3. **Sube los archivos** a la carpeta `public_html/` (o el dominio correspondiente).
4. **Verifica la estructura** en Hostinger:
   ```
   public_html/
   ├── index.html
   ├── assets/
   ├── css/
   └── js/
   ```
5. El sitio queda disponible en tu dominio inmediatamente.

### Configuración recomendada en Hostinger

En el panel → **Avanzado → .htaccess**, agrega para mejorar el rendimiento:

```apache
# Caché de assets estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css             "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg           "access plus 1 year"
  ExpiresByType image/png            "access plus 1 year"
  ExpiresByType image/webp           "access plus 1 year"
</IfModule>

# Compresión GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

---

## Mantenimiento

### Cambiar el logo

Reemplaza el archivo `assets/images/mhp-logo.png` con el nuevo logo manteniendo el mismo nombre. El logo aparece en:
- Navegación
- Secciones con `.stag-row`
- Sección MONCON
- Footer

### Cambiar imágenes propias de MHP

Las 14 fotografías de WhatsApp en la carpeta `Images/` original deben renombrarse y moverse a `assets/images/`. Nombres sugeridos:

| Nombre sugerido             | Uso recomendado                     |
|-----------------------------|-------------------------------------|
| `hero-bg.jpg`               | Fondo de sección hero               |
| `about-team.jpg`            | Imagen sección Nosotros             |
| `equipment-mining-01.jpg`   | Banner de equipos                   |
| `equipment-mining-02.jpg`   | Strip MONCON izquierda              |
| `equipment-mining-03.jpg`   | Strip MONCON derecha                |
| `moncon-sensor.jpg`         | Row de imágenes IoT (col 1)         |
| `moncon-tech.jpg`           | Row de imágenes IoT (col 2)         |
| `moncon-cyber.jpg`          | Row de imágenes IoT (col 3)         |

Luego actualiza las referencias en `index.html` reemplazando las URLs de Unsplash por las rutas locales, por ejemplo:
```html
<!-- Antes (Unsplash) -->
<img src="https://images.unsplash.com/photo-...">

<!-- Después (local) -->
<img src="assets/images/hero-bg.jpg" alt="Operación minera">
```

### Modificar colores o tipografías

Edita únicamente `css/base/variables.css`. Todos los componentes consumen estas variables, por lo que un cambio aquí se propaga al sitio completo.

```css
:root {
  --orange: #D4710A;   /* ← Cambia el color naranja aquí */
  --green-400: #2E9B58; /* ← Verde principal */
  ...
}
```

### Modificar textos de contenido

Todo el contenido está en `index.html`. Cada sección está claramente delimitada con comentarios:

```html
<!-- ══ SERVICIOS ══ -->
<!-- ══ MONCON ON LINE 24/7 ══ -->
<!-- ══ NOSOTROS ══ -->
<!-- ══ EQUIPOS ══ -->
<!-- ══ CONTACTO ══ -->
```

### Agregar una nueva sección

1. Agrega el HTML en `index.html` siguiendo el patrón existente:
   ```html
   <section class="sec sec-g" id="nueva-seccion" aria-labelledby="nueva-titulo">
     <div class="ct">
       <h2 class="stit" id="nueva-titulo">TÍTULO <span class="o">ACENTO</span></h2>
       ...contenido...
     </div>
   </section>
   ```
2. Crea `css/components/nueva-seccion.css` con los estilos específicos.
3. Agrega el `<link>` en el `<head>` de `index.html` antes de `responsive.css`.
4. Agrega el enlace en el `<nav>` si corresponde.

### Agregar lógica JavaScript

1. Crea un archivo en `js/components/mi-modulo.js`.
2. Exporta la función de inicialización:
   ```js
   export function initMiModulo() { ... }
   ```
3. Importa e invoca en `js/main.js`:
   ```js
   import { initMiModulo } from './components/mi-modulo.js';
   initMiModulo();
   ```

---

## GitHub — Flujo de trabajo recomendado

### Estructura de branches

```
main          ← producción (lo que está en Hostinger)
develop       ← integración de cambios
feature/xxx   ← ramas de trabajo individual
hotfix/xxx    ← correcciones urgentes en producción
```

### Convención de commits

Usa el estándar **Conventional Commits**:

```
feat:     nueva funcionalidad
fix:      corrección de bug
style:    cambios de estilos sin efecto funcional
content:  cambio de texto o imagen
docs:     cambios en README u otra documentación
chore:    tareas de mantenimiento
```

Ejemplos:
```bash
git commit -m "feat: agregar sección de casos de éxito"
git commit -m "content: actualizar número de teléfono en footer"
git commit -m "style: ajustar colores del botón CTA en móvil"
git commit -m "fix: corregir alineación en tablet del hero"
```

### Flujo básico

```bash
# Crear rama de trabajo
git checkout -b feature/nueva-seccion

# Hacer cambios, luego:
git add css/components/nueva-seccion.css index.html
git commit -m "feat: agregar sección nueva-seccion"

# Merge a develop para revisión
git checkout develop
git merge feature/nueva-seccion

# Cuando esté aprobado, merge a main y subir a Hostinger
git checkout main
git merge develop
```

### Archivos importantes para colaboradores

| Archivo              | Propósito                                        |
|----------------------|--------------------------------------------------|
| `css/base/variables.css` | Sistema de diseño — empezar aquí para cambios visuales |
| `index.html`         | Todo el contenido del sitio                      |
| `css/utilities/responsive.css` | Todos los breakpoints en un solo lugar |
| `assets/images/`     | Reemplazar imágenes manteniendo los mismos nombres |

---

## Checklist pre-deploy

- [ ] Logo `mhp-logo.png` colocado en `assets/images/`
- [ ] Favicon `favicon.png` en `assets/images/`
- [ ] Imagen OG `og-image.jpg` en `assets/images/` (1200×630px)
- [ ] Imágenes propias reemplazando URLs de Unsplash
- [ ] Número de teléfono y email verificados en todo el HTML
- [ ] URL canónica actualizada si se conoce el dominio final
- [ ] Revisar en mobile, tablet y desktop

---

## Contacto del proyecto

| Campo    | Valor                          |
|----------|-------------------------------|
| Empresa  | MHP SPA                       |
| Teléfono | +56 9 6247 1506               |
| Email    | gerencia@mhproyectos.cl       |
| Sede     | Chicureo, Colina — Santiago   |
