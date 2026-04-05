import {players} from "../../data/players.ts";
import type {Player} from "../../types/player.ts";

export default function findPlayerBySlug(slug: string): Player | undefined {
	return players.find((p) => p.slug === slug);
}