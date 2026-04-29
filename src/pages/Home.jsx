import { Link } from "react-router-dom"

const quickFacts = [
  ["Established", "2015"],
  ["Head Office", "Gorowe, Somalia"],
  ["Regional Presence", "Jijiga, Ethiopia and Nairobi, Kenya"],
  ["UNGM Number", "1064626"],
]

const highlights = [
  {
    icon: "01",
    title: "Engineering & Infrastructure",
    text: "Technical support for energy, construction, electrical systems, water management, and infrastructure delivery.",
    to: "/services",
  },
  {
    icon: "02",
    title: "Research & Monitoring",
    text: "Assessments, data collection, feasibility studies, monitoring and evaluation, and evidence-based reporting.",
    to: "/services",
  },
  {
    icon: "03",
    title: "Institutional Capacity Building",
    text: "Practical training, technical workshops, and long-term knowledge transfer for teams and organizations.",
    to: "/services",
  },
]

const trustPoints = [
  "Private limited company structure with established operating credentials.",
  "Professional delivery model serving UN agencies, commercial clients, and institutional partners.",
  "Integrated technical, operational, and advisory support under one company platform.",
]

const quickLinks = [
  { icon: "A", title: "About TDS", text: "Background, structure, and credentials.", to: "/about" },
  { icon: "S", title: "Our Services", text: "Explore technical and advisory capabilities.", to: "/services" },
  { icon: "P", title: "Projects", text: "Review selected project references and delivery record.", to: "/projects" },
  { icon: "C", title: "Contact", text: "Reach TDS directly by phone or email.", to: "/contact" },
]

export default function Home() {
  return (
    <div>
      <section className="hero-panel hero-panel--brand">
        <div className="page-shell hero-panel__content">
          <p className="eyebrow">Company Profile</p>
          <h1 className="hero-title hero-title--dark">Professional Development Solutions With Practical Delivery</h1>
          <p className="hero-copy hero-copy--dark">
            Trizone Development Solutions supports public, private, and development-sector
            clients with integrated engineering, research, technology, monitoring, and capacity
            building services across East Africa and beyond.
          </p>

          <div className="hero-actions">
            <Link className="cta-button" to="/services">
              Explore Services
            </Link>
            <Link className="cta-button cta-button--secondary" to="/contact">
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-shell">
          <div className="section-heading">
            <p className="eyebrow">Overview</p>
            <h2 className="section-title">A structured partner for complex assignments</h2>
            <p className="section-lead">
              TDS is a multidisciplinary consultancy providing dependable technical and advisory
              support across engineering, infrastructure, renewable energy, information systems,
              research, and institutional strengthening.
            </p>
          </div>

          <div className="home-overview-grid">
            <article className="story-card story-card--feature">
              <h3>What We Do</h3>
              <p>
                We help clients plan, implement, monitor, and improve projects through
                coordinated technical expertise, strong delivery discipline, and practical
                decision support.
              </p>
              <p>
                Our work spans engineering services, research and data solutions, systems
                development, and capacity building designed to produce measurable outcomes.
              </p>
            </article>

            <article className="story-card">
              <h3>Why Clients Work With Us</h3>
              <ul className="check-list">
                {trustPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell">
          <div className="facts-grid">
            {quickFacts.map(([label, value]) => (
              <article className="fact-card" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-shell">
          <div className="section-heading">
            <p className="eyebrow">Quick Access</p>
            <h2 className="section-title">Open the key parts of the website in one click</h2>
          </div>

          <div className="icon-grid">
            {quickLinks.map((item) => (
              <Link className="icon-card" key={item.title} to={item.to}>
                <span className="icon-card__badge">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-shell">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title">Core areas you can click through</h2>
          </div>

          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className="click-card" key={item.title}>
                <span className="click-card__index">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="inline-link" to={item.to}>
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
