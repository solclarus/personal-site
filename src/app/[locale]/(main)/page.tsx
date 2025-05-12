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
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { BookAudioIcon, FootprintsIcon } from "lucide-react";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";

export default async function Home() {
	const t = await getTranslations("Home");

	return (
		<main className="flex flex-col">
			<section className="relative mt-20">
				<Avatar className="relative mb-3 size-16 overflow-hidden rounded-full border">
					<motion.div
						className="absolute inset-0 h-full w-full"
						animate={{ rotate: 360 }}
						transition={{
							duration: 5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
							repeatType: "loop",
						}}
					>
						<AvatarImage
							src={appConfig.icon}
							alt={appConfig.author}
							className="h-full w-full object-cover"
						/>
					</motion.div>
					<AvatarFallback>
						{appConfig.author.toUpperCase().charAt(0)}
					</AvatarFallback>
				</Avatar>
				<h2 className="mb-3 font-extrabold font-mono text-primary text-xl">
					{appConfig.author}
				</h2>
				<p className="text-start font-mono">
					{t.rich("greeting", {
						name: (name) => (
							<span className="font-bold text-primary italic">{name}</span>
						),
					})}
				</p>
				<div className="mt-3 flex gap-2">
					<SiGithub />
					<SiInstagram color={"default"} />
				</div>
				<hr className="-translate-x-[50%] relative left-[50%] my-6 min-w-dvw border-t border-dashed" />
				<div className="flex min-w-min flex-wrap gap-2">
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
			<hr className="-translate-x-[50%] relative left-[50%] my-6 min-w-dvw border-t border-dashed" />
			<section>
				<div className="flex items-center justify-between">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
						<FootprintsIcon className="h-4 w-4 text-blue-500" />
					</div>
				</div>
				<p className="mt-4">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
					laudantium animi earum esse nulla, temporibus ipsam consequuntur
					necessitatibus neque praesentium voluptatem, accusantium ipsa voluptas
					magni autem excepturi tenetur sit unde adipisci. Molestias assumenda
					commodi consequuntur at eligendi enim facere nesciunt ut nam, ipsa
					soluta, porro est dignissimos laborum obcaecati tempora! Voluptatibus
					delectus, aspernatur odit, omnis exercitationem amet quidem corporis
					laudantium temporibus et tempora quisquam aperiam ipsa, consectetur
					sunt nam. Dolores, ex quidem sunt error, accusamus asperiores, nisi
					dolore vero incidunt id similique tenetur magnam! Consequuntur error
					rem ipsum, deleniti accusamus quis totam vitae odit possimus ullam
					reprehenderit ad blanditiis magnam!
				</p>
			</section>
			<hr className="-translate-x-[50%] relative left-[50%] my-6 min-w-dvw border-t border-dashed" />
			<section>
				<div className="flex items-center justify-between">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
						<BookAudioIcon className="h-4 w-4 text-orange-500" />
					</div>
				</div>
				<p className="mt-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					architecto eveniet numquam repellat quis sapiente iusto eligendi fuga?
					Odit ipsum porro nihil veniam enim quod quas officiis maiores,
					exercitationem ipsa accusantium, ad, error inventore eligendi autem at
					doloribus quasi ullam quae architecto fugiat vitae ipsam in! Ad
					aliquid voluptates alias, numquam doloribus nobis praesentium deleniti
					minus, autem debitis officiis optio ex! Temporibus unde saepe ipsam
					atque nulla possimus non, perferendis odio libero in optio ea dolores,
					aperiam eius cupiditate quia laboriosam nostrum. Atque sunt neque
					debitis accusamus maiores officiis error nostrum veniam sapiente
					veritatis, necessitatibus soluta mollitia laudantium numquam omnis,
					recusandae a vitae exercitationem voluptatem! Beatae praesentium
					possimus ea, autem aut, molestias dignissimos qui eligendi, et quos
					perspiciatis ratione fugit. Saepe aliquid fugit, optio dolore maiores
					mollitia incidunt praesentium non et quod accusantium accusamus sed
					porro dolorem dolorum, amet excepturi quaerat ipsum dolor aliquam
					repellendus. Consequatur veritatis nobis provident sed aliquid
					deserunt quasi possimus adipisci quos, odio tempora, delectus sequi
					nulla reiciendis omnis suscipit quo, veniam quibusdam laboriosam!
					Nostrum provident nihil explicabo, inventore unde maiores corrupti
					repellendus asperiores natus neque ullam voluptatem sequi a ipsam at
					rerum alias eum cum aliquid molestiae. Iste, quasi! Labore amet magnam
					neque nisi eos fugit molestias pariatur modi nulla? Sunt, commodi!
					Excepturi, distinctio commodi reiciendis inventore ratione optio
					debitis, pariatur neque eos, totam quaerat delectus ipsam nobis et
					earum minima dolore fugit consequatur aliquam enim esse! Odio maiores
					quia cum expedita maxime? Sequi impedit alias accusantium inventore
					sit, vel blanditiis id, ad ipsam dicta consequatur repudiandae autem!
					Vero voluptas, atque natus dignissimos culpa voluptate aut sunt
					voluptatum molestias? Hic mollitia eum porro dignissimos culpa
					voluptate magnam adipisci vero inventore quo reprehenderit
					perspiciatis maiores recusandae explicabo ea officiis dolorem, iusto
					sapiente tempora minus! Animi, suscipit! Quia assumenda culpa
					aspernatur voluptates laboriosam beatae quisquam alias repellat?
				</p>
			</section>
		</main>
	);
}
