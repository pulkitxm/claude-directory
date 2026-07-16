import { useInViewAnimation } from "../hooks/useInViewAnimation";

interface Project {
	name: string;
	description: string;
	image: string;
}

const PROJECTS: Project[] = [
	{
		name: "evr",
		description: "From idea to millions raised for a web3 AI product",
		image: "./assets/hero-evr-ventures-preview-DZxeVFEX.gif",
	},
	{
		name: "Automation Machines",
		description: "Streamlining industrial automation processes",
		image: "./assets/hero-automation-machines-preview-DlTveRIN.gif",
	},
	{
		name: "xPortfolio",
		description: "Modern portfolio management platform",
		image: "./assets/hero-xportfolio-preview-D4A8maiC.gif",
	},
];

function ProjectItem({ project }: { project: Project }) {
	const { ref, animationClass } = useInViewAnimation<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={animationClass}
			style={{ animationDelay: "0.1s" }}
		>
			<div className="ml-20 mb-6 md:ml-28">
				<h3 className="font-serif text-2xl font-semibold text-[#051A24] md:text-3xl">
					{project.name}
				</h3>
				<p className="mt-2 text-sm text-[#051A24]/70 md:text-base">
					{project.description}
				</p>
			</div>
			<img
				src={project.image}
				alt={`${project.name} — ${project.description}`}
				loading="lazy"
				className="w-full rounded-2xl object-cover shadow-lg"
			/>
		</div>
	);
}

export default function ProjectsSection() {
	return (
		<section id="work" className="mx-auto max-w-[1200px] px-6 py-12">
			<div className="flex flex-col gap-16 md:gap-20">
				{PROJECTS.map((project) => (
					<ProjectItem key={project.name} project={project} />
				))}
			</div>
		</section>
	);
}
