"use client";

import { onImgError } from "@/lib/img-fallback";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * 壊れたアバターをプレースホルダに差し替える <img>。
 * サーバーコンポーネントからは onError を直接渡せないため、クライアント側に閉じ込める。
 */
export function AvatarImg({ src, alt, width, height, className }: Props) {
  return <img src={src} alt={alt} width={width} height={height} className={className} onError={onImgError} />;
}
