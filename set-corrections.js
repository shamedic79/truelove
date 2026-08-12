// Product-level checklist corrections: these are two-packs sold/collected as one set,
// so each requires one ownership tick while retaining the item's listed point value.
[
  "100-limited-future-lover",
  "100-limited-valentine-s-day-2024",
  "100-limited-metal-brothers-2-0"
].forEach(id => {
  const item = window.TRUELOVE_ITEMS?.find(x => x.id === id);
  if (item) item.count = 1;
});
