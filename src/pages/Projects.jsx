const certifications = [
  "Valid registration and licenses from the Ministry of Commerce.",
  "Taxpayer Identification Number from the Ministry of Finance - Puntland.",
  "Tender Board registration and related commercial compliance documentation.",
]

const projectActions = [
  {
    title: "Review Credentials",
    text: "Need formal company credentials or registration information for procurement review?",
    href: "mailto:trizoneds@gmail.com?subject=TDS%20Credentials%20Request",
    label: "Request Credentials",
  },
  {
    title: "Ask for References",
    text: "Need supporting reference information or a tailored capability summary?",
    href: "mailto:trizoneds@gmail.com?subject=TDS%20Reference%20Request",
    label: "Request References",
  },
]

const projects = [
  {
    no: 1,
    client: "Said Farah",
    category: "Residential",
    scope: "9.9 KW installation",
    city: "Bosaso",
    cost: "$17,000",
    started: "04/12/2024",
    ended: "08/12/2024",
    status: "Completed",
  },
  {
    no: 2,
    client: "East Africa University",
    category: "Hospital / Commercial",
    scope: "35.2 system package",
    city: "Bosaso",
    cost: "$30,000",
    started: "30/12/2024",
    ended: "04/03/2025",
    status: "Ongoing",
  },
  {
    no: 3,
    client: "Samatar Business Center",
    category: "Commercial",
    scope: "25,300 KVA support",
    city: "Bosaso",
    cost: "$25,300",
    started: "23/12/2024",
    ended: "15/02/2025",
    status: "Starting Soon",
  },
  {
    no: 4,
    client: "Apartment 110",
    category: "Residential",
    scope: "Building support package",
    city: "Garowe / Istanbul",
    cost: "$34,000",
    started: "-",
    ended: "-",
    status: "Completed",
  },
  {
    no: 5,
    client: "Construction 17*18 G+1",
    category: "Construction",
    scope: "Construction support",
    city: "Garowe",
    cost: "-",
    started: "-",
    ended: "-",
    status: "In Progress",
  },
]

export default function Projects() {
  return (
    <div className="section section--paper">
      <div className="page-shell">
        <section className="section-heading">
          <p className="eyebrow">Projects</p>
          <h1 className="section-title">Reference work, compliance, and delivery record</h1>
          <p className="section-lead">
            Our reference portfolio reflects practical implementation support across residential,
            commercial, construction, and institutional assignments.
          </p>
        </section>

        <section className="two-column-panel">
          <article className="card">
            <p className="eyebrow">Certifications & Licenses</p>
            <ul className="plain-list">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <p className="eyebrow">Reference Projects</p>
            <p className="body-copy">
              The table below presents selected project references in a format that is easy for
              prospective clients and partners to review.
            </p>
          </article>
        </section>

        <section className="card table-card">
          <div className="table-scroll">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Client Name</th>
                  <th>Category</th>
                  <th>Scope</th>
                  <th>City / Area</th>
                  <th>Project Cost</th>
                  <th>Date Started</th>
                  <th>Date Ended</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.no}>
                    <td>{project.no}</td>
                    <td>{project.client}</td>
                    <td>{project.category}</td>
                    <td>{project.scope}</td>
                    <td>{project.city}</td>
                    <td>{project.cost}</td>
                    <td>{project.started}</td>
                    <td>{project.ended}</td>
                    <td>{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="two-column-panel project-actions">
          {projectActions.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="body-copy">{item.text}</p>
              <a className="inline-link" href={item.href}>
                {item.label}
              </a>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
