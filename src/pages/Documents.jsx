import { useEffect, useMemo, useState } from "react"

const companyFiles = [
  {
    title: "Company Profile",
    type: "PDF Document",
    src: "/documents/tds-company-profile.pdf",
    description: "Official company profile for reference, partnerships, and institutional review.",
    preview: "pdf",
  },
  {
    title: "ID Card Design",
    type: "PDF Document",
    src: "/documents/tds-id-card.pdf",
    description: "Current staff ID card layout and branding reference.",
    preview: "pdf",
  },
  {
    title: "Letterhead",
    type: "Image File",
    src: "/documents/tds-letterhead.jpg",
    description: "Official TDS letterhead artwork and brand presentation reference.",
    preview: "image",
  },
]

function getFilePreviewKind(file) {
  if (file.type.startsWith("image/")) return "image"
  if (file.type.startsWith("video/")) return "video"
  if (file.type === "application/pdf") return "pdf"
  return "file"
}

export default function Documents() {
  const [uploadedFiles, setUploadedFiles] = useState([])

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.src))
    }
  }, [uploadedFiles])

  const handleUpload = (event) => {
    const files = Array.from(event.target.files || [])

    const nextFiles = files.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      title: file.name,
      type: file.type || "File",
      description: "Uploaded in the browser for preview. This is not permanently saved to the website files.",
      src: URL.createObjectURL(file),
      preview: getFilePreviewKind(file),
      isUploaded: true,
    }))

    setUploadedFiles((current) => [...nextFiles, ...current])
    event.target.value = ""
  }

  const allFiles = useMemo(() => [...uploadedFiles, ...companyFiles], [uploadedFiles])

  return (
    <div className="section section--paper">
      <div className="page-shell">
        <section className="section-heading">
          <p className="eyebrow">Documents</p>
          <h1 className="section-title">View, download, and upload files inside the website</h1>
          <p className="section-lead">
            This page gives TDS a place to present company files online. Official documents can
            be opened directly in the browser, and new files can be uploaded temporarily for
            on-screen preview.
          </p>
        </section>

        <section className="two-column-panel">
          <article className="card">
            <h2 className="subsection-title">How This Works</h2>
            <ul className="plain-list">
              <li>Official TDS files listed below can be viewed or downloaded directly.</li>
              <li>Images, PDFs, and videos can be uploaded in the browser for preview.</li>
              <li>Browser uploads are temporary and do not permanently save to the site files.</li>
              <li>For permanent website files, place them in `public/documents` and list them here.</li>
            </ul>
          </article>

          <article className="card upload-card">
            <h2 className="subsection-title">Upload for Preview</h2>
            <p className="body-copy">
              Select PDFs, images, videos, or other files to preview them inside the website.
            </p>
            <label className="upload-dropzone">
              <span>Choose files to preview</span>
              <input multiple onChange={handleUpload} type="file" />
            </label>
          </article>
        </section>

        <section className="documents-grid">
          {allFiles.map((file) => (
            <article className="document-card" key={file.id || file.src}>
              <div className="document-card__header">
                <div>
                  <h3>{file.title}</h3>
                  <span>{file.type}</span>
                </div>
                {file.isUploaded ? <strong className="document-badge">Uploaded</strong> : null}
              </div>

              <p>{file.description}</p>

              <div className="document-preview">
                {file.preview === "image" ? (
                  <img alt={file.title} src={file.src} />
                ) : null}

                {file.preview === "pdf" ? (
                  <iframe src={file.src} title={file.title} />
                ) : null}

                {file.preview === "video" ? (
                  <video controls src={file.src} />
                ) : null}

                {file.preview === "file" ? (
                  <div className="document-preview__fallback">Preview not available for this file type.</div>
                ) : null}
              </div>

              <div className="document-actions">
                <a className="nav-button nav-button--ghost" href={file.src} rel="noreferrer" target="_blank">
                  View
                </a>
                <a className="nav-button" download href={file.src}>
                  Download
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
