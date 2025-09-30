"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return

    // Define the global init callback required by Google
    window.googleTranslateElementInit = () => {
      // Initialize the hidden Google Translate widget
      // pageLanguage 'en' since poem is originally in English
      // autoDisplay false prevents banner prompts
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element",
      )
    }

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      {/* Hidden mount node for Google Translate widget */}
      <div id="google_translate_element" className="hidden" />

      {/* Hide Google-provided UI so we can control via our custom select */}
      <style jsx global>{`
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0 !important;
        }
        html {
          margin-top: 0 !important;
        }
        #google_translate_element,
        .goog-te-gadget,
        .goog-logo-link {
          display: none !important;
        }

        .VIpgJd-ZVi9od-ORHb,
        .VIpgJd-ZVi9od-xl07Ob-OEVmcd,
        .VIpgJd-ZVi9od-aZ2wEe,
        .VIpgJd-ZVi9od-SmfZ,
        [class^="VIpgJd-ZVi9od-"] {
          display: none !important;
          visibility: hidden !important;
        }
      `}</style>
    </>
  )
}
