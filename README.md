# 🔲 LCSC QR Component Classifier

Pagina web locale per classificare componenti elettronici LCSC dal QR code letto con il lettore **Tera D5100-CR**.

## 🚀 Come si usa

1. Apri `src/lcsc-qr-classifier.html` nel browser
2. Punta il lettore sul QR code della busta LCSC
3. Il testo viene incollato automaticamente nel campo
4. Il componente viene classificato istantaneamente

## 📦 Struttura repo

```
lcsc-qr-classifier/
├── src/
│   └── lcsc-qr-classifier.html   # App principale (tutto in un file)
├── docs/
│   └── qr-format.md              # Documentazione formato QR LCSC
└── README.md
```

## 🗂 Categorie riconosciute

| Icona | Categoria | Esempi |
|-------|-----------|--------|
| 🔲 | Circuito Integrato (IC) | MCU, LDO, driver USB-C PD, op-amp |
| ▭ | Resistenza | SMD 0402/0603, NTC, trimmer |
| ⊣⊢ | Condensatore | MLCC ceramico, elettrolitico, tantalio |
| 〰 | Induttore / Trasformatore | Power inductor, ferrite bead |
| ▷\| | Diodo | Schottky, Zener, TVS, ESD, LED |
| ⊳ | Transistor / MOSFET | BJT NPN/PNP, N/P-ch MOSFET, IGBT |
| ⬛ | Connettore | JST, USB, header pin, relè |
| ◇ | Oscillatore / Cristallo | XTAL, TCXO, risonatore |
| ⚲ | Interruttore / Pulsante | Tact switch, DIP switch, encoder |
| ⚡ | Fusibile / Protezione | PTC, MOV, varistor |
| 📺 | Display / LED | WS2812, 7-seg, LCD, OLED |
| 🔍 | Sensore | IMU, temp, luce, corrente |
| 📦 | Modulo / Altro | Tutto il resto |

## 📋 Formato QR Code LCSC

Esempio reale:
```
{pbn:PICK2603050094,on:GB2603050779,pc:C970725,pm:CH224K,qty:20,mc:,cc:1,pdi:201432552,hp:12,wc:ZH}
```

Vedi [`docs/qr-format.md`](docs/qr-format.md) per il dettaglio di ogni campo.

## ⚙️ Requisiti

- Nessuno. File HTML statico, funziona offline.
- Browser moderno (Chrome, Firefox, Edge, Safari).
- Lettore USB/HID configurato in modalità **tastiera** (default Tera D5100-CR).

## 📄 Licenza

MIT — Giorgio Baseggio
