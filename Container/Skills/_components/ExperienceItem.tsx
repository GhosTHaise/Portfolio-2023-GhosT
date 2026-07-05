'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { urlFor } from '@/client';
import styles from './experience.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CompanyResolved = {
  _id?: string;
  name: string;
  logo?: {
    asset: {
      url: string;
    };
  };
};

export type ExperienceDoc = {
  _id: string;
  _type: 'experiences';
  jobTitle: string;
  company: CompanyResolved;
  employmentType: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  locationType: 'on_site' | 'remote' | 'hybrid';
  description: string;
  skills?: { name: string }[];
};

// A group = one company with one or more roles
export type ExperienceGroup = {
  companyKey: string;
  company: CompanyResolved;
  totalDuration: string;
  location: string;
  locationType: string;
  roles: ExperienceDoc[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMPLOYMENT_LABELS: Record<string, string> = {
  apprenticeship: 'Apprenticeship',
  full_time: 'Full-time',
  part_time: 'Part-time',
  freelance: 'Freelance',
  internship: 'Internship',
  contract: 'Contract',
};

const LOCATION_LABELS: Record<string, string> = {
  on_site: 'On-site',
  remote: 'Remote',
  hybrid: 'Hybrid',
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function durationMonths(startDate: string, endDate?: string, isCurrent?: boolean) {
  const endMs = isCurrent || !endDate ? Date.now() : new Date(endDate).getTime();
  return Math.round((endMs - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 30));
}

function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years > 0 && rem > 0)
    return `${years} yr${years > 1 ? 's' : ''} ${rem} mo`;
  if (years > 0) return `${years} yr${years > 1 ? 's' : ''}`;
  return `${months} mo`;
}

function formatRoleDateRange(exp: ExperienceDoc) {
  const start = fmtDate(exp.startDate);
  const end = exp.isCurrent ? 'present' : exp.endDate ? fmtDate(exp.endDate) : '';
  const dur = formatDuration(durationMonths(exp.startDate, exp.endDate, exp.isCurrent));
  return `${start} - ${end} · ${dur}`;
}

/**
 * Groups consecutive experiences by company name.
 * "Consecutive" = sorted by startDate desc, same company _ref or name.
 */
export function groupExperiences(experiences: ExperienceDoc[]): ExperienceGroup[] {
  // Sort newest first
  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const groups: ExperienceGroup[] = [];

  for (const exp of sorted) {
    const key = exp.company?._id ?? exp.company?.name ?? 'unknown';
    const last = groups[groups.length - 1];

    if (last && last.companyKey === key) {
      // Add role to existing group
      last.roles.push(exp);
    } else {
      // New group
      groups.push({
        companyKey: key,
        company: exp.company,
        totalDuration: '', // computed below
        location: exp.location,
        locationType: exp.locationType,
        roles: [exp],
      });
    }
  }

  // Compute total duration per group
  for (const g of groups) {
    const earliest = g.roles.reduce((min, r) =>
      new Date(r.startDate) < new Date(min.startDate) ? r : min,
    );
    const latest = g.roles.reduce((max, r) =>
      new Date(r.startDate) > new Date(max.startDate) ? r : max,
    );
    const startLabel = fmtDate(earliest.startDate);
    const endLabel = latest.isCurrent ? 'present' : latest.endDate ? fmtDate(latest.endDate) : '';

    // Total span: earliest start → latest end
    const totalMs = g.roles.reduce((sum, r) => sum + durationMonths(r.startDate, r.endDate, r.isCurrent), 0);
    g.totalDuration = `${startLabel} - ${endLabel} · ${formatDuration(totalMs)}`;
  }

  return groups;
}

// ─── SkillTag ─────────────────────────────────────────────────────────────────

function SkillTag({ name }: { name: string }) {
  return (
    <span className={styles.app__exp_skillTag}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {name}
    </span>
  );
}

// ─── RoleRow — a single position inside a grouped company ────────────────────

function RoleRow({ exp, index }: { exp: ExperienceDoc; index: number }) {
  const bullets = exp.description
    ?.split('♦')
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  const employmentLabel = EMPLOYMENT_LABELS[exp.employmentType] ?? exp.employmentType;

  return (
    <motion.div
      className={styles.app__exp_role}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Sub-dot on the inner spine */}
      <span className={styles.app__exp_subDot} />

      <div className={styles.app__exp_roleBody}>
        <h5 className={styles.app__exp_roleTitle}>{exp.jobTitle}</h5>
        <p className={styles.app__exp_roleMeta}>
          {employmentLabel} · {formatRoleDateRange(exp)}
        </p>

        {bullets.length > 0 && (
          <ul className={styles.app__exp_bullets}>
            {bullets.map((b, i) => (
              <li key={i} className={styles.app__exp_bullet}>
                <span className={styles.app__exp_bulletDot} aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {exp.skills && exp.skills.length > 0 && (
          <div className={styles.app__exp_skills}>
            {exp.skills.map((s) => (
              <SkillTag key={s.name} name={s.name} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── CompanyGroup ─────────────────────────────────────────────────────────────

function CompanyGroup({
  group,
  index,
  active,
}: {
  group: ExperienceGroup;
  index: number;
  active: boolean;
}) {
  const isSingleRole = group.roles.length === 1;
  const singleRole = group.roles[0];
  const isCurrent = group.roles.some((r) => r.isCurrent);
  const locationLabel = LOCATION_LABELS[group.locationType] ?? group.locationType;

  const logoUrl =
    group.company?.logo?.asset?.url ??
    (group.company?.logo ? urlFor(group.company.logo).width(96).height(96).url() : null);

  return (
    <motion.div
      className={styles.app__exp_group}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Outer timeline dot */}
      <span className={styles.app__exp_dot} />

      {/* Logo node */}
      <motion.div
        data-exp-logo
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: index * 0.08 }}
        className={`${styles.app__exp_node} ${active ? styles.app__exp_nodeActive : ''}`}
      >
        {/* Soft glow bloom when the travelling head touches this node */}
        <span className={styles.app__exp_nodeGlow} aria-hidden />
        <div
          className={`${styles.app__exp_logoWrap} ${!logoUrl ? styles.app__exp_logoFallback : ''} ${isCurrent ? styles.app__exp_logoCurrent : ''}`}
        >
          <div className={styles.app__exp_logoInner}>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={group.company?.name ?? 'Company'}
                width={48}
                height={48}
                className={styles.app__exp_logo}
              />
            ) : (
              <span className={styles.app__exp_logoInitials}>
                {group.company?.name ? group.company.name.slice(0, 2).toUpperCase() : '??'}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Group body */}
      <div className={styles.app__exp_groupBody}>

        {/* Company header — always shown */}
        <div className={styles.app__exp_companyHeader}>
          <h4 className={styles.app__exp_companyName}>{group.company?.name}</h4>

          {isSingleRole ? (
            // Single role: show employment type inline with company
            <p className={styles.app__exp_companyMeta}>
              {EMPLOYMENT_LABELS[singleRole.employmentType] ?? singleRole.employmentType}
            </p>
          ) : (
            // Multiple roles: show total duration
            <p className={styles.app__exp_companyMeta}>{group.totalDuration}</p>
          )}

          <p className={styles.app__exp_companyLocation}>
            {group.location} · {locationLabel}
          </p>
        </div>

        {/* Roles */}
        {isSingleRole ? (
          // Single role: render inline (no sub-spine)
          (() => {
            const exp = singleRole;
            const bullets = exp.description
              ?.split('♦')
              .map((s) => s.trim())
              .filter(Boolean) ?? [];

            return (
              <>
                <p className={styles.app__exp_singleDateRange}>
                  {formatRoleDateRange(exp)}
                </p>

                {bullets.length > 0 && (
                  <ul className={styles.app__exp_bullets}>
                    {bullets.map((b, i) => (
                      <li key={i} className={styles.app__exp_bullet}>
                        <span className={styles.app__exp_bulletDot} aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className={styles.app__exp_skills}>
                    {exp.skills.map((s) => (
                      <SkillTag key={s.name} name={s.name} />
                    ))}
                  </div>
                )}
              </>
            );
          })()
        ) : (
          // Multiple roles: sub-spine + individual role rows
          <div className={styles.app__exp_roles}>
            {group.roles.map((role, i) => (
              <RoleRow key={role._id} exp={role} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function ExperienceList({ experiences }: { experiences: ExperienceDoc[] }) {
  const groups = groupExperiences(experiences);
  const ref = useRef<HTMLDivElement>(null);
  // Same viewport anchor for start & end → progress == the fraction of the
  // timeline that has passed the "scan line". The fill, the head and every
  // node therefore share one coordinate system and stay perfectly in sync.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.6', 'end 0.6'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const headOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  // Fraction of the *top edge* of each node — a node lights up the moment the
  // travelling head reaches its card (a real "touch"), not once it's centred.
  const fractions = useRef<number[]>([]);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const measure = () => {
      const list = ref.current;
      if (!list) return;
      const h = list.clientHeight || 1;
      const nodes = Array.from(
        list.querySelectorAll<HTMLElement>('[data-exp-logo]')
      );
      // +6px so it triggers just as the dot enters the card's top edge
      fractions.current = nodes.map((n) => (n.offsetTop + 6) / h);
    };
    measure();
    const t = setTimeout(measure, 350); // after reveals/layout settle
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [experiences]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const c = fractions.current.filter((f) => p >= f).length;
    setActiveCount((prev) => (prev === c ? prev : c));
  });

  return (
    <div ref={ref} className={styles.app__exp_list}>
      {/* Animated fill that tracks scroll (behind the logo nodes) */}
      <motion.span
        aria-hidden
        className={styles.app__exp_fill}
        style={{ scaleY }}
      />
      {/* Glowing progress head — passes behind the logos */}
      <motion.span
        aria-hidden
        className={styles.app__exp_fillHead}
        style={{ top: headTop, opacity: headOpacity }}
      />
      {groups.map((group, i) => (
        <CompanyGroup
          key={group.companyKey + i}
          group={group}
          index={i}
          active={i < activeCount}
        />
      ))}
    </div>
  );
}