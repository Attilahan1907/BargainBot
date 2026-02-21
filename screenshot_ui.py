from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # 1. Landing / Empty state
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='/tmp/ui_landing.png', full_page=True)
    print("Screenshot 1: landing saved")

    # 2. Scroll down a bit to see more
    page.evaluate("window.scrollTo(0, 300)")
    page.wait_for_timeout(400)
    page.screenshot(path='/tmp/ui_scrolled.png', full_page=True)
    print("Screenshot 2: scrolled saved")

    # 3. Mobile view
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='/tmp/ui_mobile.png', full_page=True)
    print("Screenshot 3: mobile saved")

    browser.close()
    print("Done")
