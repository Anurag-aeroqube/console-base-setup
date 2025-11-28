import { isValidElement, cloneElement } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

function translateNode(node: any, t: (key: string) => string): any {
  if (typeof node === "string") {
    const trimmed = node.trim();

    //  Exact match
    let translated = t(trimmed);

    //  Lowercase match
    if (translated === trimmed) {
      translated = t(trimmed.toLowerCase());
    }

    return translated;
  }

  if (Array.isArray(node)) {
    return node.map((child) => translateNode(child, t));
  }

  if (isValidElement(node)) {
    const props: any = node.props ?? {};

    return cloneElement(
      node,
      { ...props },
      translateNode(props.children ?? null, t)
    );
  }

  return node;
}

export default function AutoTranslateProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return <>{translateNode(children, t)}</>;
}
