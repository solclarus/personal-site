"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AnimatedBackground = dynamic(
	() => import("@vista-voyage/components/animated-background"),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
				Loading animation...
			</div>
		),
	},
);

export default function VistaVoyage() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return <main>{isMounted && <AnimatedBackground />}</main>;
}
