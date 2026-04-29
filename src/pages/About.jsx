import { Link } from "react-router-dom"

const generalInformation = [
  ["Company Name", "Trizone Development Solutions - TDS"],
  ["Headquarter Office", "Gorowe, Somalia"],
  ["Regional Offices", "Jijiga, Ethiopia and Nairobi, Kenya"],
  ["Founder", "Isahak Solad Dahir"],
  ["Primary Contact", "trizoneds@gmail.com"],
  ["UNGM Number", "1064626"],
  ["Company Structure", "Private Limited"],
  ["Principal Line of Business", "Development solutions"],
  ["Markets Served", "UN agencies, institutional partners, and commercial clients"],
  ["Year of Establishment", "2015"],
  ["Registration Number", "C - 975 - 79112"],
  ["TIN Number", "907202410851400"],
]

const coreValues = [
  "Professionalism and respect in every client and partner relationship.",
  "Innovation supported by discipline, evidence, and practical implementation.",
  "Integrity, accountability, sustainability, and ethical conduct across all operations.",
]

const goals = [
  "Expand high-impact regional delivery capacity.",
  "Strengthen engineering innovation and technical quality.",
  "Build trusted long-term client relationships.",
  "Improve research, reporting, and data-driven advisory services.",
  "Advance environmental and social responsibility in project delivery.",
  "Support operational excellence through structured systems and governance.",
]

const structureColumns = [
  {
    heading: "Administration & Support",
    items: ["Human resources", "Finance", "Marketing & communications", "Legal and compliance"],
  },
  {
    heading: "Engineering",
    items: [
      "Energy and power",
      "Electrical design and installation",
      "Water management and environmental solutions",
      "Construction and infrastructure",
      "HVAC",
    ],
  },
  {
    heading: "Support & Advisory",
    items: [
      "Research and development",
      "Monitoring and evaluation",
      "IT and systems development",
      "Capacity building and training",
    ],
  },
]

const teamMembers = [
  {
    name: "Isahak Solad Dahir",
    role: "Founder",
    detail: "Provides strategic direction and represents the company in client and partner engagements.",
    link: "mailto:trizoneds@gmail.com",
    action: "Contact Founder",
  },
  {
    name: "Executive Management Team",
    role: "Operations Leadership",
    detail: "Coordinates planning, project supervision, client communication, and cross-department delivery.",
    link: "/contact",
    action: "Request Meeting",
  },
  {
    name: "Technical Delivery Team",
    role: "Engineering, Research, and Systems Support",
    detail: "Supports field implementation, analysis, reporting, and technical service delivery.",
    link: "/services",
    action: "View Services",
  },
]

export default function About() {
  return (
    <div className="section section--paper">
      <div className="page-shell">
        <section className="section-heading">
          <p className="eyebrow">About TDS</p>
          <h1 className="section-title">Company information, background, and operating structure</h1>
          <p className="section-lead">
            TDS was established to provide credible, structured, and multi-sector development
            support to clients that need reliable execution, technical depth, and accountable
            delivery systems.
          </p>
        </section>

        <section className="info-layout">
          <div className="info-table card">
            <h2 className="subsection-title">General Information</h2>
            <div className="info-table__rows">
              {generalInformation.map(([label, value]) => (
                <div className="info-table__row" key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card prose-card">
            <h2 className="subsection-title">Background</h2>
            <p className="body-copy">
              TDS provides comprehensive development solutions across engineering, construction,
              electrical systems, water resource management, research, monitoring and evaluation,
              information technology systems development, and organizational capacity building.
            </p>
            <p className="body-copy">
              We work to help clients solve technical and operational challenges through a
              practical model that combines field experience, structured coordination, and
              outcome-focused advisory support.
            </p>
            <p className="body-copy">
              Our long-term approach emphasizes quality, compliance, sustainability, and
              solutions that remain useful beyond the immediate assignment.
            </p>
          </div>
        </section>

        <section className="vision-mission-grid">
          <article className="statement-card">
            <p className="eyebrow">Vision</p>
            <p className="body-copy">
              To be a trusted regional leader in innovative, sustainable, and comprehensive
              development solutions that strengthen institutions, industries, and communities.
            </p>
          </article>

          <article className="statement-card statement-card--dark">
            <p className="eyebrow eyebrow--light">Mission</p>
            <p className="body-copy body-copy--light">
              To deliver high-quality integrated services that improve performance, enable better
              decisions, and support sustainable development outcomes for clients and partners.
            </p>
          </article>
        </section>

        <section className="two-column-panel">
          <article className="card">
            <h2 className="subsection-title">Core Values</h2>
            <ol className="number-list">
              {coreValues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>

          <article className="card">
            <h2 className="subsection-title">Strategic Goals</h2>
            <ol className="number-list">
              {goals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
        </section>

        <section className="card">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Organizational Structure</p>
            <h2 className="subsection-title">Governance, management, and departmental capabilities</h2>
          </div>

          <div className="org-topline">
            <span>Board of Directors</span>
            <span>Executive Management Team</span>
          </div>

          <div className="org-grid">
            {structureColumns.map((column) => (
              <article className="org-column" key={column.heading}>
                <h3>{column.heading}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="card team-section">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Team</p>
            <h2 className="subsection-title">People and functions behind delivery</h2>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article className="team-card" key={member.name}>
                <h3>{member.name}</h3>
                <span>{member.role}</span>
                <p>{member.detail}</p>
                {member.link.startsWith("mailto:") ? (
                  <a className="inline-link" href={member.link}>
                    {member.action}
                  </a>
                ) : (
                  <Link className="inline-link" to={member.link}>
                    {member.action}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
