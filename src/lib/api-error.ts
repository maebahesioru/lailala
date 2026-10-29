import { NextResponse } from "next/server";

/**
 * API の想定外例外を 500 に写像する。
 *
 * 以前は `e.message` をそのまま返していたため、Prisma の生エラー
 * （クエリ全文やカラム名）がクライアントに漏れていた。内部情報は
 * サーバーログにだけ残し、レスポンスは定型文にする。
 */
export function internalError(scope: string, error: unknown): NextResponse {
  console.error(`[${scope}]`, error);
  return NextResponse.json(
    { error: "サーバー内部でエラーが発生しました。時間をおいて再試行してください。" },
    { status: 500 }
  );
}
