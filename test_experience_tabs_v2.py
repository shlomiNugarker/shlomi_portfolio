from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    
    # Scroll to experience section
    page.locator('[id="experience"]').scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    
    # Take screenshot of the experience section
    screenshot_path = os.path.join(os.path.expanduser('~'), 'Desktop', 'kl_portfolio', 'experience_section.png')
    page.screenshot(path=screenshot_path, full_page=False)
    print(f"Screenshot saved to {screenshot_path}")
    
    # Find the experience tabs
    tab_list = page.locator('[role="tablist"]').first
    if tab_list.is_visible():
        # Take a focused screenshot of just the tab area
        box = tab_list.bounding_box()
        print(f"Tab list found at: {box}")
    
    # Check keyboard accessibility
    print("\nChecking keyboard accessibility...")
    page.keyboard.press('Tab')  # Tab to first interactive element
    page.wait_for_timeout(200)
    page.keyboard.press('Tab')  # Tab again
    
    # Get focused element
    focused_elem = page.evaluate('document.activeElement.outerHTML')
    print(f"Focused element: {focused_elem[:200]}")
    
    browser.close()
    print("\n\nDone!")
