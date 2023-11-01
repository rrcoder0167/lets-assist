import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="brand">Let's Assist</div>
          <ul className="nav-links">
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/learnmore">Learn More</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Your homepage content goes here */}
      </main>
      {/* Add footer or other content here */}
    </div>
  )
}
