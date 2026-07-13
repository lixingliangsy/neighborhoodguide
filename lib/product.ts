export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "NeighborhoodGuide",
  slug: "neighborhoodguide",
  tagline: "Neighborhood blurbs that make the location the hero.",
  description: "Given a neighborhood and who's moving there, get a lifestyle-focused description for listings, relocation packets, or your site.",
  toolTitle: "Write a neighborhood blurb",
  resultLabel: "Your neighborhood blurb",
  ctaLabel: "Write blurb",
  features: [
  "Lifestyle framing",
  "Buyer-matched",
  "Nearby highlights",
  "Relocation-ready"
],
  inputs: [
  {
    "key": "neighborhood",
    "label": "Neighborhood",
    "type": "input",
    "placeholder": "e.g. Riverside"
  },
  {
    "key": "city",
    "label": "City",
    "type": "input",
    "placeholder": "e.g. Portland, OR"
  },
  {
    "key": "buyer",
    "label": "Who's moving there",
    "type": "select",
    "options": [
      "Families",
      "Young professionals",
      "Retirees",
      "Investors"
    ]
  },
  {
    "key": "highlights",
    "label": "Highlights (optional)",
    "type": "textarea",
    "placeholder": "e.g. river trail, farmers market, top-rated elementary"
  }
] as InputField[],
  systemPrompt: "You are a relocation copywriter. Given a neighborhood, city, a buyer type, and optional highlights, write a lifestyle-focused neighborhood blurb: a one-line feel, 3-4 buyer-matched highlights (schools, walkability, dining, transit as relevant), and a relocation-ready closing. Match the buyer's priorities. In demo mode, return a realistic sample following this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "4 blurbs/mo"
  },
  {
    "tier": "Pro",
    "price": "$15/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const nb = (inputs['neighborhood'] || 'your neighborhood').trim()
  const ct = (inputs['city'] || 'your city').trim()
  const by = inputs['buyer'] || 'Families'
  const h = (inputs['highlights'] || '').trim()
  let out = 'NEIGHBORHOOD BLURB - ' + nb + ', ' + ct + ' (for: ' + by + ')\n\n'
  out += 'THE FEEL\n' + nb + ' is the kind of ' + ct + ' spot where ' + (by === 'Families' ? 'kids ride bikes and neighbors know each other' : by === 'Young professionals' ? 'coffee, coworking, and nightlife are all a short walk' : by === 'Retirees' ? 'pace slows and everything you need is close' : 'rents hold and demand stays steady') + '.\n\n'
  out += 'WHY IT FITS ' + by.toUpperCase() + '\n'
  out += '- Walkable streets and a real sense of community\n'
  if (h) out += '- Highlights: ' + h + '\n'
  out += '\nRELOCATION\nNew to ' + ct + '? ' + nb + ' is an easy place to land and love.\n\n'
  out += '\n--- (Mock demo. Add the neighborhood + buyer for a tailored blurb.)'
  return out
}
}
