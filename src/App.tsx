import { useEffect, useState } from 'react'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Academics' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#alumni', label: 'Alumni Network' },
  { href: '#admissions', label: 'Admissions' },
]

const learningAreas = [
  {
    number: '01',
    title: 'Academic excellence',
    description:
      'Build strong foundations through engaging lessons, thoughtful guidance, and a love of learning.',
  },
  {
    number: '02',
    title: 'Creative learning',
    description:
      'Make room for imagination, expression, and the confidence to explore new ideas.',
  },
  {
    number: '03',
    title: 'Personal growth',
    description:
      'Grow curiosity, empathy, and resilience in a supportive school community.',
  },
]

const campusHighlights = [
  'A welcoming environment for learning and discovery',
  'Opportunities to explore interests inside and outside class',
  'A school community that encourages every learner to participate',
]

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Tulas International School home">
      <span className="brand-mark" aria-hidden="true">T</span>
      <span className="brand-copy">
        <strong>TIS</strong>
        <small>Tulas International School</small>
      </span>
    </a>
  )
}

function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('tis-theme') === 'dark')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDark)
    localStorage.setItem('tis-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const progressFill = document.querySelector<HTMLElement>('#progress-fill')
    let frame = 0

    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const progress =
          scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0

        if (progressFill) {
          progressFill.style.width = `${progress}%`
        }
      })
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!('IntersectionObserver' in window) || reducedMotion.matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>('.custom-cursor')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    if (!cursor || reducedMotion.matches || coarsePointer.matches) {
      return
    }

    document.body.classList.add('has-custom-cursor')

    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    const activateCursor = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('a, button')) {
        cursor.classList.add('is-active')
      }
    }
    const deactivateCursor = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('a, button')) {
        cursor.classList.remove('is-active')
      }
    }

    window.addEventListener('pointermove', moveCursor, { passive: true })
    document.addEventListener('pointerover', activateCursor)
    document.addEventListener('pointerout', deactivateCursor)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('pointerover', activateCursor)
      document.removeEventListener('pointerout', deactivateCursor)
    }
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span id="progress-fill" />
      </div>
      <div className="custom-cursor" aria-hidden="true">
        <span className="cursor-ring" />
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />

          <nav
            className={`main-nav${isMenuOpen ? ' nav-open' : ''}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              aria-pressed={isDark}
              onClick={() => setIsDark((current) => !current)}
            >
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
            </button>
            <a className="primary-btn nav-cta" href="#admissions">
              Discover TIS
            </a>
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Tulas International School</p>
              <h1>Curiosity today. Confidence for tomorrow.</h1>
              <p className="lead">
                A school experience shaped around learning, creativity, and the
                confidence to take on what comes next.
              </p>
              <div className="hero-actions">
                <a className="primary-btn" href="#admissions">Explore TIS</a>
                <a className="secondary-btn" href="#about">Get to know us</a>
              </div>
              <ul className="hero-metrics" aria-label="The TIS learning approach">
                <li><strong>Learn</strong><span>Build knowledge with curiosity</span></li>
                <li><strong>Create</strong><span>Explore ideas and possibilities</span></li>
                <li><strong>Grow</strong><span>Develop confidence and character</span></li>
              </ul>
            </div>

            <div className="hero-visual reveal" aria-label="A glimpse of student learning">
              <div className="visual-card main-card">
                <div className="mini-badge">A place to learn and grow</div>
                <div className="student-panel">
                  <div className="student-avatar" aria-hidden="true">
                    <span>T</span>
                  </div>
                  <div>
                    <p>Learning at TIS</p>
                    <strong>Explore what you can become</strong>
                  </div>
                </div>
                <div className="metrics-grid">
                  <div className="metric-box">
                    <span>In the classroom</span>
                    <strong>Discover</strong>
                  </div>
                  <div className="metric-box highlight-box">
                    <span>Beyond the classroom</span>
                    <strong>Imagine</strong>
                  </div>
                </div>
                <div className="achievement-row">
                  <div>
                    <small>Every learner</small>
                    <strong>Has room to shine</strong>
                  </div>
                  <div className="pulse-dot" aria-hidden="true" />
                </div>
              </div>
              <div className="floating-stat">
                <span>Curiosity</span>
                <strong>Starts here</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="statement section-pad reveal">
          <div className="container statement-wrap">
            <div>
              <p className="eyebrow">A community for learning</p>
              <h2>Helping every learner find their own way to shine.</h2>
            </div>
            <p>
              At TIS, learning is about more than what happens in a lesson. It is
              about asking questions, finding interests, building friendships, and
              growing into your next chapter.
            </p>
          </div>
        </section>

        <section id="programs" className="feature-section section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">The learning journey</p>
              <h2>Room to learn, explore, and grow.</h2>
            </div>
            <div className="feature-grid">
              {learningAreas.map((area) => (
                <article className="feature-card reveal" key={area.number}>
                  <div className="icon-bubble" aria-hidden="true">{area.number}</div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="highlights" className="details section-pad">
          <div className="container details-grid">
            <div className="info-panel reveal">
              <p className="eyebrow">The TIS experience</p>
              <h2>Make space for discovery.</h2>
              <p>
                The right school experience gives students the encouragement to
                take part, try something new, and learn from every step.
              </p>
              <ul className="check-list">
                {campusHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="stats-panel reveal">
              <div className="stat-box">
                <span className="stat-symbol" aria-hidden="true">✦</span>
                <strong>Curiosity</strong>
                <span>Ask questions. Find possibilities.</span>
              </div>
              <div className="stat-box">
                <span className="stat-symbol" aria-hidden="true">↗</span>
                <strong>Confidence</strong>
                <span>Take part. Keep growing.</span>
              </div>
              <div className="stat-box">
                <span className="stat-symbol" aria-hidden="true">♡</span>
                <strong>Community</strong>
                <span>Learn and grow together.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase section-pad reveal">
          <div className="container showcase-header">
            <div>
              <p className="eyebrow">Learning takes many forms</p>
              <h2>Find something that sparks your interest.</h2>
            </div>
            <a href="#admissions" className="secondary-btn">Discover TIS</a>
          </div>
          <div className="container showcase-grid">
            <article className="show-card large-card">
              <span className="tag">Explore</span>
              <h3>Ask bigger questions</h3>
              <p>Follow your curiosity and discover new ways to understand the world.</p>
            </article>
            <article className="show-card">
              <span className="tag">Create</span>
              <h3>Make ideas real</h3>
              <p>Share your point of view and bring imagination into learning.</p>
            </article>
            <article className="show-card">
              <span className="tag">Connect</span>
              <h3>Grow together</h3>
              <p>Build friendships, learn from others, and celebrate each step forward.</p>
            </article>
          </div>
        </section>

        <section id="alumni" className="alumni-section section-pad reveal">
          <div className="container alumni-card">
            <div className="alumni-mark" aria-hidden="true">TIS</div>
            <div className="alumni-copy">
              <p className="eyebrow">A community beyond campus</p>
              <h2>Alumni Network</h2>
              <p>
                TIS lists an Alumni Network on its official website. Visit the
                official alumni portal to find the network and its latest
                information.
              </p>
            </div>
            <a
              className="primary-btn"
              href="https://alumni.tis.edu.in/"
              target="_blank"
              rel="noreferrer"
            >
              Visit alumni portal <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section id="admissions" className="cta section-pad reveal">
          <div className="container cta-card">
            <div>
              <p className="eyebrow">Take the next step</p>
              <h2>Discover whether TIS is the right place for your family.</h2>
              <p>Visit the official TIS website to learn more about the school.</p>
            </div>
            <div className="cta-actions">
              <a
                className="primary-btn"
                href="https://tis.edu.in/"
                target="_blank"
                rel="noreferrer"
              >
                Visit TIS website <span aria-hidden="true">↗</span>
              </a>
              <a className="secondary-btn" href="#top">Back to top</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <Brand />
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#programs">Learning</a>
            <a href="#alumni">Alumni Network</a>
            <a href="#admissions">Discover TIS</a>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default App
