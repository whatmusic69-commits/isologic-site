const h = window.React.createElement;

function safeGet(entry, path, fallback = "") {
  const value = entry.getIn(path);
  return value == null ? fallback : value;
}

function UiTranslationsPreview({ entry }) {
  const lvNavHome = safeGet(entry, ["data", "lv", "nav", "home"]);
  const lvNavAbout = safeGet(entry, ["data", "lv", "nav", "about"]);
  const lvNavServices = safeGet(entry, ["data", "lv", "nav", "services"]);
  const lvNavContact = safeGet(entry, ["data", "lv", "nav", "contact"]);
  const lvNavFaq = safeGet(entry, ["data", "lv", "nav", "faq"]);

  const lvTagline = safeGet(entry, ["data", "lv", "footer", "tagline"]);
  const lvQuickLinks = safeGet(entry, ["data", "lv", "footer", "quickLinks"]);
  const lvFooterContact = safeGet(entry, ["data", "lv", "footer", "contact"]);
  const lvPrivacy = safeGet(entry, ["data", "lv", "footer", "links", "privacy"]);
  const lvRights = safeGet(entry, ["data", "lv", "footer", "rights"]);

  return h(
    "div",
    { className: "iso-preview" },
    h(
      "div",
      { className: "iso-navbar" },
      h("div", { className: "iso-brand" }, "ISOLOGIC"),
      h(
        "div",
        { className: "iso-nav-links" },
        h("span", null, lvNavHome),
        h("span", null, lvNavAbout),
        h("span", null, lvNavServices),
        h("span", null, lvNavContact),
        h("span", null, lvNavFaq)
      )
    ),
    h(
      "div",
      { className: "iso-hero" },
      h("h1", null, "Preview"),
      h("p", null, "Šis ir piemēra priekšskatījums Decap administrācijas labajā pusē.")
    ),
    h(
      "div",
      { className: "iso-footer" },
      h(
        "div",
        { className: "iso-footer-col" },
        h("h4", null, "ISOLOGIC"),
        h("p", null, lvTagline)
      ),
      h(
        "div",
        { className: "iso-footer-col" },
        h("h4", null, lvQuickLinks),
        h("p", null, lvNavHome),
        h("p", null, lvNavAbout),
        h("p", null, lvNavServices),
        h("p", null, lvNavFaq)
      ),
      h(
        "div",
        { className: "iso-footer-col" },
        h("h4", null, lvFooterContact),
        h("p", null, lvNavContact),
        h("p", null, lvPrivacy)
      ),
      h("div", { className: "iso-rights" }, lvRights)
    )
  );
}

window.CMS.registerPreviewStyle("/admin/preview.css");
window.CMS.registerPreviewTemplate("translations", UiTranslationsPreview);