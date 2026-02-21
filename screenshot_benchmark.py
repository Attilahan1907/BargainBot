from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')

    # Scroll zu Kategorien
    page.evaluate("document.querySelector('#categories').scrollIntoView()")
    page.wait_for_timeout(600)

    # Klick auf Elektronik (sichtbare Karte im Desktop-Grid)
    page.locator('button:has(h3:text("Elektronik"))').first.click()
    page.wait_for_timeout(500)

    # Klick auf Grafikkarten Unterkategorie
    page.locator('button:has-text("Grafikkarten")').first.click()
    page.wait_for_timeout(5000)

    page.screenshot(path='/tmp/benchmark_results.png', full_page=False)
    print("Screenshot: benchmark results")

    page.evaluate("window.scrollTo(0, 300)")
    page.wait_for_timeout(400)
    page.screenshot(path='/tmp/benchmark_cards.png', full_page=False)
    print("Screenshot: benchmark cards")

    browser.close()
    print("Done")
