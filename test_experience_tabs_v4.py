from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    
    # Find experience tablist
    tabs = page.locator('[role="tablist"]').all()
    print(f"Found {len(tabs)} tablists")
    
    if tabs:
        tab_list = tabs[0]
        
        # Scroll to the tablist
        tab_list.evaluate('el => el.scrollIntoView()')
        page.wait_for_timeout(300)
        
        screenshot_path = os.path.join(os.path.expanduser('~'), 'Desktop', 'kl_portfolio', 'experience_tabs_v4.png')
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
        
        # Detailed analysis of tab triggers
        triggers = page.locator('[role="tab"]').all()
        print(f"\nFound {len(triggers)} tab triggers:")
        
        for i, trigger in enumerate(triggers):
            aria_label = trigger.get_attribute('aria-label')
            aria_selected = trigger.get_attribute('aria-selected')
            img = trigger.locator('img')
            alt_text = img.get_attribute('alt') if img.count() > 0 else None
            
            print(f"\n  Tab {i}:")
            print(f"    aria-label: {aria_label}")
            print(f"    aria-selected: {aria_selected}")
            print(f"    img alt: {alt_text}")
            print(f"    visible text: '{trigger.text_content()}'")
    
    browser.close()
    print("\n\nDone!")
