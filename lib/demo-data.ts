// Demo data consistent with DEMO_KB in fixtures.ts
// Members: Alice Chen, Bob Martinez, Carol Kim, David Okonkwo, Emma Rodriguez, Frank Zhang

export const DEMO_TEAM_MEMBERS = `member_id,name,role,time_zone,seniority
alice,Alice Chen,Senior Frontend Engineer,PST,Senior
bob,Bob Martinez,Full Stack Engineer,EST,Mid
carol,Carol Kim,Junior Developer,CST,Junior
david,David Okonkwo,Backend Engineer,GMT,Senior
emma,Emma Rodriguez,DevOps Engineer,PST,Senior
frank,Frank Zhang,QA Engineer,EST,Mid`

export const DEMO_SKILLS = `member_id,skill,level,last_used,evidence_links
alice,react,5,2024-01-15,
alice,typescript,5,2024-01-15,
alice,css,4,2024-01-10,
alice,tailwind,4,2024-01-15,
alice,nextjs,4,2024-01-12,
bob,nodejs,4,2024-01-14,
bob,postgresql,4,2024-01-14,
bob,react,3,2024-01-10,
bob,graphql,3,2024-01-08,
bob,python,3,2024-01-05,
carol,javascript,3,2024-01-15,
carol,html,4,2024-01-15,
carol,css,3,2024-01-15,
carol,react,2,2024-01-12,
david,python,5,2024-01-15,
david,django,4,2024-01-14,
david,postgresql,5,2024-01-15,
david,redis,4,2024-01-10,
david,api-design,5,2024-01-14,
emma,aws,5,2024-01-15,
emma,docker,5,2024-01-15,
emma,terraform,4,2024-01-14,
emma,kubernetes,4,2024-01-12,
emma,ci-cd,5,2024-01-15,
frank,test-automation,4,2024-01-15,
frank,selenium,4,2024-01-14,
frank,jest,3,2024-01-15,
frank,cypress,4,2024-01-12,
frank,playwright,3,2024-01-10`

export const DEMO_CAPACITY = `member_id,sprint_id,hours_available
alice,SPRINT-2024-Q1,30
bob,SPRINT-2024-Q1,20
carol,SPRINT-2024-Q1,24
david,SPRINT-2024-Q1,25
emma,SPRINT-2024-Q1,15
frank,SPRINT-2024-Q1,28`

export const DEMO_PREFERENCES = `member_id,wants_to_learn
alice,Three.js
alice,WebGL
alice,Animation
bob,GraphQL
bob,Microservices
carol,React
carol,TypeScript
carol,Testing
david,Rust
david,Kubernetes
emma,Service Mesh
emma,Observability
frank,Playwright
frank,Load Testing`

export const DEMO_HISTORY = `member_id,story_id,tags,outcome,cycle_time_days,quality_notes
alice,story-dashboard-1,frontend,dashboard,react,success,5,Clean implementation with good test coverage
alice,story-component-lib,frontend,components,success,8,Created reusable component library
alice,story-auth-ui,frontend,auth,success,3,Implemented login and signup forms
bob,story-api-gateway,backend,api,nodejs,success,10,Built scalable API gateway
bob,story-auth-system,backend,auth,postgresql,success,6,Implemented JWT authentication
bob,story-data-sync,backend,sync,partial,12,Some edge cases remain
carol,story-marketing-site,frontend,html,css,success,4,First solo project completed well
carol,story-form-validation,frontend,forms,partial,6,Needed some guidance
david,story-payments,backend,payments,python,success,15,Payment processing integration
david,story-data-pipeline,backend,data,postgresql,success,8,ETL pipeline implementation
david,story-reporting-api,backend,api,success,5,Analytics reporting endpoints
emma,story-infra-migration,devops,aws,terraform,success,20,Migrated to new infrastructure
emma,story-cicd-pipeline,devops,ci-cd,docker,success,10,Improved deployment times by 50%
emma,story-monitoring,devops,observability,success,7,Set up comprehensive monitoring
frank,story-e2e-tests,qa,testing,selenium,success,12,E2E test suite for main flows
frank,story-perf-testing,qa,performance,success,8,Load testing framework
frank,story-regression,qa,testing,partial,5,Automated regression suite`

export function getDemoDataForType(type: string): string {
  switch (type) {
    case "team_members":
      return DEMO_TEAM_MEMBERS
    case "skills":
      return DEMO_SKILLS
    case "capacity":
      return DEMO_CAPACITY
    case "preferences":
      return DEMO_PREFERENCES
    case "history":
      return DEMO_HISTORY
    default:
      return ""
  }
}
