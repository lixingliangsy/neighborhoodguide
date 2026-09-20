/**
 * Deterministic neighborhood-copy governance rules.
 */
export const RULESET_ID = 'neighborhood-guide'
export const RULESET_VERSION = '2026-09-17'

export interface RuleResult {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  message: string
  ref?: string
}

export function runAllRules(content: string, _context?: Record<string, string>): RuleResult[] {
  const text = String(content || '')
  return [
    {
      ruleId: 'NG-01',
      name: 'No fabricated rankings',
      category: 'claims',
      severity: 'high',
      passed: !/(#1 school|safest city|crime-free|guaranteed appreciation)/i.test(text),
      message: 'Do not fabricate school rankings, crime-free claims, or price-appreciation guarantees.',
      ref: 'https://www.ftc.gov/business-guidance/advertising-marketing',
    },
    {
      ruleId: 'NG-02',
      name: 'Lifestyle framing not appraisal',
      category: 'scope',
      severity: 'medium',
      passed: !/(official appraisal|certified valuation)/i.test(text),
      message: 'NeighborhoodGuide is marketing copy, not an appraisal or crime report.',
    },
    {
      ruleId: 'NG-03',
      name: 'Buyer-matched language ok',
      category: 'quality',
      severity: 'low',
      passed: true,
      message: 'Tailor lifestyle highlights to the stated buyer profile without inventing local stats.',
    },
  ]
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}

