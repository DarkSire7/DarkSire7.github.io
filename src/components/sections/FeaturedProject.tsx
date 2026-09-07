import { motion } from 'framer-motion';
import { memo } from 'react';
import { Lock, Activity, Boxes, GitBranch } from 'lucide-react';

const pillars = [
  {
    icon: Activity,
    title: 'The model',
    body:
      'An expected-points estimate for every player, rebuilt each gameweek from minutes reliability, EWMA form, xG/xA per-90, and a Poisson-tail estimate of defensive-contribution returns. Every rolling feature is a mean over a handful of matches, so each one is regressed toward a positional prior with its own shrinkage constant — an un-regressed feature sitting next to regressed ones dominates them at low sample regardless of its nominal weight.',
  },
  {
    icon: Boxes,
    title: 'The decision layer',
    body:
      'Predictions are only half the problem — the other half is choosing 15 players under real constraints. Squad and transfer selection is formulated as an integer linear program over a five-gameweek discounted horizon: budget, formation, a three-per-club cap, captaincy eligibility, and the −4 point cost of an extra transfer all enter as constraints and decision variables, so the solver prices a hit rather than having one filtered out afterwards.',
  },
  {
    icon: GitBranch,
    title: 'Running in production',
    body:
      'Deployed as scheduled GitHub Actions jobs rather than an always-on host — a capture runs near each deadline and records the projection before team news moves, and a weekly sync backfills what actually happened. Roughly 38 captures a season, with the durable tables versioned in git so a stateless runner can rebuild from a clean checkout.',
  },
];

const metrics = [
  { label: 'Mean absolute error', model: '1.688', baseline: '1.753', hint: 'lower is better', better: true },
  { label: 'Top-20 precision', model: '6.15', baseline: '6.75', hint: 'higher is better', better: false },
];

const FeaturedProjectComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="glass-panel overflow-hidden mb-10 sm:mb-14"
    >
      <div className="p-6 sm:p-10 lg:p-12 space-y-8 sm:space-y-10">
        {/* header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-2.5 py-1 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest rounded-md bg-electric-blue/15 border border-electric-blue/30 text-electric-blue-light">
              Featured
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-md bg-white/5 border border-white/10 text-gray-400">
              <Lock size={11} />
              Private repo
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-gray-500">Aug 2026 &mdash; present</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Glory Hunter
          </h3>

          <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-3xl">
            A decision-support system for Fantasy Premier League: it predicts what every player in the
            league will score, then solves for the best squad you can legally field. Built as a way to
            find out whether a model I trusted was actually any good &mdash; which turned out to be a
            harder question than building the model.
          </p>
        </div>

        {/* pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-electric-blue-light" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white">{title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* measurement */}
        <div className="rounded-xl bg-white/[0.02] border border-white/10 p-5 sm:p-7 space-y-5">
          <div className="space-y-2">
            <h4 className="text-sm sm:text-base font-semibold text-white">
              How I know whether it works
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
              Every projection is written to a log <em>before</em> the deadline and frozen once the
              result lands, so the number being scored is the one that was actually available at
              decision time. It is then scored against two references over identical rows: FPL&rsquo;s own
              published expected points, and a control that predicts zero for everybody &mdash; not a
              joke, since most of a 500-player pool blanks, and a constant zero posts a competitive
              error. If a model can&rsquo;t clear that by a wide margin, its error is describing the shape
              of the pool rather than any skill.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-500 font-medium">Metric</th>
                  <th className="py-2 px-4 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-500 font-medium">This model</th>
                  <th className="py-2 pl-4 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-500 font-medium">FPL baseline</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m) => (
                  <tr key={m.label} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4">
                      <span className="text-xs sm:text-sm text-gray-300">{m.label}</span>
                      <span className="block text-[10px] text-gray-600 font-mono">{m.hint}</span>
                    </td>
                    <td className={`py-3 px-4 font-mono text-sm sm:text-base font-semibold ${m.better ? 'text-electric-blue-light' : 'text-gray-300'}`}>
                      {m.model}
                    </td>
                    <td className={`py-3 pl-4 font-mono text-sm sm:text-base ${m.better ? 'text-gray-500' : 'text-electric-blue-light'}`}>
                      {m.baseline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl border-l-2 border-electric-blue/40 pl-4">
            <span className="text-gray-300 font-medium">The honest reading:</span> across 529 scored
            rows it edges the baseline on average error and <em>loses</em> at the top of the ranking,
            which is the only end that selection actually uses. That is one scored gameweek, and ten
            fixtures generate a whole gameweek of rows &mdash; players share an opponent, a referee and
            a scoreline, so the effective sample tracks gameweeks, not rows. The harness therefore
            refuses to return a verdict below five of them, however large the margin looks. Scoring
            constants stay frozen until then, because anything tuned against this sample is fitting
            noise.
          </p>
        </div>

        {/* tech */}
        <div className="pt-2">
          <p className="text-[10px] sm:text-xs text-gray-500 mb-2.5 font-medium uppercase tracking-wider font-mono">Built with</p>
          <div className="flex flex-wrap gap-2">
            {['Python', 'PuLP / CBC', 'Pandas', 'NumPy', 'Flask', 'SQLite', 'GitHub Actions', 'Groq'].map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-md bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedProject = memo(FeaturedProjectComponent);
