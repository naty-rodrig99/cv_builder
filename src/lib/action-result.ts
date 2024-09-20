// Next.js does not have proper error handling. A very mature framework, I know! So instead we define an FP inspired result object.
// https://github.com/vercel/next.js/discussions/49302

export type ActionResultOk<Ok> = { ok: true; value: Ok };
export type ActionResultError<Err> = { ok: false; error: Err };

export type ActionResult<Ok, Err> = Promise<
  ActionResultOk<Ok> | ActionResultError<Err>
>;

export const actionError = <Err>(err: Err): ActionResultError<Err> => ({
  ok: false,
  error: err,
});
export const actionOk = <Ok>(ok: Ok): ActionResultOk<Ok> => ({
  ok: true,
  value: ok,
});
