export const candidate = {
  name: "Alex Johnson",
  first: "Alex",
  email: "alex.johnson@example.com",
  role: "Software Engineer",
  resume: "Alex_Johnson_Resume.pdf",
  skills: ["React", "JavaScript", "Node.js", "MongoDB", "REST APIs"],
};

export type Question = {
  text: string;
  short: string;
  category: "HR" | "Technical";
  base: number;
  worked: string[];
  stronger: string[];
  suggestion: string;
  sample: string;
  verdict: string;
};

export const questions: Question[] = [
  {
    text: "Tell me about yourself.",
    short: "Tell me about yourself.",
    category: "HR",
    base: 80,
    verdict: "Strong opening.",
    worked: ["You led with your current role and focus.", "You connected your experience to this position.", "Your answer had a clear beginning, middle and end."],
    stronger: ["Name one achievement with a number attached.", "Keep it under 90 seconds.", "End with why this role, specifically."],
    suggestion: "Try closing with one sentence on why this team excites you.",
    sample: "I'm a full-stack developer with two years of experience building React and Node.js applications. Most recently I led the rebuild of a student portal used by 4,000 people, which cut page load time by 40%. I enjoy turning messy requirements into clean, reliable products, and that's why this role stood out to me.",
  },
  {
    text: "Explain the difference between let, const and var.",
    short: "let, const and var.",
    category: "Technical",
    base: 86,
    verdict: "Technically accurate.",
    worked: ["You explained block vs. function scope correctly.", "You mentioned hoisting.", "You gave a practical recommendation."],
    stronger: ["Mention the temporal dead zone.", "Clarify that const prevents reassignment, not mutation.", "Show a tiny example."],
    suggestion: "Add one short code example to make the difference concrete.",
    sample: "var is function-scoped and hoisted with an undefined value. let and const are block-scoped and live in the temporal dead zone until declared. const prevents reassignment but objects can still be mutated. In practice I default to const and use let only when a value must change.",
  },
  {
    text: "How does React's virtual DOM work?",
    short: "React's virtual DOM.",
    category: "Technical",
    base: 84,
    verdict: "Clear mental model.",
    worked: ["You described the diffing process.", "You explained why direct DOM updates are expensive.", "You used simple language."],
    stronger: ["Mention reconciliation and keys.", "Explain when re-renders happen.", "Relate it to a performance issue you fixed."],
    suggestion: "Connect the concept to something you've actually built.",
    sample: "React keeps a lightweight tree of elements in memory. When state changes it renders a new tree, diffs it against the previous one through reconciliation, and applies only the minimal set of changes to the real DOM. Keys help React match list items correctly, which I learned the hard way debugging a flickering table.",
  },
  {
    text: "How would you diagnose a slow React application in production?",
    short: "Diagnose a slow React app.",
    category: "Technical",
    base: 85,
    verdict: "Good approach, needs more depth.",
    worked: ["You identified the right debugging process.", "You mentioned performance profiling.", "Your answer had a clear structure."],
    stronger: ["Mention a specific tool.", "Explain how you would isolate the bottleneck.", "Give a real example from your experience."],
    suggestion: "Try answering this again with one concrete example.",
    sample: "First I'd measure, not guess: Lighthouse and Web Vitals for the big picture, then the React Profiler to find components re-rendering too often. I'd check bundle size with a visualizer and look at network waterfalls. On my last project the profiler showed a context provider re-rendering the whole tree; splitting it and memoizing cut interaction time by 60%.",
  },
  {
    text: "Explain REST API design.",
    short: "REST API design.",
    category: "Technical",
    base: 82,
    verdict: "Solid fundamentals.",
    worked: ["You covered resources and HTTP verbs.", "You mentioned status codes.", "You talked about consistency."],
    stronger: ["Discuss versioning.", "Mention pagination and filtering.", "Talk about idempotency."],
    suggestion: "Walk through designing one real endpoint end to end.",
    sample: "REST models data as resources addressed by URLs, with HTTP verbs describing the action: GET /orders lists, POST /orders creates. Good design means consistent naming, meaningful status codes, pagination for large collections and versioning so clients don't break. I also make PUT and DELETE idempotent so retries are safe.",
  },
  {
    text: "Tell me about a difficult technical problem you solved.",
    short: "A difficult technical problem.",
    category: "HR",
    base: 79,
    verdict: "Good story, add the result.",
    worked: ["You set up the context clearly.", "You explained your reasoning.", "You owned your part of the work."],
    stronger: ["Use the STAR structure explicitly.", "Quantify the outcome.", "Mention what you'd do differently."],
    suggestion: "Finish with the measurable impact of your fix.",
    sample: "Our checkout API started timing out during a campus sale. I traced it to an unindexed MongoDB query scanning 2 million documents. I added a compound index, introduced caching for product lookups and load-tested the fix. p95 latency dropped from 4.2s to 180ms and we had zero timeouts the next sale.",
  },
  {
    text: "How would you design a scalable backend?",
    short: "Design a scalable backend.",
    category: "Technical",
    base: 78,
    verdict: "Right direction, go deeper.",
    worked: ["You started with requirements.", "You mentioned horizontal scaling.", "You considered caching."],
    stronger: ["Discuss data partitioning.", "Mention observability.", "Explain trade-offs you'd accept."],
    suggestion: "Name one trade-off and defend it.",
    sample: "I'd start with expected load and access patterns, then keep the API layer stateless behind a load balancer so it scales horizontally. Hot reads go through a cache, heavy work moves to a queue, and the database is indexed for the main queries and read replicas added as needed. I'd add metrics and tracing from day one so we scale based on evidence.",
  },
  {
    text: "Explain database indexing.",
    short: "Database indexing.",
    category: "Technical",
    base: 87,
    verdict: "Precise and practical.",
    worked: ["You explained the lookup speed-up.", "You mentioned the write cost.", "You gave an example query."],
    stronger: ["Mention compound index order.", "Explain how to verify with explain().", "Talk about over-indexing."],
    suggestion: "Show how you'd confirm an index is actually used.",
    sample: "An index is a sorted structure, usually a B-tree, that lets the database find rows without scanning the whole table. It speeds up reads but costs storage and slows writes. For compound indexes order matters. I always confirm with explain() that the query uses the index.",
  },
  {
    text: "How do you handle conflicting requirements?",
    short: "Conflicting requirements.",
    category: "HR",
    base: 81,
    verdict: "Mature and collaborative.",
    worked: ["You focused on understanding goals first.", "You involved stakeholders.", "You stayed calm and practical."],
    stronger: ["Share a real example.", "Explain how the decision was made.", "Mention how you communicated it."],
    suggestion: "Ground this in one real situation.",
    sample: "I go back to the goal behind each request. On one project, design wanted a rich animation and the PM wanted faster load times. I measured the cost, proposed a lighter version, and we agreed on it in a 15-minute call. Writing the decision down afterwards kept everyone aligned.",
  },
  {
    text: "Why should we hire you?",
    short: "Why should we hire you?",
    category: "HR",
    base: 83,
    verdict: "Confident close.",
    worked: ["You linked your skills to the role.", "You sounded confident, not arrogant.", "You kept it concise."],
    stronger: ["Reference the job description.", "Add one proof point.", "End with enthusiasm."],
    suggestion: "Tie your answer to one line from the job description.",
    sample: "You need someone who can ship reliable React and Node features quickly. That's what I've done: I've delivered three production apps, improved performance measurably each time, and I communicate clearly with designers and PMs. I'd bring that same ownership here from week one.",
  },
];

export const history = [
  { date: "Today", role: "Software Engineer", score: 86, type: "Technical" },
  { date: "Oct 04", role: "Frontend Developer", score: 81, type: "Mixed" },
  { date: "Sep 29", role: "Software Engineer", score: 76, type: "HR" },
  { date: "Sep 22", role: "Backend Developer", score: 74, type: "Technical" },
  { date: "Sep 15", role: "Software Engineer", score: 71, type: "Mixed" },
];

export const trend = [
  { d: "Sep 15", s: 71 },
  { d: "Sep 22", s: 74 },
  { d: "Sep 29", s: 76 },
  { d: "Oct 04", s: 81 },
  { d: "Today", s: 86 },
];

export const roles = ["Software Engineer", "Frontend Developer", "Backend Developer", "Data Analyst", "Product Manager", "Custom role"];

export const sampleJD = `Software Engineer — Product Team

We're looking for an engineer to build and scale customer-facing features.

You will:
• Build responsive interfaces in React and TypeScript
• Design and maintain REST APIs in Node.js
• Work with MongoDB and improve query performance
• Collaborate closely with design and product

You have:
• 1–3 years of experience shipping web applications
• Strong JavaScript fundamentals
• Clear communication and ownership`;

export const jobs = [
  { title: "Frontend Engineer", skills: ["React", "TypeScript", "JavaScript"], readiness: 84 },
  { title: "Software Engineer", skills: ["React", "Node.js", "MongoDB"], readiness: 86 },
  { title: "Backend Developer", skills: ["Node.js", "REST APIs", "SQL"], readiness: 72 },
];
