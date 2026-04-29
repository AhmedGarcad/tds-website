import { Link } from "react-router-dom"

const serviceFamilies = [
  {
    title: "Engineering Services",
    summary: "Technical execution support for energy, infrastructure, installation, and environmental systems.",
    action: "Request engineering support",
    items: [
      "Energy audits, renewable energy systems, power installations, and energy management.",
      "Electrical system design, installation, grid connectivity, distribution, and maintenance.",
      "Construction support, civil works coordination, and infrastructure delivery.",
      "Water distribution, treatment systems, environmental solutions, and HVAC support.",
    ],
  },
  {
    title: "Research & Data Solutions",
    summary: "Evidence-based support for projects, programs, and strategic decision-making.",
    action: "Discuss research support",
    items: [
      "Monitoring and evaluation plans, impact studies, and project assessments.",
      "Feasibility studies, market research, and pilot initiative support.",
      "Advanced data collection, interpretation, and reporting for informed decisions.",
    ],
  },
  {
    title: "Information Technology & Systems Development",
    summary: "Digital systems and process tools that improve visibility, control, and service delivery.",
    action: "Discuss systems development",
    items: [
      "Software development, system integration, and technical consulting.",
      "Operational reporting tools and workflow support systems.",
      "Technology-enabled solutions for institutions, programs, and growing organizations.",
    ],
  },
  {
    title: "Capacity Building & Training",
    summary: "Practical knowledge transfer designed for stronger teams and better implementation.",
    action: "Plan training support",
    items: [
      "Corporate training, technical workshops, and targeted capacity support.",
      "Skill development programs and certification-oriented learning.",
      "Long-term institutional strengthening through applied training and coaching.",
    ],
  },
]

export default function Services() {
  return (
    <div className="section section--paper">
      <div className="page-shell">
        <section className="section-heading">
          <p className="eyebrow">Services</p>
          <h1 className="section-title">Integrated service areas built for delivery</h1>
          <p className="section-lead">
            Our services are designed to help clients move from planning to implementation with
            stronger technical systems, better coordination, and more dependable outcomes.
          </p>
        </section>

        <section className="service-grid service-grid--paper">
          {serviceFamilies.map((family) => (
            <article className="service-panel service-panel--paper" key={family.title}>
              <h2>{family.title}</h2>
              <p className="service-summary">{family.summary}</p>
              <ul>
                {family.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="inline-link" to="/contact">
                {family.action}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
