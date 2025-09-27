# 🗄️ Lokales Datenbanksystem - Anime Website

## 🎯 Beschreibung

Dieses Projekt enthält jetzt ein vollständiges lokales Datenbanksystem, das MongoDB mit dem localStorage des Browsers simuliert. Die Daten bleiben zwischen den Sitzungen bestehen und Sie können alle Informationen der Anime-Website verwalten.

## 🚀 Funktionalitäten

### 📊 Lokale Datenbank
- **LocalDatabase.js** - Datenbanksystem mit CRUD-Operationen
- **Persistierung** - Daten werden im localStorage gespeichert
- **Export/Import** - Vollständige Datensicherung in JSON
- **Erweiterte Suche** - Suche in jeder Sammlung

### 📋 Enthaltene Modelle

#### 🎌 AnimeModel
- Vollständige Anime-Informationen (Titel, Synopsis, Genres, Episoden)
- Bewertungen und Popularität
- Bilder und Trailer
- Charaktere und Mitarbeiter
- Benutzerstatistiken

#### 👤 UserModel
- Vollständige Benutzerprofile
- Persönliche Anime-Listen (schaue, abgeschlossen, etc.)
- Anzeigestatistiken
- Präferenz- und Konfigurationssystem

#### ⭐ ReviewModel
- Vollständiges Bewertungssystem
- Bewertungen nach Kategorien (Geschichte, Animation, Ton, etc.)
- Nützlichkeits-Abstimmungen (hilfreich/nicht hilfreich)
- Spoiler-Filter

#### 💬 ForumPostModel
- Forum-Posts mit Kategorien
- System für verschachtelte Antworten
- Likes und Aufrufe
- Umfragen und Abstimmungen

## 🎮 Verwendung

### 1. Projekt Ausführen
```bash
npm run dev
```

### 2. Automatische Initialisierung
- Beim Starten der App wird die Datenbank automatisch initialisiert
- Wenn keine Daten vorhanden sind, werden automatisch Beispieldaten geladen
- Enthält 5 beliebte Animes und Test-Benutzer

### 3. Zugriff auf das Administrationspanel
- Gehe zu: `http://localhost:5174/Database`
- Von hier aus kannst du:
  - ✨ **DB Befüllen** - Mit Beispieldaten füllen
  - 🗑️ **DB Leeren** - Alle Daten löschen
  - 📥 **DB Exportieren** - JSON-Backup herunterladen
  - 📤 **DB Importieren** - Aus Datei wiederherstellen
  - 🔍 **Suchen** - In jeder Sammlung suchen
  - ➕ **Hinzufügen** - Neue Animes erstellen
  - 🗑️ **Löschen** - Spezifische Einträge entfernen

### 4. Animes Anzeigen
- Gehe zu: `http://localhost:5174/Anime`
- Du siehst alle Animes mit:
  - Filter nach Genre, Status, Typ
  - Sortierung nach Bewertung, Popularität, Datum
  - Suche nach Titel, Synopsis, Studio
  - Attraktive Karten mit allen Informationen

## 📚 Enthaltene Beispieldaten

### 🎌 Animes
- **Attack on Titan** - Abgeschlossen, 75 Episoden
- **Your Name** - Film, 106 Minuten
- **Demon Slayer** - Laufend, 32 Episoden
- **Spirited Away** - Studio Ghibli Film
- **One Piece** - Lange Serie, 1000+ Episoden

### 👥 Benutzer
- **admin** (Administrator)
- **otaku_master** (Verifizierter Benutzer)
- **casual_viewer** (Neuer Benutzer)

### ⭐ Bewertungen und 💬 Forum-Posts
- Detaillierte Bewertungen für einige Animes
- Beispiel-Posts im Forum
- Benutzerlisten mit Fortschritt

## 🛠️ Entwicklung

### Neue Animes Programmatisch Hinzufügen
```javascript
import { AnimeModel } from '@/models/AnimeModel'

const newAnime = new AnimeModel({
  title: "Mein Neuer Anime",
  synopsis: "Eine epische Geschichte...",
  genres: ["Action", "Adventure"],
  status: "ongoing",
  episodes: 24,
  rating: 8.5
})

newAnime.save()
```

### Animes Suchen
```javascript
// Alle suchen
const allAnimes = AnimeModel.findAll()

// Nach ID suchen
const anime = AnimeModel.findById("anime_id")

 Nach Genre suchen
const actionAnimes = AnimeModel.findByGenre("Action")

// Top Trending
const trending = AnimeModel.getTrending(10)
```

### Benutzerverwaltung
```javascript
import { UserModel } from '@/models/UserModel'

// Benutzer erstellen
const user = new UserModel({
  username: "neuer_otaku",
  email: "otaku@example.com",
  password: "password123"
})

user.save()

// Anime zur Liste hinzufügen
user.addAnimeToList("anime_id", "watching", 8, 5)
```

## 🎨 Anpassung

### Beispieldaten Ändern
Bearbeite `src/database/SeedData.js`, um die Animes, Benutzer und den anfänglichen Inhalt anzupassen.

### Neue Modelle Hinzufügen
1. Erstelle neues Modell in `src/models/`
2. Folge dem Muster der bestehenden Modelle
3. Füge die Sammlung zu `LocalDatabase.js` hinzu
4. Füge Beispieldaten in `SeedData.js` hinzu

## 🔧 Technische Eigenschaften

### Persistierung
- Daten in `localStorage` gespeichert
- Überlebt Browser-Neustarts
- Eindeutige Daten pro Domain

### Leistung
- Synchrone Operationen für Einfachheit
- Grundlegende ID-Indizierung
- Begrenzung bei Suchergebnissen

### Backups
- Vollständiger Export zu JSON
- Import mit Validierung
- Datenwiederherstellung

## 🚨 Einschränkungen

- **Nur lokal** - Daten synchronisieren nicht zwischen Geräten
- **Kapazität** - Begrenzt durch Browser localStorage (~5-10MB)
- **Gleichzeitigkeit** - Eine Sitzung pro Browser
- **Keine echte Authentifizierung** - Simuliertes Login-System

## 🎯 Kommende Funktionalitäten

- [ ] Erweiterte Bewertungssystem
- [ ] Empfehlungen basierend auf Präferenzen
- [ ] Detailliertere Anzeigestatistiken
- [ ] Achievement/Erfolgs-System
- [ ] Import von externen APIs (MyAnimeList, etc.)

---

Du hast jetzt ein vollständiges Datenbanksystem am Laufen! 🎉

Bei Fragen überprüfe die Projektdateien oder das Administrationspanel unter `/Database`.