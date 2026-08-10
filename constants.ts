
import { ResumeData } from './types';

export const AVAILABLE_ROLES = [
  'DevOps Engineer',
  'Cloud Engineer',
  'Platform Engineer',
  'Site Reliability Engineer',
] as const;

export const RESUME_DATA: ResumeData = {
  name: "Wai Yan Soe",
  title: "DevOps Engineer",
  summary: "DevOps and platform engineer focused on scalable cloud infrastructure, delivery automation, and reliable operations. Exploring agentic operations to improve engineering workflows with clear human oversight.",
  contact: {
    email: "hello.waiyansoe@gmail.com"
  },
  links: [
    { platform: "Portfolio", url: "https://waiyansoe.vercel.app", icon: "Globe" },
    { platform: "GitHub", url: "https://github.com/wwwaiyan", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/waiyansoe", icon: "Linkedin" },
    { platform: "Medium", url: "https://medium.com/@wwwaiyan", icon: "BookOpen" },
    { platform: "Credly", url: "https://credly.com/users/waiyansoe", icon: "Award" },
  ],
  experience: [
    {
      company: "Yoma Fleet Co.,Ltd",
      role: "DevOps Engineer",
      period: "Sep 2024 – Present",
      highlightIndexes: [1, 3, 6],
      description: [
        "Maintained and optimized microservices architecture to enhance scalability, system integration, and deployment flexibility for internal and external cloud-native applications.",
        "Provisioned secure, scalable infrastructure using Terraform and Terraform Cloud, leveraging private custom modules for AWS infrastructure and observability tools such as Grafana Cloud.",
        "Built and managed containerized workloads on Amazon ECS, integrated with API Gateway and event-driven logic using AWS Lambda.",
        "Automated CI/CD pipelines using AWS CodePipeline and GitHub Actions, with integrated unit testing, security scanning, and automated deployments via AWS CodeDeploy.",
        "Implemented DevSecOps practices using tools like SonarQube, Snyk, Trivy, Checkov, and AWS security services (GuardDuty, Security Hub, AWS Config) to ensure application and infrastructure security and compliance.",
        "Deployed and maintained monitoring solutions including Grafana Cloud, AWS CloudWatch, and Sentry for real-time observability, alerting, and performance tracking.",
        "Used AI-assisted AWS DevOps agents to support root cause analysis (RCA), incident response, and operational follow-up for production issues.",
        "Worked collaboratively with developers, product managers, Scrum Masters, and system/network teams to troubleshoot issues and improve delivery pipelines.",
        "Created detailed documentation and onboarding materials to support internal DevOps adoption, operational consistency, and process transparency."
      ]
    },
    {
      company: "HQS Co.,Ltd | QSlogic",
      role: "DevOps Engineer",
      period: "Nov 2022 – Aug 2024",
      highlightIndexes: [1, 3, 4],
      description: [
        "Collaborated closely with software development teams to streamline CI/CD pipelines and align with DevOps best practices.",
        "Containerized applications using Docker and Docker Compose, including Node.js (React), Java (Spring Boot), and Python (Django), and deployed them on AWS EC2 and on-premise virtual machines.",
        "Managed traffic routing for multiple services using Nginx reverse proxy to containerized applications.",
        "Implemented CI/CD pipelines using Jenkins and Bitbucket Pipelines for automated build, test, and deployment.",
        "Administered PostgreSQL and MongoDB databases; configured PostgreSQL High Availability with Patroni, etcd, and HAProxy.",
        "Automated backup tasks with Bash scripts and scheduled cron jobs for file and database backups.",
        "Deployed monitoring, logging, and alerting using the Elastic Stack (ELK) to observe system and application health.",
        "Designed system architecture and infrastructure diagrams to support deployment and documentation processes."
      ]
    },
    {
      company: "ATG Systems Co., Ltd",
      role: "Infrastructure Support Engineer",
      period: "Apr 2021 – Oct 2022",
      highlightIndexes: [0, 1, 2],
      description: [
        "Provided on-site customer support to ensure smooth operation and optimal performance of infrastructure network and system components.",
        "Monitored and maintained on-premise infrastructure (Routers and Switches, Servers, Storage and Backup systems, Virtualization, and more).",
        "Collaborated with engineers and technical teams to promptly identify and report issues for timely resolution."
      ]
    },
    {
      company: "Myanmar Intel Essen Logistics Co.,Ltd.",
      role: "Senior Operations Executive",
      period: "May 2016 – Feb 2021",
      highlightIndexes: [0],
      description: [
        "Analysed logistics operations to identify inefficiencies, optimized transportation and warehouse processes for cost savings, and managed scheduling with strategic cost monitoring."
      ]
    }
  ],
  skills: [
    {
      category: "Cloud Infrastructure",
      items: ["AWS Cloud", "Google Cloud", "Terraform", "Terraform Cloud", "Atmos"],
      evidence: "Provisioned AWS infrastructure with Terraform and coordinated reusable stacks with Terraform Cloud and Atmos."
    },
    {
      category: "Containerization",
      items: ["Docker", "Kubernetes", "Amazon ECS", "Amazon EKS", "Google GKE"],
      evidence: "Operated Docker and Amazon ECS workloads; built public Kubernetes and EKS lab projects."
    },
    {
      category: "CI/CD & DevOps",
      items: ["Jenkins", "GitHub Actions", "GitLab CI", "AWS CodePipeline", "Bitbucket Pipeline", "Argo CD"],
      evidence: "Built automated delivery workflows across Argo CD, GitHub Actions, AWS CodePipeline, Jenkins, and Bitbucket."
    },
    {
      category: "Observability",
      items: ["CloudWatch", "Grafana Cloud", "Prometheus", "Loki", "ELK Stack"],
      evidence: "Implemented monitoring, alerting, metrics, and log analysis with CloudWatch, Grafana Cloud, Prometheus, Loki, and ELK."
    },
    {
      category: "AI-Assisted Operations",
      items: ["AWS DevOps Agent", "Grafana Assistant", "Claude Code", "Codex", "OpenCode", "Kiro"],
      evidence: "Applied AI-assisted DevOps and observability workflows to support RCA, incident response, automation, and production operations."
    },
    {
      category: "DevSecOps",
      items: ["SonarQube", "Snyk", "Trivy", "Checkov", "Prowler", "AWS Security Hub", "AccuKnox"],
      evidence: "Integrated application, container, IaC, and AWS posture checks into delivery workflows."
    },
    {
      category: "Development",
      items: ["Python", "Golang", "Bash", "PostgreSQL", "MySQL", "MongoDB"],
      evidence: "Built operational tooling in Go and Bash and administered PostgreSQL and MongoDB systems."
    }
  ],
  achievements: [
    {
      title: "CI/CD Pipeline Optimization",
      category: "CI/CD",
      description: [
        "Migrated pipelines from Jenkins to Bitbucket Pipelines.",
        "Integrated Ansible for zero-touch deployments (80% less manual work).",
        "Transitioned to Trunk-Based Development, boosting frequency by 40%."
      ],
      metric: "-35% Build Time",
      evidence: "Measured after the pipeline migration and deployment automation work."
    },
    {
      title: "Security & Compliance",
      category: "Security",
      description: [
        "Resolved 85% of critical findings via Prowler & AWS Security Hub.",
        "Remediated 90% of IaC vulnerabilities using Checkov.",
        "Reduced staging security issues by 60% with DevSecOps tools."
      ],
      metric: "85% Critical Findings",
      evidence: "Based on tracked AWS posture and infrastructure-as-code findings."
    },
    {
      title: "Advanced Observability",
      category: "Observability",
      description: [
        "Developed custom Grafana dashboards tailored to business needs.",
        "Integrated IoT hardware logs for hardware-level diagnostics."
      ],
      metric: "-50% MTTR",
      evidence: "Measured after centralizing service and hardware diagnostics."
    }
  ],
  certificates: [
    {
      title: "CKA: Certified Kubernetes Administrator",
      issuer: "The Linux Foundation",
      url: "https://www.credly.com/users/waiyansoe/badges/credly",
      logo: "https://images.credly.com/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png"
    },
    {
      title: "Google Cloud Certified Associate Cloud Engineer",
      issuer: "Google Cloud",
      url: "https://www.credly.com/badges/3209b09a-191d-4760-9831-c93b14195817/public_url",
      logo: "/assets/certificates/gcp-ace.png"
    },
    {
      title: "LFEL1014: Scaling Cloud Native Applications with KEDA",
      issuer: "The Linux Foundation",
      url: "https://www.credly.com/org/the-linux-foundation/badge/lfel1014-scaling-cloud-native-applications-with-ked",
      logo: "https://images.credly.com/images/c35303ff-2b71-4f77-8fb2-c985c39dbf7f/blob"
    },
    {
      title: "LFS169: Introduction to GitOps",
      issuer: "The Linux Foundation",
      url: "https://www.credly.com/badges/ccccdf19-d88b-4c73-8d25-be4c4fdd3550/linked_in_profile",
      logo: "/assets/certificates/lfs169-gitops.png"
    },
    {
      title: "Prometheus Certified Associate (PCA)",
      issuer: "KodeKloud",
      url: "https://learn.kodekloud.com/certificate/7EE7D7BE53-2D1206E75712-7EE1A4AE05",
      logo: "/assets/certificates/pca.webp"
    }
  ]
};
