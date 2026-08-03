import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_HOME_EDITOR_CONFIG,
  sanitizeHomeEditorConfig,
} from "../src/admin/editor-config.ts";

test("accepts supported text and style updates", () => {
  const config = sanitizeHomeEditorConfig({
    fields: {
      heroLine1: {
        text: "성과를 만드는 파트너",
        color: "#112233",
        backgroundColor: "#fff0a8",
        fontFamily: "serif",
        fontWeight: 800,
        fontSize: 120,
        textAlign: "center",
      },
    },
    sections: {
      hero: { backgroundColor: "#101820", accentColor: "#4b7cff" },
    },
  });

  assert.equal(config.fields.heroLine1.text, "성과를 만드는 파트너");
  assert.equal(config.fields.heroLine1.fontFamily, "serif");
  assert.equal(config.fields.heroLine1.fontWeight, 800);
  assert.equal(config.sections.hero.accentColor, "#4b7cff");
});

test("drops unknown fields and clamps unsafe values to defaults", () => {
  const config = sanitizeHomeEditorConfig({
    fields: {
      unknownField: { text: "<script>alert(1)</script>" },
      heroLine1: {
        text: "x".repeat(800),
        color: "url(javascript:alert(1))",
        fontFamily: "remote-font",
        fontWeight: 999,
        fontSize: 999,
        textAlign: "justify-all",
      },
    },
    sections: {
      hero: { backgroundColor: "expression(alert(1))", accentColor: "#abc" },
      unknownSection: { backgroundColor: "#000000" },
    },
  });

  assert.equal("unknownField" in config.fields, false);
  assert.equal("unknownSection" in config.sections, false);
  assert.equal(config.fields.heroLine1.text.length, 300);
  assert.equal(config.fields.heroLine1.color, DEFAULT_HOME_EDITOR_CONFIG.fields.heroLine1.color);
  assert.equal(config.fields.heroLine1.fontFamily, "pretendard");
  assert.equal(config.fields.heroLine1.fontWeight, DEFAULT_HOME_EDITOR_CONFIG.fields.heroLine1.fontWeight);
  assert.equal(config.fields.heroLine1.fontSize, 150);
  assert.equal(config.fields.heroLine1.textAlign, "left");
  assert.equal(config.sections.hero.backgroundColor, DEFAULT_HOME_EDITOR_CONFIG.sections.hero.backgroundColor);
  assert.equal(config.sections.hero.accentColor, "#aabbcc");
});
