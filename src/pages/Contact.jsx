const contactItems = [
  {
    label: "Somalia",
    value: "+252907797122",
    href: "tel:+252907797122",
  },
  {
    label: "Ethiopia",
    value: "+251937828468",
    href: "tel:+251937828468",
  },
  {
    label: "Kenya",
    value: "+254794822588",
    href: "tel:+254794822588",
  },
  {
    label: "Email",
    value: "trizoneds@gmail.com",
    href: "mailto:trizoneds@gmail.com",
  },
]

export default function Contact() {
  return (
    <section className="contact-panel contact-panel--light">
      <div className="page-shell">
        <div className="contact-panel__inner contact-panel__inner--light">
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Start the conversation with a clickable contact point</h1>
          <p className="section-lead">
            If you need technical support, partnership discussion, or a formal company response,
            you can reach TDS directly through the channels below.
          </p>

          <div className="contact-grid contact-grid--light">
            {contactItems.map((item) => (
              <a className="contact-card-link" href={item.href} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
