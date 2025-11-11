"use client";

import {
	ConvexProvider as ConvexProviderRoot,
	ConvexReactClient,
} from "convex/react";
import type { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexProvider({ children }: { children: ReactNode }) {
	return <ConvexProviderRoot client={convex}>{children}</ConvexProviderRoot>;
}
