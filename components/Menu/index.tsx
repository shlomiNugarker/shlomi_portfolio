import Logo from '../Logo'
import styles from './styles.module.css'
import Navigation from './Navigation'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'

const Menu = () => {
  // Scroll direction is the only JS-driven bit and it only affects an already-
  // mounted interaction (hiding the bar on scroll-down), never first paint.
  const scrollDirection = useScrollDirection(true)
  const hidden = scrollDirection === ScrollDirection.Down

  return (
    // The fixed bar + background are applied via CSS media query (.menuBar),
    // not a JS isMobile flag, so the mobile layout is correct on first paint
    // (no hydration jump). The bar only exists/styles below xl.
    <div
      className={styles.menuBar}
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <header className="m-0 flex w-full items-center justify-between bg-kl-bg px-5 py-5 md:px-12 lg:bg-transparent lg:px-20 lg:py-0">
        <Logo />
        <Navigation />
      </header>
    </div>
  )
}

export default Menu
