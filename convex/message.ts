import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query("messages")
			.withIndex("sentAt")
			.order("desc")
			.take(10);
	},
});

export const add = mutation({
	args: { userName: v.string(), text: v.string() },
	handler: async (ctx, args) => {
		await ctx.db.insert("messages", {
			userName: args.userName,
			text: args.text,
			sentAt: Date.now(),
		});
		const allMessages = await ctx.db
			.query("messages")
			.withIndex("sentAt")
			.order("asc")
			.collect();
		if (allMessages.length > 10) {
			const toDelete = allMessages.slice(0, allMessages.length - 10);
			for (const message of toDelete) {
				await ctx.db.delete(message._id);
			}
		}
	},
});
