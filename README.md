# 📺 YT Pilot - Zdalne sterowanie YouTube

Lokalny system do zdalnego sterowania odtwarzaczem YouTube w przeglądarce Firefox z poziomu telefonu komórkowego. Projekt wykorzystuje WebSockety (Node.js) do komunikacji w czasie rzeczywistym oraz natywne API odtwarzacza YouTube.

## 🚀 Funkcje

- ⏯ Odtwarzanie / Pauza
- 🔊 Zwiększanie i zmniejszanie głośności (zintegrowane z odtwarzaczem YT)
- ⏩ Przewijanie wideo do przodu (+10s)
- ⏪ Przewijanie wideo do tyłu (-10s)
- 📱 Responsywny, nowoczesny interfejs na telefon (Dark Mode)
- ⚙️ Działanie w tle 24/7 dzięki menedżerowi procesów PM2

## 🏗 Architektura

Projekt składa się z trzech głównych elementów:
1. **Serwer WebSocket (Pośrednik):** Skrypt Node.js (`server.js`) przekazujący komendy między urządzeniami.
2. **Pilot (Nadawca):** Prosta strona internetowa (`index.html`) z interfejsem dla telefonu.
3. **Rozszerzenie Firefox (Odbiornik):** Skrypt wstrzykiwany do kart YouTube, który używa obiektu `wrappedJSObject` do sterowania wewnętrznym API odtwarzacza.

## 📋 Wymagania

- Komputer i telefon w tej samej sieci Wi-Fi.
- [Node.js](https://nodejs.org/) zainstalowany na komputerze.
- Przeglądarka Mozilla Firefox.

## 🛠 Instalacja i konfiguracja

1. **Pobierz projekt i wejdź do folderu:**
   Pobierz pliki, otwórz terminal w głównym folderze projektu.

2. **Zainstaluj zależności:**
   W terminalu wpisz:
   ```bash
   npm install ws
   npm install -g pm2
   ```

3. **Skonfiguruj swój adres IP:**
   - Sprawdź lokalny adres IP swojego komputera (Linux: `hostname -I`, Windows: `ipconfig`).
   - Otwórz plik `index.html` i podmień `TWOJE_IP` na swój adres lokalny (np. `192.168.0.132`).
   - Otwórz plik `yt-pilot-extension/background.js` i zrób to samo.

4. **Odblokuj zaporę (tylko Linux):**
   Jeśli używasz UFW, upewnij się, że porty 8080 i 8081 są otwarte:
   ```bash
   sudo ufw allow 8080
   sudo ufw allow 8081
   ```

## ⚙️ Uruchomienie (Zautomatyzowane przez PM2)

Aby serwery działały w tle i uruchamiały się razem z komputerem, użyj PM2:

1. **Uruchom serwer komunikacyjny:**
   
```bash
   pm2 start server.js --name "yt-serwer"
   ```

2. **Uruchom serwer dla telefonu:**
   
```bash
   pm2 serve ./ 8081 --name "yt-pilot"
   ```

3. **Zapisz stan autostartu:**
   ```bash
   pm2 startup
   # Skopiuj i wklej komendę, którą wygeneruje powyższe polecenie!
   pm2 save
   ```

## 🦊 Instalacja rozszerzenia w Firefox

1. Otwórz przeglądarkę Firefox i wpisz w pasku adresu: `about:debugging`
2. Wybierz zakładkę **Ten program Firefox**.
3. Kliknij **Załaduj tymczasowy dodatek...**
4. Wybierz plik `manifest.json` z folderu `yt-pilot-extension`.
5. Wejdź na YouTube, włącz film i wciśnij **F5** (aby zaktualizować stronę i wstrzyknąć skrypt).

## 📱 Używanie

1. Otwórz przeglądarkę w telefonie.
2. Wpisz adres: `http://TWOJE_IP:8081` (pamiętaj o `http://` zamiast `https://`).
3. Korzystaj z przycisków, by sterować odtwarzaczem!

---
**Uwaga:** Ponieważ rozszerzenie Firefox jest ładowane w trybie deweloperskim, przeglądarka zapomni o nim po jej zamknięciu lub po restarcie komputera. Musisz je załadować ponownie w zakładce `about:debugging`. Serwery PM2 uruchomią się automatycznie.
