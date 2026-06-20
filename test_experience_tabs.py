from playwright.sync_api import sync_playwright
import json
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    
    # Take screenshot of the page
    screenshot_path = os.path.join(os.path.expanduser('~'), 'Desktop', 'kl_portfolio', 'tabs_screenshot.png')
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"Screenshot saved to {screenshot_path}")
    
    # Find all tab triggers
    tab_triggers = page.locator('[role="tab"]').all()
    print(f"Found {len(tab_triggers)} tab triggers")
    
    # Inspect each tab trigger
    for i, trigger in enumerate(tab_triggers):
        aria_label = trigger.get_attribute('aria-label')
        aria_selected = trigger.get_attribute('aria-selected')
        inner_html = trigger.inner_html()
        classes = trigger.get_attribute('class')
        
        print(f"\nTab {i}:")
        print(f"  aria-label: {aria_label}")
        print(f"  aria-selected: {aria_selected}")
        print(f"  classes: {classes}")
        print(f"  contains logo: {'img' in inner_html}")
        if trigger.locator('img').count() > 0:
            print(f"  alt text: {trigger.locator('img').get_attribute('alt')}")
    
    # Click on the second tab and check styles
    if len(tab_triggers) > 1:
        print("\n\n--- Clicking second tab ---")
        tab_triggers[1].click()
        page.wait_for_timeout(500)
        
        # Re-inspect the tabs to see selected state styling
        tab_triggers = page.locator('[role="tab"]').all()
        for i, trigger in enumerate(tab_triggers):
            aria_selected = trigger.get_attribute('aria-selected')
            
            # Check computed styles
            border_left = page.evaluate(f'window.getComputedStyle(document.querySelectorAll("[role=\\"tab\\"]")[{i}]).borderLeftColor')
            bg_color = page.evaluate(f'window.getComputedStyle(document.querySelectorAll("[role=\\"tab\\"]")[{i}]).backgroundColor')
            
            print(f"\nTab {i} (selected={aria_selected}):")
            print(f"  border-left-color: {border_left}")
            print(f"  background-color: {bg_color}")
        
        screenshot_selected = os.path.join(os.path.expanduser('~'), 'Desktop', 'kl_portfolio', 'tabs_screenshot_selected.png')
        page.screenshot(path=screenshot_selected, full_page=True)
        print(f"Screenshot saved to {screenshot_selected}")
    
    browser.close()
    print("\n\nDone!")
