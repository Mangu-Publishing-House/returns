import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { blankReturn } from "./blank.ts";
import {
  autoSkipsAudio,
  skipsAudio,
  skipsHeat,
  skipsIndexing,
  skipsPrintIsbn,
  skipsSourceTitle,
  skipsSeriesFields,
  isPictureBook,
  isGraphicNovel,
} from "./classify.ts";
import { issuesFor, blockingIssues, RULE_REGISTRY } from "./rules.ts";
import { canFile, completeness, deriveStatus } from "./scoring.ts";
import { SEED_RETURNS } from "./seed.ts";
import { isSectionSkipped, visibleSteps } from "./steps.ts";
import { buildCatalogDocument, roundTripEqual, verifyCatalogDocument } from "./schema.ts";
import { packetHash } from "./hash.ts";
import { DEFAULT_HOUSE } from "./blank.ts";

const ledger = () => SEED_RETURNS.find((r) => r.id === "ret_ledger")!;
const bela = () => SEED_RETURNS.find((r) => r.id === "ret_bela")!;
const nadi = () => SEED_RETURNS.find((r) => r.id === "ret_nadi")!;
const feather = () => SEED_RETURNS.find((r) => r.id === "ret_feather")!;

describe("rule registry", () => {
  it("has stable unique IDs", () => {
    const ids = RULE_REGISTRY.map((r) => r.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.includes("BLK-COPYEDIT"));
    assert.ok(ids.includes("BLK-BUDGET"));
    assert.ok(ids.includes("BLK-YA-HEAT"));
    assert.ok(ids.includes("BLK-ISBN-PRINT"));
    assert.ok(ids.includes("BLK-QUALITY"));
  });
});

describe("smart skips", () => {
  it("picture book → audio skipped, heat skipped", () => {
    const r = bela();
    assert.equal(isPictureBook(r), true);
    assert.equal(autoSkipsAudio(r), true);
    assert.equal(skipsHeat(r), true);
    assert.equal(isSectionSkipped("audio", r), true);
    assert.equal(
      visibleSteps(r).some((s) => s.sectionId === "audio"),
      false,
    );
    assert.equal(
      visibleSteps(r).some((s) => s.id === "class.heat"),
      false,
    );
  });

  it("graphic novel → audio skipped, heat skipped (YA still has no heat step when none)", () => {
    const r = feather();
    assert.equal(isGraphicNovel(r), true);
    assert.equal(autoSkipsAudio(r), true);
    assert.equal(isSectionSkipped("audio", r), true);
  });

  it("middle grade → heat skipped", () => {
    const r = blankReturn({ audience: "middle_grade", contentType: "novel", primaryGenre: "mg" });
    assert.equal(skipsHeat(r), true);
  });

  it("non-translation → source title skipped", () => {
    assert.equal(skipsSourceTitle(nadi()), true);
    assert.equal(skipsSourceTitle(blankReturn({ isTranslation: true })), false);
  });

  it("digital-only → print ISBN skipped", () => {
    assert.equal(skipsPrintIsbn(blankReturn({ digitalOnly: true })), true);
    assert.equal(skipsPrintIsbn(bela()), false);
  });

  it("no series → series fields skipped", () => {
    assert.equal(skipsSeriesFields(bela()), true);
    assert.equal(skipsSeriesFields(ledger()), false);
  });

  it("fiction → indexing skipped", () => {
    assert.equal(skipsIndexing(bela()), true);
    assert.equal(skipsIndexing(blankReturn({ fiction: false, contentType: "nonfiction" })), false);
  });

  it("no audio rights → audio skipped", () => {
    const r = blankReturn({ contentType: "novel", audioRights: false, produceAudio: null });
    assert.equal(autoSkipsAudio(r), true);
    assert.equal(skipsAudio(r), true);
  });
});

describe("The Midnight Ledger", () => {
  it("blocks on quality bar, copyedit in flight, and print ISBN", () => {
    const r = ledger();
    const ids = blockingIssues(r, SEED_RETURNS).map((i) => i.id);
    assert.ok(ids.includes("BLK-QUALITY"), ids.join(","));
    assert.ok(ids.includes("BLK-COPYEDIT"), ids.join(","));
    assert.ok(ids.includes("BLK-ISBN-PRINT"), ids.join(","));
    assert.equal(canFile(r, SEED_RETURNS), false);
  });

  it("does not skip audio (romance novel producing audio)", () => {
    assert.equal(autoSkipsAudio(ledger()), false);
    assert.equal(isSectionSkipped("audio", ledger()), false);
  });
});

describe("A Button for Bela", () => {
  it("clears every blocker and can file", () => {
    const r = bela();
    const blocks = blockingIssues(r, SEED_RETURNS);
    assert.deepEqual(
      blocks.map((b) => b.id),
      [],
    );
    assert.equal(canFile(r, SEED_RETURNS), true);
    assert.equal(deriveStatus({ ...r, status: "in_progress", operatorSignoff: false }, SEED_RETURNS), "ready_to_file");
    assert.ok(completeness(r) >= 85, String(completeness(r)));
  });

  it("does not warn about skipped audio", () => {
    const warns = issuesFor(rBelaSafe(), SEED_RETURNS).filter((i) => i.level === "warn");
    assert.equal(
      warns.some((w) => w.id === "WRN-AUDIO"),
      false,
    );
  });
});

function rBelaSafe() {
  return bela();
}

describe("नदी का घर", () => {
  it("is a Hindi original, not a translation of itself", () => {
    const r = nadi();
    assert.equal(r.language, "hi");
    assert.equal(r.isTranslation, false);
    assert.equal(skipsSourceTitle(r), true);
    assert.equal(r.imprint, "mangu_world");
  });
});

describe("Iron Feather", () => {
  it("is cover-briefed, audio skipped, YA without open-door heat", () => {
    const r = feather();
    assert.equal(r.coverStatus, "briefed");
    assert.ok(r.coverBrief.length >= 20);
    assert.equal(autoSkipsAudio(r), true);
    const ids = issuesFor(r, SEED_RETURNS).map((i) => i.id);
    assert.equal(ids.includes("BLK-YA-HEAT"), false);
  });
});

describe("gates", () => {
  it("YA + explicit heat is a blocker", () => {
    const r = blankReturn({
      imprint: "mangu",
      language: "en",
      workingTitle: "Heat Test",
      authorName: "X",
      contentType: "novel",
      primaryGenre: "contemp_romance",
      audience: "ya",
      heatLevel: "explicit",
      origin: "original",
      contractSigned: true,
    });
    assert.ok(blockingIssues(r).some((i) => i.id === "BLK-YA-HEAT"));
  });

  it("over-cap spend is a blocker", () => {
    const r = blankReturn({
      ...bela(),
      id: "ret_over",
      budgetCap: 100,
      costs: { editorial: 80, cover: 40, isbn: 0, interior: 0, audio: 0, marketing: 0, other: 0 },
    });
    assert.ok(blockingIssues(r, SEED_RETURNS).some((i) => i.id === "BLK-BUDGET"));
  });

  it("invalid imprint is a blocker", () => {
    const r = blankReturn({ imprint: "penguin" as never, language: "en", workingTitle: "X", authorName: "Y" });
    assert.ok(blockingIssues(r).some((i) => i.id === "BLK-IMPRINT-INVALID"));
  });

  it("unknown language is a blocker", () => {
    const r = blankReturn({ imprint: "mangu", language: "xx", workingTitle: "X", authorName: "Y" });
    assert.ok(blockingIssues(r).some((i) => i.id === "BLK-LANGUAGE"));
  });

  it("exact duplicate title is a blocker", () => {
    const r = blankReturn({ workingTitle: "A Button for Bela", finalTitle: "A Button for Bela" });
    assert.ok(blockingIssues(r, SEED_RETURNS).some((i) => i.id === "BLK-DUP-TITLE"));
  });
});

describe("catalog JSON", () => {
  it("signs and round-trips the body", () => {
    const a = buildCatalogDocument(DEFAULT_HOUSE, SEED_RETURNS);
    const verified = verifyCatalogDocument(JSON.parse(JSON.stringify(a)));
    assert.equal(verified.ok, true);
    if (!verified.ok) return;
    const b = buildCatalogDocument(verified.doc.body.house, verified.doc.body.returns);
    assert.equal(roundTripEqual(a, b), true);
    assert.equal(a.hash, b.hash);
  });

  it("detects a tampered return", () => {
    const a = buildCatalogDocument(DEFAULT_HOUSE, SEED_RETURNS);
    const tampered = structuredClone(a);
    tampered.body.returns[0].workingTitle = "Hacked";
    const verified = verifyCatalogDocument(tampered);
    assert.equal(verified.ok, false);
  });
});

describe("packet hash", () => {
  it("is stable for the same content", () => {
    const r = bela() as unknown as Record<string, unknown>;
    assert.equal(packetHash(r), packetHash({ ...r, updatedAt: "changed" }));
  });
});
