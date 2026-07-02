// FAQ question ids, in display order: process → timeline → price → after
// mirrors how a client thinks about hiring. The copy lives under faq.items.*
// in public/locales/*/common.json. Shared by the visible FAQ section
// (components/Sections/Faq) and the FAQPage JSON-LD graph
// (components/Misc/StructuredData) — Google only honors FAQ rich results when
// the schema matches on-page content, so both must render the same keys.
export const FAQ_KEYS = ['process', 'timeline', 'price', 'after'] as const
