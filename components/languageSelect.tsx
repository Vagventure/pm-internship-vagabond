"use client";

import React, { useCallback, useEffect, useState } from "react";
import { LiaLanguageSolid } from "react-icons/lia";

type Lang = { code: string; label: string };

const LANGS: Lang[] = [
  { code: "as", label: "Assamese" },
  { code: "bn", label: "Bengali" },
  { code: "en", label: "English" },
  { code: "gu", label: "Gujarati" },
  { code: "hi", label: "Hindi" },
  { code: "kn", label: "Kannada" },
  { code: "ml", label: "Malayalam" },
  { code: "mr", label: "Marathi" },
  { code: "or", label: "Oriya" },
  { code: "pa", label: "Punjabi" },
  { code: "te", label: "Telugu" },
  { code: "ta", label: "Tamil" },
];

const STORAGE_KEY = "preferredLanguage";

// Helpers
const isLocalHostOrIP = (host: string) =>
  host === "localhost" || host === "127.0.0.1" || /^\d+\.\d+\.\d+\.\d+$/.test(host);

export function LanguageSelect() {
  const [value, setValue] = useState<string>("en");

  const setTranslateCookie = useCallback((lang: string) => {
    try {
      const path = "/";
      const host = window.location.hostname;
      const val = `/en/${lang}`;

      // Cookie without domain
      document.cookie = `googtrans=${val}; path=${path}`;

      // Cookie with leading dot domain for production (covers subdomains)
      if (!isLocalHostOrIP(host) && host) {
        document.cookie = `googtrans=${val}; domain=.${host}; path=${path}`;
      }
    } catch {
      // ignore cookie errors (e.g., strict privacy modes)
    }
  }, []);

  const resetTranslateCookieToEnglish = useCallback(() => {
    try {
      const path = "/";
      const host = window.location.hostname;
      const val = `/en/en`; // explicit source=en -> target=en

      document.cookie = `googtrans=${val}; path=${path}`;
      if (!isLocalHostOrIP(host) && host) {
        document.cookie = `googtrans=${val}; domain=.${host}; path=${path}`;
      }
    } catch {
      // ignore
    }
  }, []);

  const expireTranslateCookies = useCallback(() => {
    try {
      const past = "Thu, 01 Jan 1970 00:00:00 GMT";
      const host = window.location.hostname;
      const path = "/";

      // expire without domain
      document.cookie = `googtrans=; expires=${past}; path=${path}`;

      // expire with .domain if applicable
      if (!isLocalHostOrIP(host) && host) {
        document.cookie = `googtrans=; expires=${past}; domain=.${host}; path=${path}`;
        document.cookie = `googtrans=; expires=${past}; domain=${host}; path=${path}`;
      }
    } catch {
      // ignore
    }
  }, []);

  const applyLanguage = useCallback(
    (lang: string) => {
      const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
      if (!combo) {
        // If combo not present, still set cookie for when widget initializes
        if (lang === "en") {
          resetTranslateCookieToEnglish();
        } else {
          setTranslateCookie(lang);
        }
        return;
      }

      if (lang === "en") {
        // Explicitly reset to english
        resetTranslateCookieToEnglish();
        // Some Google widgets accept 'en' more reliably than empty string
        combo.value = "en";
      } else {
        setTranslateCookie(lang);
        combo.value = lang;
      }

      // Dispatch change so Google picks it up
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    },
    [resetTranslateCookieToEnglish, setTranslateCookie]
  );

  useEffect(() => {
    // Read saved language from localStorage; default to "en"
    const saved =
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)
        ? (localStorage.getItem(STORAGE_KEY) as string)
        : "en";

    setValue(saved);

    // If the saved language is english, proactively reset cookies so Google doesn't auto-translate
    if (saved === "en") {
      // Set explicit /en/en so google won't pick another language
      resetTranslateCookieToEnglish();
    } else {
      // Ensure cookie is present if a non-en was saved before google widget loads
      setTranslateCookie(saved);
    }

    // Poll until the Google combo exists, then apply
    let interval: number | undefined;
    const tryApply = () => {
      const combo = document.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
      if (combo) {
        applyLanguage(saved);
        if (interval) window.clearInterval(interval);
      }
    };
    interval = window.setInterval(tryApply, 300);
    // Also try once after a slightly longer delay
    const timeout = window.setTimeout(tryApply, 1200);

    return () => {
      if (interval) window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [applyLanguage, resetTranslateCookieToEnglish, setTranslateCookie]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setValue(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }

    // If switching back to English, prefer an explicit reset + expire older forms
    if (lang === "en") {
      // expire older cookies (safe) then reset explicitly
      expireTranslateCookies();
      resetTranslateCookieToEnglish();
    } else {
      setTranslateCookie(lang);
    }

    applyLanguage(lang);
  };

  return (
    <label
      className="inline-flex items-center text-sm notranslate border-input rounded-md font-khand-600"
      aria-label="Select language"
      translate="no"
      lang="en"
    >
      <span className="sr-only">Select language</span>
      <LiaLanguageSolid size={24} />
      <select
        value={value}
        onChange={onChange}
        className="font-khand-400 text-white rounded-md px-1 py-2 text-md focus:outline-none focus:ring-0 bg-slate-800 notranslate"
        translate="no"
        lang="en"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} className="font-manrope text-[12px]">
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
