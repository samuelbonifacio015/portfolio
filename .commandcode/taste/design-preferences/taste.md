# Design preferences
- Prefers a minimalist "academic light" aesthetic: light background, generous whitespace over visual density, simple components, no heavy shadows, gradients, or decorative glass/nested cards. Confidence: 0.9
- Prefers gray and neutral/minimalist color tokens as the primary palette over bright accents (explicitly preferred the previous gray as primary after trying orange tokens). Confidence: 0.9
- Tends to adopt reference designs' tokens/colors but keeps local typography, radii, and spacing. Confidence: 0.7
- Technology icons should be representative SVGs extracted from the internet; can keep them monochrome/black rather than colored, and the mark must be the canonical/recognizable brand icon (e.g., the Java coffee cup, not the OpenJDK logo). Confidence: 0.9
- Favors shadcn-style copy-paste component registries (e.g. Pixel-Perfect, Magic UI, Origin UI) as the source for new UI pieces like cards, rather than installing component packages — often pastes the registry's demo code directly and asks to adapt it. Confidence: 0.85
- Values site-wide consistency of components: when a component's style is updated in one place (e.g., tech badges with `showIcon`), the same current style should be applied everywhere that component appears (project modal, grid cards), not just the main section. Confidence: 0.7
