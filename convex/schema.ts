import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    userName: v.string(),
    text: v.string(),
    sentAt: v.number(),
  }).index("sentAt", ["sentAt"]),
});
