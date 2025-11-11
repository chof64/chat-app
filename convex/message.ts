import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) =>
    await ctx.db.query("messages").withIndex("sentAt").order("desc").collect(),
});

export const add = mutation({
  args: { userName: v.string(), text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      userName: args.userName,
      text: args.text,
      sentAt: Date.now(),
    });
  },
});
