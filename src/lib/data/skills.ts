export interface SkillItem {
	name: string;
	level: number; // 1-5
}

export interface SkillCategory {
	key: string;
	icon: string;
	skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
	{
		key: 'backend',
		icon: 'ai',
		skills: [
			{ name: 'OpenAI Agents SDK', level: 5 },
			{ name: 'LangChain', level: 4 },
			{ name: 'ChromaDB', level: 4 },
			{ name: 'Python', level: 5 },
			{ name: 'FastAPI', level: 5 },
			{ name: 'RAG Pipelines', level: 4 }
		]
	},
	{
		key: 'cloud',
		icon: 'cloud',
		skills: [
			{ name: 'Docker', level: 5 },
			{ name: 'Kubernetes', level: 4 },
			{ name: 'GCP', level: 4 },
			{ name: 'AWS', level: 3 },
			{ name: 'CI/CD', level: 4 },
			{ name: 'Terraform', level: 3 }
		]
	},
	{
		key: 'databases',
		icon: 'network',
		skills: [
			{ name: 'Netmiko', level: 5 },
			{ name: 'NAPALM', level: 4 },
			{ name: 'Ansible', level: 4 },
			{ name: 'Scrapli', level: 4 },
			{ name: 'NETCONF', level: 3 },
			{ name: 'SNMP', level: 3 }
		]
	},
	{
		key: 'frameworks',
		icon: 'code',
		skills: [
			{ name: 'FastAPI', level: 5 },
			{ name: 'PostgreSQL', level: 5 },
			{ name: '.NET', level: 4 },
			{ name: 'Apache Kafka', level: 4 },
			{ name: 'Redis', level: 4 },
			{ name: 'SQLAlchemy', level: 4 },
			{ name: 'React', level: 3 }
		]
	},
	{
		key: 'languages',
		icon: 'languages',
		skills: [
			{ name: 'Python', level: 5 },
			{ name: 'Go', level: 3 },
			{ name: 'Rust', level: 3 },
			{ name: '.NET', level: 4 },
			{ name: 'TypeScript', level: 3 }
		]
	}
];
