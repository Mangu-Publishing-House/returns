import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatIsbn13, inspectIsbn, isHousePrefix, isValidIsbn13, isbn13Checksum, makeHouseIsbn } from "./isbn.ts";

describe("ISBN-13", () => {
  it("checksums the house block", () => {
    const isbn = makeHouseIsbn(1);
    assert.equal(isValidIsbn13(isbn), true);
    assert.equal(isHousePrefix(isbn), true);
    assert.equal(isbn13Checksum("978194820001"), "1");
    assert.equal(formatIsbn13("9781948200011"), "978-1-948200-01-1");
  });

  it("rejects the old seed check digit", () => {
    const inspect = inspectIsbn("978-1-948200-01-4", { requiredPrefix: true });
    assert.equal(inspect.ok, false);
    if (!inspect.ok) assert.equal(inspect.code, "checksum");
  });

  it("accepts Bela's print ISBN", () => {
    const inspect = inspectIsbn("978-1-948200-01-1", { requiredPrefix: true });
    assert.equal(inspect.ok, true);
  });

  it("rejects a foreign prefix when Ingram requires the house block", () => {
    const inspect = inspectIsbn("9780306406157", { requiredPrefix: true });
    assert.equal(inspect.ok, false);
    if (!inspect.ok) assert.equal(inspect.code, "prefix");
  });
});
