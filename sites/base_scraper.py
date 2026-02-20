import random
import time

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
]

class BaseScraper:
    SOURCE = "unknown"

    def get_headers(self):
        """Rotiert User-Agent bei jedem Aufruf."""
        return {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }

    def random_delay(self, min_s=0.2, max_s=0.8):
        """Zufällige Pause zwischen Requests."""
        time.sleep(random.uniform(min_s, max_s))

    def normalize(self, item):
        """Fügt 'source' Feld hinzu — in Unterklassen aufrufen."""
        item["source"] = self.SOURCE
        return item

    def search(self, query, location="", radius=50, start_page=1, batch_size=3, category=None, category_id=None):
        """Muss von jeder Unterklasse implementiert werden. Gibt (results, has_more) zurück."""
        raise NotImplementedError(f"{self.__class__.__name__} muss search() implementieren")
