import type { ImageProps } from "next/image";
import React from "react";

type MockImageProps = ImageProps & { fallbackSrc?: string };

const NextImage = ({ src, alt, fallbackSrc, ...props }: MockImageProps) => {
  const resolvedSrc = typeof src === "string" ? src : fallbackSrc ?? "";
  const { style, ...rest } = props as Record<string, unknown>;

  return <img src={resolvedSrc} alt={alt} style={style as React.CSSProperties} {...rest} />;
};

export default NextImage;
