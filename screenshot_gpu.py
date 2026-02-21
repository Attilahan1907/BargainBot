from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')

    # Suche nach Grafikkarte
    search_input = page.locator('input[placeholder*="Produkt"]').first
    search_input.fill('RTX 3080')
    page.locator('button[type="submit"]').first.click()

    # Warte auf Ergebnisse
    page.wait_for_timeout(4000)
    page.screenshot(path='/tmp/gpu_results.png', full_page=False)
    print("Screenshot: GPU results")

    # Scroll etwas runter für ProductCards
    page.evaluate("window.scrollTo(0, 300)")
    page.wait_for_timeout(500)
    page.screenshot(path='/tmp/gpu_cards.png', full_page=False)
    print("Screenshot: GPU cards")

    browser.close()
    print("Done")
