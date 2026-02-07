
import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Wai Yan Soe",
  title: "DevOps Engineer",
  summary: "Results-driven DevOps Engineer with 3+ years of experience designing and implementing scalable cloud infrastructure, CI/CD pipelines, and DevSecOps practices. Proven expertise in AWS, Kubernetes, Terraform, and observability tools. Passionate about automating workflows, enhancing system reliability, and fostering collaboration between development and operations teams.",
  contact: {
    phone: "06 2929 0678",
    email: "hello.waiyansoe@gmail.com",
    location: "Phuket, Thailand"
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
      location: "Yangon, Myanmar | Remote",
      description: [
        "Maintained and optimized microservices architecture to enhance scalability, system integration, and deployment flexibility for internal and external cloud-native applications.",
        "Provisioned secure, scalable infrastructure using Terraform and Terraform Cloud, leveraging private custom modules for AWS infrastructure and observability tools such as Grafana Cloud.",
        "Built and managed containerized workloads on Amazon ECS, integrated with API Gateway and event-driven logic using AWS Lambda.",
        "Automated CI/CD pipelines using AWS CodePipeline and GitHub Actions, with integrated unit testing, security scanning, and automated deployments via AWS CodeDeploy.",
        "Implemented DevSecOps practices using tools like SonarQube, Snyk, Trivy, Checkov, and AWS security services (GuardDuty, Security Hub, AWS Config) to ensure application and infrastructure security and compliance.",
        "Deployed and maintained monitoring solutions including Grafana Cloud, AWS CloudWatch, and Sentry for real-time observability, alerting, and performance tracking.",
        "Worked collaboratively with developers, product managers, Scrum Masters, and system/network teams to troubleshoot issues and improve delivery pipelines.",
        "Created detailed documentation and onboarding materials to support internal DevOps adoption, operational consistency, and process transparency."
      ]
    },
    {
      company: "HQS Co.,Ltd | QSlogic",
      role: "DevOps Engineer",
      period: "Nov 2022 – Aug 2024",
      location: "Yangon, Myanmar",
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
      location: "Yangon, Myanmar",
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
      location: "Yangon, Myanmar",
      description: [
        "Analysed logistics operations to identify inefficiencies, optimized transportation and warehouse processes for cost savings, and managed scheduling with strategic cost monitoring."
      ]
    }
  ],
  skills: [
    {
      category: "Cloud Infrastructure",
      items: ["AWS Cloud", "Google Cloud", "Terraform", "Terraform Cloud"]
    },
    {
      category: "Containerization",
      items: ["Docker", "Kubernetes", "Amazon ECS", "Amazon EKS", "Google GKE"]
    },
    {
      category: "CI/CD & DevOps",
      items: ["Jenkins", "GitHub Actions", "GitLab CI", "AWS CodePipeline", "Bitbucket Pipeline"]
    },
    {
      category: "Observability",
      items: ["CloudWatch", "Grafana Cloud", "ELK Stack"]
    },
    {
      category: "DevSecOps",
      items: ["SonarQube", "Snyk", "Trivy", "Checkov", "Prowler", "AWS Security Hub", "AccuKnox"]
    },
    {
      category: "Development",
      items: ["Python", "Golang", "Bash", "PostgreSQL", "MySQL", "MongoDB"]
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
      metric: "-35% Build Time"
    },
    {
      title: "Security & Compliance",
      category: "Security",
      description: [
        "Resolved 85% of critical findings via Prowler & AWS Security Hub.",
        "Remediated 90% of IaC vulnerabilities using Checkov.",
        "Reduced staging security issues by 60% with DevSecOps tools."
      ],
      metric: "85% Risk Reduction"
    },
    {
      title: "Advanced Observability",
      category: "Observability",
      description: [
        "Developed custom Grafana dashboards tailored to business needs.",
        "Integrated IoT hardware logs for hardware-level diagnostics."
      ],
      metric: "-50% MTTR"
    }
  ],
  certificates: [
    {
      title: "Google Cloud Certified Associate Cloud Engineer",
      issuer: "Google Cloud",
      url: "https://www.credly.com/badges/3209b09a-191d-4760-9831-c93b14195817/public_url",
      logo: "/assets/certificates/gcp-ace.png"
    },
    {
      title: "Prometheus Certified Associate (PCA)",
      issuer: "KodeKloud",
      url: "https://learn.kodekloud.com/certificate/7EE7D7BE53-2D1206E75712-7EE1A4AE05",
      logo: "/assets/certificates/pca.webp"
    },
    {
      title: "Linux Foundation Certified System Administrator (LFCS)",
      issuer: "KodeKloud",
      url: "https://learn.kodekloud.com/certificate/7EE7D7BE53-2D042082D89C-7EE1A4AE05",
      logo: "/assets/certificates/lfcs.webp"
    },
    {
      title: "LFS169: Introduction to GitOps",
      issuer: "The Linux Foundation",
      url: "https://www.credly.com/badges/ccccdf19-d88b-4c73-8d25-be4c4fdd3550/linked_in_profile",
      logo: "/assets/certificates/lfs169-gitops.png"
    }
  ]
};
