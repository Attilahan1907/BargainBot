"""Debuggt Kleinanzeigen HTML-Struktur für Location-Felder"""
import requests
from bs4 import BeautifulSoup

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "de-DE,de;q=0.9",
}

# Test 1: Mit locationStr=90419 + radius=30
url = "https://www.kleinanzeigen.de/s-grafikkarte/k0"
params = {"locationStr": "90419", "radius": 30}
print(f"Request URL: {url}?locationStr=90419&radius=30\n")

try:
    r = requests.get(url, headers=headers, params=params, timeout=15)
    print(f"Status: {r.status_code}")
    print(f"Final URL: {r.url}\n")

    soup = BeautifulSoup(r.text, "lxml")
    articles = soup.select("article.aditem")
    print(f"Artikel gefunden: {len(articles)}\n")

    for i, item in enumerate(articles[:5]):
        title_tag = item.select_one(".text-module-begin a")
        title = title_tag.text.strip() if title_tag else "?"

        # Alle möglichen Location-Selektoren prüfen
        loc1 = item.select_one(".aditem-main--top--left")
        loc2 = item.select_one(".simpletag")
        loc3 = item.select_one("[data-testid]")

        print(f"[{i+1}] {title[:60]}")
        print(f"     top-left: {loc1.get_text(' ', strip=True)[:80] if loc1 else '-'}")
        print(f"     simpletag: {loc2.get_text(strip=True) if loc2 else '-'}")
        print(f"     data-testid: {loc3}")

        # Zeige alle Klassen im Artikel
        all_spans = item.select("span, p, small")
        for el in all_spans[:8]:
            t = el.get_text(strip=True)
            if t and len(t) < 60:
                print(f"     <{el.name} class='{el.get('class', '')}'>: {t}")
        print()

except Exception as e:
    print(f"Fehler: {e}")
