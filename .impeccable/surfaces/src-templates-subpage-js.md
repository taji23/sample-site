---
version: 1
slug: "src-templates-subpage-js"
primary_target: "src/templates/SubPage.js"
related_targets: ["src/templates/ProgramDetail.js", "src/pages/", "src/styles/pages.css", "src/styles/forms.css"]
---

# Surface: Subpages (all pages except the homepage)

Scope: every route under /about, /teams, /matches, /news, /academy, /school, /join, /community, /partners, /contact. Mode follows the page: Persuade for section landings, Read for news / FAQ / fees, Operate for the two prototype forms.
Audience/job: parents confirming details before a trial; sponsors checking credibility; existing families looking up schedules.
Constraints: same palette, type, and motion tokens as the homepage; all content fictional and labeled; forms are prototypes that never send data.

## Direction contract

THESIS: The matchday programme continues past the cover: every page opens like a programme page (navy masthead, condensed headline, gold rule) and then reads as ruled editorial rows, not rows of identical cards.

OWN-WORLD: Same as the homepage. Navy masthead with the homepage scrim over a photograph (or a portrait for record pages), white pages with mist bands, hairline rules, numerals only where order matters (steps, curriculum), gold reserved for rules and the primary CTA.

STORY: Visitor lands from a menu or a search, confirms the one fact they came for within the first screen (fact strip, table, date), and finds the trial / contact step one scroll away on every page.

FIRST VIEWPORT: Photographic or navy masthead with breadcrumbs, the English display title, the Japanese title with a gold rule, and a one-line lead; section sub-navigation directly beneath.

FORM: One template (SubPage) and one record template (ProgramDetail). Pages supply content only. Lists of repeated records (categories, classes, staff, events, matches) render from data; related facts use SpecList / RuleList / DataTable instead of card grids where the content is comparative.

SIGNATURE: Masthead entrance (headline rise, gold rule draws, photograph settles), event date blocks overlapping their photographs.

FINISH: Verified at 360 and 1440 with no horizontal overflow, one h1 per page, no console errors, no broken internal links; forms validate with an error summary and confirm on screen without sending anything.
