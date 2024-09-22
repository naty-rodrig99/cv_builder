import { z } from "zod";

export type NotNullIssue = {
  params: { code: "notNull" };
  message: string;
};

export type NotEmptyIssue = {
  params: { code: "notEmpty" };
  message: string;
};

export type ArrayNotEmptyIssue = {
  params: { code: "arrayNotEmpty" };
  message: string;
};

export type UniqueNameIssue = {
  params: { code: "uniqueName" };
  message: string;
};

export type UniqueOptionValuesIssue = {
  params: { code: "uniqueOptionValues" };
  message: string;
};

export type MaxLengthIssue = {
  params: { code: "maxLength"; length: number };
  message: string;
};

export type NotOneOfIssue = {
  params: { code: "notOneOf"; strings: string[] };
  message: string;
};

export type SlugLikeIssue = {
  params: { code: "slugLike" };
  message: string;
};

export type NotZeroIssue = {
  params: { code: "notZero" };
  message: string;
};

export type PositiveOrZeroIssue = {
  params: { code: "positiveOrZero" };
  message: string;
};

export type CustomIssue =
  | NotNullIssue
  | NotEmptyIssue
  | ArrayNotEmptyIssue
  | UniqueNameIssue
  | UniqueOptionValuesIssue
  | MaxLengthIssue
  | NotOneOfIssue
  | SlugLikeIssue
  | NotZeroIssue
  | PositiveOrZeroIssue;

export const notNull = (message?: string) =>
  z
    .any()
    .nullable()
    .refine((value) => value != null, {
      params: { code: "notNull" },
      message: message ?? "Must be set.",
    } satisfies NotNullIssue);

export const notEmpty = (message?: string) =>
  z.string().refine((value) => value?.trim()?.length > 0, {
    params: { code: "notEmpty" },
    message: message ?? "Must not be empty.",
  } satisfies NotEmptyIssue);

export const arrayNotEmpty = (message?: string) =>
  z.array(z.unknown()).refine((values) => values.length > 0, {
    params: { code: "arrayNotEmpty" },
    message: message ?? "Must contain at least one item.",
  } satisfies ArrayNotEmptyIssue);

export const maxLength = (n: number, message?: string) =>
  z.string().refine((value) => value.length <= n, {
    params: { code: "maxLength", length: n },
    message: message ?? `Must not be longer than ${n} characters.`,
  } satisfies MaxLengthIssue);

export const notOneOf = (strings: string[], message?: string) =>
  z.string().refine((value) => strings.every((str) => str !== value), {
    params: { code: "notOneOf", strings },
    message: message ?? `Must not be one of: ${strings.join(", ")}.`,
  } satisfies NotOneOfIssue);

export const notZero = (message?: string) =>
  z.number().refine((value) => value !== 0, {
    params: { code: "notZero" },
    message: message ?? `Must not be 0.`,
  } satisfies NotZeroIssue);

export const positiveOrZero = (message?: string) =>
  z.number().refine((value) => value >= 0, {
    params: { code: "positiveOrZero" },
    message: message ?? `Must be a positive number.`,
  } satisfies PositiveOrZeroIssue);
