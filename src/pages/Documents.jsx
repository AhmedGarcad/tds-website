import { useEffect, useMemo, useState } from "react"

import { isSupabaseConfigured, supabase } from "../lib/supabase"

const fallbackDocuments = [
  {
    id: "fallback-profile",
    title: "Company Profile",
    category: "Corporate",
    description: "Official company profile for reference, partnerships, and institutional review.",
    public_url: "/documents/tds-company-profile.pdf",
    file_type: "application/pdf",
    preview_kind: "pdf",
    isFallback: true,
  },
  {
    id: "fallback-id-card",
    title: "ID Card Design",
    category: "Branding",
    description: "Current staff ID card layout and brand reference.",
    public_url: "/documents/tds-id-card.pdf",
    file_type: "application/pdf",
    preview_kind: "pdf",
    isFallback: true,
  },
  {
    id: "fallback-letterhead",
    title: "Letterhead",
    category: "Branding",
    description: "Official TDS letterhead artwork and stationery reference.",
    public_url: "/documents/tds-letterhead.jpg",
    file_type: "image/jpeg",
    preview_kind: "image",
    isFallback: true,
  },
]

const initialUploadForm = {
  title: "",
  description: "",
  category: "General",
}

function getPreviewKind(fileType = "") {
  if (fileType.startsWith("image/")) return "image"
  if (fileType.startsWith("video/")) return "video"
  if (fileType === "application/pdf") return "pdf"
  return "file"
}

function formatBytes(bytes) {
  if (!bytes) return "Unknown size"
  const units = ["B", "KB", "MB", "GB"]
  let value = bytes
  let index = 0

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024
    index += 1
  }

  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

export default function Documents() {
  const [documents, setDocuments] = useState(fallbackDocuments)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authForm, setAuthForm] = useState({ email: "", password: "" })
  const [uploadForm, setUploadForm] = useState(initialUploadForm)
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const isAdmin = profile?.role === "admin"

  const groupedDocuments = useMemo(() => {
    const groups = new Map()

    documents.forEach((document) => {
      const key = document.category || "General"
      const items = groups.get(key) || []
      items.push(document)
      groups.set(key, items)
    })

    return Array.from(groups.entries())
  }, [documents])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return undefined
    }

    let isMounted = true

    const boot = async () => {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession()

      if (!isMounted) return

      setSession(activeSession)
      await Promise.all([loadDocuments(), loadProfile(activeSession?.user?.id)])
      if (isMounted) setLoading(false)
    }

    boot()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession)
      await loadProfile(nextSession?.user?.id)
      await loadDocuments()
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const loadDocuments = async () => {
    if (!isSupabaseConfigured) {
      setDocuments(fallbackDocuments)
      return
    }

    const { data, error: documentsError } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false })

    if (documentsError) {
      setError(documentsError.message)
      setDocuments(fallbackDocuments)
      return
    }

    setDocuments(data.length ? data : fallbackDocuments)
  }

  const loadProfile = async (userId) => {
    if (!isSupabaseConfigured || !userId) {
      setProfile(null)
      return
    }

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", userId)
      .maybeSingle()

    if (profileError) {
      setError(profileError.message)
      setProfile(null)
      return
    }

    setProfile(data)
  }

  const handleSignIn = async (event) => {
    event.preventDefault()
    setError("")
    setMessage("")

    if (!isSupabaseConfigured) {
      setError("Supabase is not configured yet. Add your project keys first.")
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword(authForm)

    if (signInError) {
      setError(signInError.message)
      return
    }

    setMessage("Signed in successfully.")
    setAuthForm({ email: "", password: "" })
  }

  const handleSignOut = async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
    setProfile(null)
    setMessage("Signed out.")
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    setError("")
    setMessage("")

    if (!isAdmin) {
      setError("Only admin users can upload documents.")
      return
    }

    if (!selectedFile) {
      setError("Choose a file before uploading.")
      return
    }

    const fileName = `${Date.now()}-${selectedFile.name.replace(/\s+/g, "-")}`
    const storagePath = `${session.user.id}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(storagePath, selectedFile, { upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      return
    }

    const { data: publicUrlData } = supabase.storage.from("documents").getPublicUrl(storagePath)

    const previewKind = getPreviewKind(selectedFile.type)

    const { error: insertError } = await supabase.from("documents").insert({
      title: uploadForm.title || selectedFile.name,
      description: uploadForm.description,
      category: uploadForm.category,
      file_name: selectedFile.name,
      file_type: selectedFile.type || "application/octet-stream",
      file_size: selectedFile.size,
      storage_path: storagePath,
      public_url: publicUrlData.publicUrl,
      preview_kind: previewKind,
      uploaded_by: session.user.id,
    })

    if (insertError) {
      setError(insertError.message)
      return
    }

    setMessage("Document uploaded successfully.")
    setSelectedFile(null)
    setUploadForm(initialUploadForm)
    await loadDocuments()
  }

  const handleDelete = async (document) => {
    if (!isAdmin || document.isFallback) return

    setError("")
    setMessage("")

    const { error: storageError } = await supabase.storage.from("documents").remove([document.storage_path])
    if (storageError) {
      setError(storageError.message)
      return
    }

    const { error: deleteError } = await supabase.from("documents").delete().eq("id", document.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Document deleted successfully.")
    await loadDocuments()
  }

  return (
    <div className="section section--paper">
      <div className="page-shell">
        <section className="section-heading">
          <p className="eyebrow">Documents</p>
          <h1 className="section-title">Admin-managed documents, downloads, and browser preview</h1>
          <p className="section-lead">
            This area is ready for real authentication, database-backed file records, storage
            uploads, and admin-only management. Public visitors can view approved files. Admins
            can sign in to upload or remove documents.
          </p>
        </section>

        {!isSupabaseConfigured ? (
          <section className="card status-card">
            <h2 className="subsection-title">Setup Required</h2>
            <p className="body-copy">
              Supabase is not connected yet. Add `VITE_SUPABASE_URL` and
              `VITE_SUPABASE_ANON_KEY` to your local environment, then run the SQL setup file in
              `supabase/schema.sql`.
            </p>
          </section>
        ) : null}

        <section className="two-column-panel">
          <article className="card">
            <h2 className="subsection-title">Public Access</h2>
            <ul className="plain-list">
              <li>Visitors can open and download approved company files.</li>
              <li>Documents are grouped by category for easier browsing.</li>
              <li>PDFs, images, and videos can be previewed directly in the website.</li>
              <li>Only admin users can upload or delete records when Supabase is active.</li>
            </ul>
          </article>

          <article className="card auth-card">
            <h2 className="subsection-title">Admin Access</h2>

            {session ? (
              <div className="auth-summary">
                <p className="body-copy">
                  Signed in as <strong>{session.user.email}</strong>
                </p>
                <p className="body-copy">
                  Role: <strong>{profile?.role || "No role assigned"}</strong>
                </p>
                <button className="nav-button nav-button--ghost" onClick={handleSignOut} type="button">
                  Sign Out
                </button>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSignIn}>
                <label>
                  <span>Email</span>
                  <input
                    onChange={(event) =>
                      setAuthForm((current) => ({ ...current, email: event.target.value }))
                    }
                    type="email"
                    value={authForm.email}
                  />
                </label>

                <label>
                  <span>Password</span>
                  <input
                    onChange={(event) =>
                      setAuthForm((current) => ({ ...current, password: event.target.value }))
                    }
                    type="password"
                    value={authForm.password}
                  />
                </label>

                <button className="nav-button" type="submit">
                  Admin Sign In
                </button>
              </form>
            )}
          </article>
        </section>

        {message ? <p className="feedback feedback--success">{message}</p> : null}
        {error ? <p className="feedback feedback--error">{error}</p> : null}

        {isAdmin ? (
          <section className="card upload-manager">
            <h2 className="subsection-title">Upload Dashboard</h2>
            <form className="upload-form" onSubmit={handleUpload}>
              <label>
                <span>Document Title</span>
                <input
                  onChange={(event) =>
                    setUploadForm((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="Document title"
                  type="text"
                  value={uploadForm.title}
                />
              </label>

              <label>
                <span>Category</span>
                <input
                  onChange={(event) =>
                    setUploadForm((current) => ({ ...current, category: event.target.value }))
                  }
                  placeholder="General"
                  type="text"
                  value={uploadForm.category}
                />
              </label>

              <label className="upload-form__wide">
                <span>Description</span>
                <textarea
                  onChange={(event) =>
                    setUploadForm((current) => ({ ...current, description: event.target.value }))
                  }
                  placeholder="What is this document for?"
                  rows="4"
                  value={uploadForm.description}
                />
              </label>

              <label className="upload-form__wide">
                <span>File</span>
                <input
                  onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                  type="file"
                />
              </label>

              <div className="upload-form__actions">
                <button className="nav-button" type="submit">
                  Upload Document
                </button>
                {selectedFile ? <span>{selectedFile.name}</span> : <span>No file selected</span>}
              </div>
            </form>
          </section>
        ) : null}

        <section className="documents-groups">
          {loading ? <p className="body-copy">Loading documents...</p> : null}

          {groupedDocuments.map(([category, items]) => (
            <section className="documents-group" key={category}>
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">{category}</p>
                <h2 className="subsection-title">{category} Documents</h2>
              </div>

              <div className="documents-grid">
                {items.map((file) => (
                  <article className="document-card" key={file.id || file.public_url}>
                    <div className="document-card__header">
                      <div>
                        <h3>{file.title}</h3>
                        <span>{file.file_type || "Document"}</span>
                      </div>
                      {file.isFallback ? <strong className="document-badge">Included</strong> : null}
                    </div>

                    <p>{file.description}</p>

                    <div className="document-meta">
                      <span>{formatBytes(file.file_size)}</span>
                    </div>

                    <div className="document-preview">
                      {file.preview_kind === "image" ? <img alt={file.title} src={file.public_url} /> : null}
                      {file.preview_kind === "pdf" ? <iframe src={file.public_url} title={file.title} /> : null}
                      {file.preview_kind === "video" ? <video controls src={file.public_url} /> : null}
                      {file.preview_kind === "file" ? (
                        <div className="document-preview__fallback">Preview not available for this file type.</div>
                      ) : null}
                    </div>

                    <div className="document-actions">
                      <a className="nav-button nav-button--ghost" href={file.public_url} rel="noreferrer" target="_blank">
                        View
                      </a>
                      <a className="nav-button" download href={file.public_url}>
                        Download
                      </a>
                      {isAdmin && !file.isFallback ? (
                        <button
                          className="nav-button nav-button--danger"
                          onClick={() => handleDelete(file)}
                          type="button"
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </section>
      </div>
    </div>
  )
}
