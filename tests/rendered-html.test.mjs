import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Panda Kashmir experience and guest gallery", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Panda Tours/);
  assert.match(html, /Kashmir,.*beautifully yours\./s);
  assert.match(html, /id="gallery"/);
  assert.match(html, /Real guests · Real welcomes/);
  assert.match(html, /guest-arrival-01\.webp/);
  assert.match(html, /guest-arrival-09\.webp/);
  assert.match(html, /Plan my welcome/);
  assert.match(html, /class="site-loader is-active"/);
  assert.match(html, /brand\/panda-tours-logo\.jpeg/);
});

test("ships an optimized, animated and accessible nine-photo gallery", async () => {
  const galleryRoot = new URL("../public/gallery/", import.meta.url);
  const [component, css, files] = await Promise.all([
    readFile(new URL("../app/PremiumHome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(galleryRoot),
  ]);

  const expectedFiles = Array.from(
    { length: 9 },
    (_, index) => `guest-arrival-${String(index + 1).padStart(2, "0")}.webp`,
  );
  assert.deepEqual(files.sort(), expectedFiles);

  const imageStats = await Promise.all(expectedFiles.map((file) => stat(new URL(file, galleryRoot))));
  assert.ok(imageStats.every((image) => image.size > 40_000 && image.size < 600_000));

  const logo = await stat(new URL("../public/brand/panda-tours-logo.jpeg", import.meta.url));
  assert.ok(logo.size > 20_000);

  assert.match(component, /role="dialog"/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /event\.key === "Escape"/);
  assert.match(component, /event\.key === "ArrowLeft"/);
  assert.match(component, /event\.key === "ArrowRight"/);
  assert.match(css, /@keyframes gallery-marquee/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.gallery-card:hover img/);
  assert.match(component, /Preparing your Kashmir journey/);
  assert.match(css, /@keyframes loader-progress/);
  assert.match(css, /@keyframes loader-logo-in/);
});
