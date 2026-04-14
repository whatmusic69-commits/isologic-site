(function () {
  const CMS = window.CMS;

  if (!CMS) {
    console.error("Decap CMS not found");
    return;
  }

  function get(entry, path, fallback = "") {
    try {
      const value = entry.getIn(path);
      return value == null ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }

  class TranslationsPreview extends window.React.Component {
    render() {
      const entry = this.props.entry;

      const lvHome = get(entry, ["data", "lv", "nav", "home"], "Sākums");
      const lvAbout = get(entry, ["data", "lv", "nav", "about"], "Par mums");
      const lvServices = get(entry, ["data", "lv", "nav", "services"], "Pakalpojumi");
      const lvContact = get(entry, ["data", "lv", "nav", "contact"], "Kontakti");
      const lvFaq = get(entry, ["data", "lv", "nav", "faq"], "BUJ");

      const lvTagline = get(
        entry,
        ["data", "lv", "footer", "tagline"],
        "Neatkarīgs audits un atbilstības konsultācijas."
      );
      const lvQuickLinks = get(entry, ["data", "lv", "footer", "quickLinks"], "Noderīgas saites");
      const lvFooterContact = get(entry, ["data", "lv", "footer", "contact"], "Saziņa");
      const lvPrivacy = get(entry, ["data", "lv", "footer", "links", "privacy"], "Privātuma politika");
      const lvRights = get(entry, ["data", "lv", "footer", "rights"], "Visas tiesības aizsargātas.");

      return window.React.createElement(
        "div",
        { className: "iso-preview-wrap" },
        window.React.createElement(
          "div",
          { className: "iso-preview-navbar" },
          window.React.createElement("div", { className: "iso-preview-logo" }, "ISOLOGIC"),
          window.React.createElement(
            "div",
            { className: "iso-preview-nav" },
            window.React.createElement("span", null, lvHome),
            window.React.createElement("span", null, lvAbout),
            window.React.createElement("span", null, lvServices),
            window.React.createElement("span", null, lvContact),
            window.React.createElement("span", null, lvFaq)
          )
        ),

        window.React.createElement(
          "section",
          { className: "iso-preview-hero" },
          window.React.createElement("div", { className: "iso-preview-pill" }, "Live CMS Preview"),
          window.React.createElement("h1", null, "Navigācija un kājene"),
          window.React.createElement(
            "p",
            null,
            "Šeit redzi aptuvenu vizuālu priekšskatījumu tam, kā teksts izskatīsies lapā."
          )
        ),

        window.React.createElement(
          "footer",
          { className: "iso-preview-footer" },
          window.React.createElement(
            "div",
            { className: "iso-preview-col" },
            window.React.createElement("h4", null, "ISOLOGIC"),
            window.React.createElement("p", null, lvTagline)
          ),
          window.React.createElement(
            "div",
            { className: "iso-preview-col" },
            window.React.createElement("h4", null, lvQuickLinks),
            window.React.createElement("p", null, lvHome),
            window.React.createElement("p", null, lvAbout),
            window.React.createElement("p", null, lvServices),
            window.React.createElement("p", null, lvFaq)
          ),
          window.React.createElement(
            "div",
            { className: "iso-preview-col" },
            window.React.createElement("h4", null, lvFooterContact),
            window.React.createElement("p", null, lvContact),
            window.React.createElement("p", null, lvPrivacy)
          ),
          window.React.createElement(
            "div",
            { className: "iso-preview-rights" },
            lvRights
          )
        )
      );
    }
  }

  CMS.registerPreviewStyle("/admin/preview.css");
  CMS.registerPreviewTemplate("translations", TranslationsPreview);
})();