(function () {
  if (!window.CMS || !window.createClass || !window.h) {
    console.error("Decap preview globals are missing");
    return;
  }

  const CMS = window.CMS;
  const createClass = window.createClass;
  const h = window.h;

  function get(entry, path, fallback = "") {
    try {
      const value = entry.getIn(path);
      return value == null ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }

  const UiTranslationsPreview = createClass({
    render: function () {
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
      const lvQuickLinks = get(
        entry,
        ["data", "lv", "footer", "quickLinks"],
        "Noderīgas saites"
      );
      const lvFooterContact = get(
        entry,
        ["data", "lv", "footer", "contact"],
        "Saziņa"
      );
      const lvPrivacy = get(
        entry,
        ["data", "lv", "footer", "links", "privacy"],
        "Privātuma politika"
      );
      const lvRights = get(
        entry,
        ["data", "lv", "footer", "rights"],
        "Visas tiesības aizsargātas."
      );

      return h("div", { className: "iso-preview-wrap" }, [
        h("div", { className: "iso-preview-navbar", key: "nav" }, [
          h("div", { className: "iso-preview-logo", key: "logo" }, "ISOLOGIC"),
          h("div", { className: "iso-preview-nav", key: "links" }, [
            h("span", { key: "home" }, lvHome),
            h("span", { key: "about" }, lvAbout),
            h("span", { key: "services" }, lvServices),
            h("span", { key: "contact" }, lvContact),
            h("span", { key: "faq" }, lvFaq),
          ]),
        ]),

        h("section", { className: "iso-preview-hero", key: "hero" }, [
          h("div", { className: "iso-preview-pill", key: "pill" }, "Live CMS Preview"),
          h("h1", { key: "title" }, "Navigācija un kājene"),
          h(
            "p",
            { key: "text" },
            "Šeit redzi aptuvenu vizuālu priekšskatījumu tam, kā teksts izskatīsies lapā."
          ),
        ]),

        h("footer", { className: "iso-preview-footer", key: "footer" }, [
          h("div", { className: "iso-preview-col", key: "col1" }, [
            h("h4", { key: "h4" }, "ISOLOGIC"),
            h("p", { key: "p" }, lvTagline),
          ]),
          h("div", { className: "iso-preview-col", key: "col2" }, [
            h("h4", { key: "h4" }, lvQuickLinks),
            h("p", { key: "p1" }, lvHome),
            h("p", { key: "p2" }, lvAbout),
            h("p", { key: "p3" }, lvServices),
            h("p", { key: "p4" }, lvFaq),
          ]),
          h("div", { className: "iso-preview-col", key: "col3" }, [
            h("h4", { key: "h4" }, lvFooterContact),
            h("p", { key: "p1" }, lvContact),
            h("p", { key: "p2" }, lvPrivacy),
          ]),
          h("div", { className: "iso-preview-rights", key: "rights" }, lvRights),
        ]),
      ]);
    },
  });

  CMS.registerPreviewStyle("/admin/preview.css");
  CMS.registerPreviewTemplate("ui_translations", UiTranslationsPreview);
})();