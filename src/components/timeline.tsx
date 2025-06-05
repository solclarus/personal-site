import {
	Building2Icon,
	CodeIcon,
	GraduationCapIcon,
	type LucideIcon,
	MonitorIcon,
	TrophyIcon,
} from "lucide-react";

type Experience = {
	id: number;
	title: string;
	period: string;
	description: string;
	icon: LucideIcon;
};

const EXPERIENCES: Experience[] = [
	{
		id: 0,
		title: "Senior Full Stack Developer",
		period: "2023 - Present",
		description:
			"Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization. Designed and implemented microservices architecture for scalable solutions.",
		icon: TrophyIcon,
	},
	{
		id: 1,
		title: "Full Stack Developer",
		period: "2021 - 2023",
		description:
			"Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality. Built web applications using React, Node.js, and PostgreSQL stack.",
		icon: Building2Icon,
	},
	{
		id: 2,
		title: "Frontend Developer",
		period: "2018 - 2021",
		description:
			"Created responsive and interactive user interfaces, collaborated with designers to improve UX/UI, and optimized application performance. Utilized React, Vue.js, and TypeScript for modern web development.",
		icon: MonitorIcon,
	},
	{
		id: 3,
		title: "Junior Developer",
		period: "2016 - 2018",
		description:
			"Learned web development fundamentals while handling bug fixes and implementing small-scale features. Mastered HTML, CSS, and JavaScript. Experienced team development processes including version control and code reviews.",
		icon: CodeIcon,
	},
	{
		id: 4,
		title: "Bachelor of Computer Science",
		period: "2012 - 2016",
		description:
			"Majored in Computer Science at university. Studied programming fundamentals, data structures and algorithms, database design, and software engineering theory. Developed a web application as a graduation project.",
		icon: GraduationCapIcon,
	},
];

export default function Timeline() {
	return (
		<div className="relative ml-4">
			<div className="absolute inset-y-0 left-0 border-l-2 border-dotted" />

			{EXPERIENCES.map((item) => {
				const Icon = item.icon;

				return (
					<div key={item.id} className="relative pb-8 pl-8 last:pb-0">
						<div className="-translate-x-1/2 absolute left-px flex h-6 w-6 items-center justify-center rounded-full bg-muted ring-8 ring-background">
							<Icon className="h-3 w-3 text-foreground" />
						</div>

						<div className="space-y-3">
							<div className="flex justify-between">
								<h3 className="font-semibold">{item.title}</h3>
								<p className="text-muted-foreground text-sm">{item.period}</p>
							</div>
							<p className="text-muted-foreground text-sm">
								{item.description}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
