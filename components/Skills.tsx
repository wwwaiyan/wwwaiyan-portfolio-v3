import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { SkillsGraph } from './SkillsGraph';

const skillLogos: Record<string, string> = {
  'AWS Cloud': '/assets/logos/aws.svg',
  'Google Cloud': '/assets/logos/google-cloud.svg',
  Terraform: '/assets/logos/terraform.svg',
  'Terraform Cloud': '/assets/logos/terraform.svg',
  Atmos: '/assets/logos/atmos.svg',
  Docker: '/assets/logos/docker.svg',
  Kubernetes: '/assets/logos/kubernetes.svg',
  'Amazon ECS': '/assets/logos/amazon-ecs.svg',
  'Amazon EKS': '/assets/logos/amazon-eks.svg',
  'Google GKE': '/assets/logos/google-gke.svg',
  Jenkins: '/assets/logos/jenkins.svg',
  'GitHub Actions': '/assets/logos/github-actions.svg',
  'GitLab CI': '/assets/logos/gitlab.svg',
  'AWS CodePipeline': '/assets/logos/aws-codepipeline.svg',
  'Bitbucket Pipeline': '/assets/logos/bitbucket.svg',
  'Argo CD': '/assets/logos/argocd.png',
  CloudWatch: '/assets/logos/amazon-cloudwatch.svg',
  'Grafana Cloud': '/assets/logos/grafana.svg',
  Prometheus: '/assets/logos/prometheus.svg',
  Loki: '/assets/logos/loki.png',
  'ELK Stack': '/assets/logos/elastic.svg',
  SonarQube: '/assets/logos/sonarqube.svg',
  Snyk: '/assets/logos/snyk-light.svg',
  Trivy: '/assets/logos/trivy.svg',
  Checkov: '/assets/logos/checkov.png',
  Prowler: '/assets/logos/prowler.png',
  'AWS Security Hub': '/assets/logos/aws-security-hub.svg',
  AccuKnox: '/assets/logos/accuknox.png',
  Python: '/assets/logos/python.svg',
  Golang: '/assets/logos/go.svg',
  Bash: '/assets/logos/bash.svg',
  PostgreSQL: '/assets/logos/postgresql.svg',
  MySQL: '/assets/logos/mysql.svg',
  MongoDB: '/assets/logos/mongodb.svg',
  'AWS DevOps Agent': '/assets/logos/aws-devops-agent.svg',
  'Grafana Assistant': '/assets/logos/grafana-assistant.svg',
  'Claude Code': '/assets/logos/claude-code.svg',
  Codex: '/assets/logos/codex.svg',
  OpenCode: '/assets/logos/opencode.svg',
  Kiro: '/assets/logos/kiro.svg',
};

const darkSkillLogos: Partial<Record<string, string>> = {
  'AWS Cloud': '/assets/logos/aws-dark.svg',
  'GitLab CI': '/assets/logos/gitlab-dark.svg',
  SonarQube: '/assets/logos/sonarqube-dark.svg',
  Snyk: '/assets/logos/snyk.svg',
  Prowler: '/assets/logos/prowler-dark.png',
};

const wideSkillLogos = new Set(['Checkov', 'Prowler', 'AccuKnox', 'Loki']);
const wordmarkOnlyLogos = new Set(['Checkov', 'Prowler', 'AccuKnox', 'Loki']);

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const activeSkillCategory = activeCategory === null ? null : RESUME_DATA.skills[activeCategory];
  const totalTools = RESUME_DATA.skills.reduce((total, category) => total + category.items.length, 0);

  return (
    <section className="relative overflow-hidden border-t border-zinc-200/80 bg-zinc-50 py-24 transition-colors duration-300 dark:border-zinc-900 dark:bg-[#090a0b] md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 grid gap-6 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-400">
              <span className="h-px w-8 bg-zinc-400 dark:bg-zinc-600" />
              Capability map
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white md:text-5xl">
              Technical Toolkit
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:col-span-5 md:justify-self-end">
            Tools grouped by how I use them.
          </p>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:col-span-8">
            {RESUME_DATA.skills.map((category, index) => {
              const isActive = activeCategory === index;

              return (
                <motion.article
                  key={category.category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.42, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setActiveCategory(index)}
                  onMouseLeave={() => setActiveCategory((current) => current === index ? null : current)}
                  className={`ui-card h-full min-h-[10rem] rounded-lg border p-5 backdrop-blur-sm md:p-5 ${
                    isActive
                      ? 'border-cyan-500/50 bg-white shadow-[0_18px_45px_-34px_rgba(8,145,178,0.8)] dark:border-cyan-400/40 dark:bg-zinc-900/90'
                      : 'border-zinc-200/80 bg-white/75 shadow-[0_12px_32px_-30px_rgba(24,24,27,0.65)] dark:border-zinc-800/80 dark:bg-[#0d0e10]/80 dark:shadow-none'
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <h3 className="min-w-0 font-mono text-sm font-bold uppercase text-cyan-700 dark:text-cyan-400 md:text-base">
                      {category.category}
                    </h3>
                    <span className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300'
                        : 'bg-zinc-100/80 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400'
                    }`}>
                      {String(category.items.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => {
                      const logo = skillLogos[skill];
                      const darkLogo = darkSkillLogos[skill];
                      const isWideLogo = wideSkillLogos.has(skill);
                      const isWordmarkOnly = wordmarkOnlyLogos.has(skill);

                      return (
                        <span
                          key={skill}
                          className="ui-chip inline-flex min-h-8 cursor-default items-center gap-2 rounded-md border border-zinc-200/80 bg-zinc-50/90 px-2.5 py-1.5 text-sm text-zinc-700 shadow-[0_1px_2px_rgba(24,24,27,0.03)] dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-300 dark:shadow-none"
                        >
                          {logo && (
                            <span className={`flex h-5 shrink-0 items-center justify-center ${isWideLogo ? 'w-16' : 'w-5'}`}>
                              <img
                                src={logo}
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                                width={isWideLogo ? 64 : 18}
                                height={18}
                                className={`h-[18px] object-contain ${isWideLogo ? 'w-16' : 'w-[18px]'} ${darkLogo ? 'dark:hidden' : ''}`}
                              />
                              {darkLogo && (
                                <img
                                  src={darkLogo}
                                  alt=""
                                  aria-hidden="true"
                                  loading="lazy"
                                  width={isWideLogo ? 64 : 18}
                                  height={18}
                                  className={`hidden h-[18px] object-contain dark:block ${isWideLogo ? 'w-16' : 'w-[18px]'}`}
                                />
                              )}
                            </span>
                          )}
                          {isWordmarkOnly ? <span className="sr-only">{skill}</span> : skill}
                        </span>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:sticky lg:top-28 lg:col-span-4"
          >
            <div className="rounded-lg border border-zinc-200/80 bg-white/65 p-4 shadow-[0_16px_38px_-34px_rgba(24,24,27,0.65)] backdrop-blur-sm dark:border-zinc-800/80 dark:bg-[#0d0e10]/75 dark:shadow-none md:p-5">
              <SkillsGraph activeIndex={activeCategory} onActiveChange={setActiveCategory} />
            </div>
            <p className="mt-4 text-center font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400">
              Toolkit distribution
            </p>
            <div className="mt-4 rounded-lg border border-zinc-200/80 bg-white/70 p-5 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-[#0d0e10]/75">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="font-mono text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
                  {activeSkillCategory ? activeSkillCategory.category : 'Toolkit overview'}
                </p>
                <span className="rounded bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {activeSkillCategory ? `${activeSkillCategory.items.length} tools` : `${totalTools} tools`}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {activeSkillCategory
                  ? activeSkillCategory.evidence
                  : 'Hover a category to see how each group supports infrastructure, delivery, security, observability, and AI-assisted operations.'}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
