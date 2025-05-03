import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { appConfig } from "@/config/app";
import {
	SiC,
	SiClerk,
	SiDart,
	SiExpo,
	SiFlutter,
	SiGit,
	SiGithub,
	SiInstagram,
	SiJavascript,
	SiNextdotjs,
	SiPython,
	SiReact,
	SiShadcnui,
	SiSupabase,
	SiTailwindcss,
	SiTypescript,
} from "@icons-pack/react-simple-icons";
import { getTranslations } from "next-intl/server";

export default async function Home() {
	const t = await getTranslations("Home");

	return (
		<main className="flex flex-col">
			<section className="relative">
				<Avatar className="mb-3 size-16 rounded-full border">
					<AvatarImage src={appConfig.icon} alt={appConfig.author} />
					<AvatarFallback>
						{appConfig.author.toUpperCase().charAt(0)}
					</AvatarFallback>
				</Avatar>
				<h2 className="mb-3 text-xl font-mono font-extrabold text-orange-400">
					{appConfig.author}
				</h2>
				<p className="font-mono text-start">
					{t.rich("greeting", {
						name: (name) => (
							<span className="font-bold italic text-orange-400">{name}</span>
						),
					})}
				</p>
				<div className="flex gap-2 mt-3">
					<SiGithub />
					<SiInstagram color={"default"} />
				</div>
				<hr className="border-t border-dashed relative min-w-dvw left-[50%] -translate-x-[50%] my-6" />
				<div className="flex gap-2 flex-wrap min-w-min">
					<SiGit color={"default"} className="flex-shrink-0" />
					<SiReact color={"default"} className="flex-shrink-0" />
					<SiJavascript color={"default"} className="flex-shrink-0" />
					<SiTypescript color={"default"} className="flex-shrink-0" />
					<SiDart color={"default"} className="flex-shrink-0" />
					<SiFlutter color={"default"} className="flex-shrink-0" />
					<SiExpo className="flex-shrink-0" />
					<SiPython color={"default"} className="flex-shrink-0" />
					<SiC color={"default"} className="flex-shrink-0" />
					<SiNextdotjs className="flex-shrink-0" />
					<SiTailwindcss color={"default"} className="flex-shrink-0" />
					<SiClerk color={"default"} className="flex-shrink-0" />
					<SiSupabase color={"default"} className="flex-shrink-0" />
					<SiShadcnui className="flex-shrink-0" />
				</div>
			</section>
			<hr className="border-t border-dashed relative min-w-dvw left-[50%] -translate-x-[50%] my-6" />
			<section>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam magni
				quod, quo distinctio eveniet aliquid necessitatibus illo repellendus in
				non doloribus voluptatibus similique tempora sit veniam officiis
				reiciendis blanditiis quia saepe fuga aut temporibus tempore! Id
				consectetur, iusto reprehenderit, quas debitis quos aperiam quisquam
				possimus tempora blanditiis eaque ab soluta maxime dolore in modi
				necessitatibus assumenda voluptatibus magnam voluptatem, placeat nulla
				dignissimos sequi beatae? Molestiae odio sequi nisi, ea, accusamus est
				assumenda iusto quisquam officia inventore incidunt maxime nam fuga
				voluptas dolores consectetur necessitatibus commodi! Quisquam, molestiae
				fugit maiores numquam adipisci consectetur molestias labore. Id aperiam
				minus tempora cum iusto!
			</section>
			<hr className="border-t border-dashed relative min-w-dvw left-[50%] -translate-x-[50%] my-6" />
			<section>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
				corrupti exercitationem nihil. Ipsam aut minus eligendi voluptate
				exercitationem iste, porro velit harum repudiandae laborum iure ea
				reiciendis maxime aliquid et.
			</section>
		</main>
	);
}
