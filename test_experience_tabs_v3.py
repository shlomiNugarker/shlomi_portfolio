from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    
    # List all sections
    sections = page.locator('h1, h2, h3').all()
    print("Found sections:")
    for i, section in enumerate(sections[:10]):
        print(f"  {i}: {section.text_content()}")
    
    # Look for experience tabs
    tabs = page.locator('[role="tablist"]').all()
    print(f"\nFound {len(tabs)} tablists")
    
    if tabs:
        # Find the first tablist and take a screenshot around it
        tab_list = tabs[0]
        box = tab_list.bounding_box()
        print(f"First tablist bounding box: {box}")
        
        # Try to take a viewport screenshot
        page.set_viewport_size(width=1280, height=900)
        screenshot_path = os.path.join(os.path.expanduser('~'), 'Desktop', 'kl_portfolio', 'experience_tabs_v3.png')
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
    
    browser.close()
