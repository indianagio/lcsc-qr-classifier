# Formato QR Code LCSC

I QR code sulle buste LCSC usano un formato proprietario `key:value` separato da virgole, racchiuso in `{}`.

## Esempio reale

```
{pbn:PICK2603050094,on:GB2603050779,pc:C970725,pm:CH224K,qty:20,mc:,cc:1,pdi:201432552,hp:12,wc:ZH}
```

## Campi

| Campo | Nome esteso | Esempio | Note |
|-------|-------------|---------|------|
| `pbn` | Picking Batch Number | `PICK2603050094` | ID prelievo interno LCSC |
| `on`  | Order Number | `GB2603050779` | Numero ordine visibile sull'etichetta |
| `pc`  | Product Code | `C970725` | Codice prodotto LCSC (C-number, cercabile su lcsc.com) |
| `pm`  | Part Model | `CH224K` | Part number del componente (fornito dal produttore) |
| `qty` | Quantity | `20` | Numero di pezzi nella confezione |
| `mc`  | Manufacturer Code | *(vuoto)* | Codice interno produttore, spesso vuoto |
| `cc`  | Customer/Category Code | `1` | Codice categoria cliente |
| `pdi` | Product Data Identifier | `201432552` | ID interno LCSC per tracking |
| `hp`  | Hub Parameter | `12` | Parametro logistico hub di smistamento |
| `wc`  | Warehouse Code | `ZH` | ZH = Zhongshan (magazzino principale LCSC) |

## Come cercare il componente su LCSC

Usa il campo `pc` (Product Code) per la ricerca diretta:
```
https://www.lcsc.com/product-detail/_C970725.html
```

Oppure cerca il `pm` (Part Model) sul sito LCSC o su JLCPCB.

## Compatibilità lettore

Il **Tera D5100-CR** in modalità HID/tastiera invia il contenuto del QR come sequenza di tasti.
Assicurarsi che il campo input HTML sia in focus prima della scansione, oppure usare l'auto-paste della pagina.
