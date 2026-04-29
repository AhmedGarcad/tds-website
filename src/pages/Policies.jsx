const policies = [
  {
    number: "01",
    title: "Safety Policy",
    purpose:
      "To protect the health, safety, and well-being of employees, contractors, partners, and affected communities across all activities.",
    actions: [
      "Maintain safety protocols and emergency response planning across assignments.",
      "Conduct regular audits, inspections, and risk reviews.",
      "Provide appropriate protective equipment and promote safe work practices.",
      "Build a culture of awareness through continuous training and communication.",
    ],
  },
  {
    number: "02",
    title: "Environmental Policy",
    purpose:
      "To promote sustainability and reduce environmental impact in operational and project activities.",
    actions: [
      "Use environmental impact assessments where relevant.",
      "Promote energy-efficient and renewable approaches in project design.",
      "Support responsible waste management, recycling, and resource use.",
      "Work with stakeholders to strengthen environmental stewardship.",
    ],
  },
  {
    number: "03",
    title: "Gender Policy",
    purpose:
      "To promote inclusion, equal opportunity, and a fair working environment free from discrimination.",
    actions: [
      "Encourage balanced representation in teams and decision-making spaces.",
      "Apply clear internal standards addressing discrimination and harassment.",
      "Support awareness and training on equality and inclusion.",
      "Encourage gender-responsive planning and resource allocation where appropriate.",
    ],
  },
]

const implementationSteps = [
  "Awareness programs and internal communication for stronger policy understanding.",
  "Monitoring and evaluation systems that track compliance, progress, and outcomes.",
  "Clear accountability structures with defined oversight responsibility.",
  "Stakeholder engagement that supports transparency, feedback, and practical adoption.",
]

const policyLinks = [
  {
    title: "Safety Questions",
    href: "mailto:trizoneds@gmail.com?subject=Safety%20Policy%20Inquiry",
    label: "Ask about safety policy",
  },
  {
    title: "Environmental Questions",
    href: "mailto:trizoneds@gmail.com?subject=Environmental%20Policy%20Inquiry",
    label: "Ask about environmental policy",
  },
  {
    title: "Inclusion Questions",
    href: "mailto:trizoneds@gmail.com?subject=Gender%20Policy%20Inquiry",
    label: "Ask about inclusion policy",
  },
]

export default function Policies() {
  return (
    <div className="section section--paper">
      <div className="page-shell">
        <section className="section-heading">
          <p className="eyebrow">Policies</p>
          <h1 className="section-title">Professional standards that support responsible delivery</h1>
          <p className="section-lead">
            Our policy framework supports safer operations, stronger governance, environmental
            responsibility, and more inclusive project implementation.
          </p>
        </section>

        <section className="policy-grid">
          {policies.map((policy) => (
            <article className="policy-card" key={policy.number}>
              <div className="policy-card__header">
                <span>{policy.number}</span>
                <h2>{policy.title}</h2>
              </div>
              <p className="body-copy">
                <strong>Purpose:</strong> {policy.purpose}
              </p>
              <div className="policy-actions">
                <h3>Key Actions</h3>
                <ol className="number-list">
                  {policy.actions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </section>

        <section className="card implementation-card">
          <p className="eyebrow">Implementation & Monitoring</p>
          <h2 className="subsection-title">Policies only matter when they are actively applied</h2>
          <div className="implementation-grid">
            {implementationSteps.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="icon-grid policy-links">
          {policyLinks.map((item, index) => (
            <a className="icon-card" href={item.href} key={item.title}>
              <span className="icon-card__badge">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>Open a direct email request for more information about this policy area.</p>
              <span className="inline-link">{item.label}</span>
            </a>
          ))}
        </section>
      </div>
    </div>
  )
}
