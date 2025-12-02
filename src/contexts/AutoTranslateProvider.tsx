import { isValidElement, cloneElement } from "react";
import type { ReactNode, ReactElement } from "react";
import { useTranslation } from "react-i18next";

function hasProps(
  node: ReactNode
): node is ReactElement<{ children?: ReactNode }> {
  return isValidElement(node) && "props" in node;
}

function translateNode(node: ReactNode, t: (key: string) => string): ReactNode {
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed) return node;

    let translated = t(trimmed);

    if (translated === trimmed) {
      translated = t(trimmed.toLowerCase());
    }

    return translated !== trimmed
      ? node.replace(trimmed, translated)
      : node;
  }

  if (Array.isArray(node)) {
    return node.map((child) => translateNode(child, t));
  }

  if (hasProps(node)) {
    const props = node.props;

    return cloneElement(node, {
      ...props,
      children: translateNode(props.children, t),
    });
  }

  return node;
}

export default function AutoTranslateProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return <>{translateNode(children, t)}</>;
}
