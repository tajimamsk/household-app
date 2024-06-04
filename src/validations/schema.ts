import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です。" }),
  amount: z.number().min(1, { message: "金額は1円以上必須です。" }),
  content: z
    .string()
    .min(1, { message: "内容を入力して下さい。" })
    .max(50, { message: "内容は50文字以内にして下さい。" }),
  category: z
    .union([
      z.enum(["食費", "日用品", "住居費", "交際費", "娯楽費", "交通費"]),
      z.enum(["給与", "副収入", "小遣い"]),
      z.literal(""),
    ])
    .refine((val) => val !== "", {
      message: "カテゴリを選択して下さい",
    }),
});

export type Schema = z.infer<typeof transactionSchema>;
