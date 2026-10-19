"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentProps, ComponentType, CSSProperties, ReactNode } from "react";

export type MotionTag =
  | "div"
  | "section"
  | "article"
  | "footer"
  | "header"
  | "nav"
  | "ul"
  | "ol"
  | "li"
  | "span"
  | "p"
  | "a"
  | "button"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

type Direction = "up" | "down" | "left" | "right" | "none";

const EASE = [0.22, 1, 0.36, 1] as const;

const SHIFTS: Record<Exclude<Direction, "none">, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

/**
 * Fade + slide variants that collapse to a plain opacity fade when the user
 * prefers reduced motion. Marked with `data-reveal` so the no-JS stylesheet
 * can force everything visible.
 */
export function useItemVariants(
  direction: Direction = "up",
  distance = 24,
  delay = 0,
): Variants {
  const reduce = useReducedMotion();

  if (reduce || direction === "none") {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.35, ease: "easeOut", delay: reduce ? 0 : delay },
      },
    };
  }

  const unit = SHIFTS[direction];

  return {
    hidden: {
      opacity: 0,
      x: unit.x * distance,
      y: unit.y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.55, ease: EASE, delay },
    },
  };
}

/** Anchor-only extras, so `as="a"` links keep their native attributes. */
type LinkishProps = {
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
};

type MotionProps = {
  as?: MotionTag;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  amount?: number;
  once?: boolean;
} & LinkishProps;

type RevealProps = MotionProps & {
  direction?: Direction;
  distance?: number;
  delay?: number;
};

type PickedMotion = ComponentType<ComponentProps<typeof motion.div> & LinkishProps>;

function pick(as: MotionTag) {
  return motion[as] as PickedMotion;
}

/** Single element that fades/slides in the first time it enters the viewport. */
export function Reveal({
  as = "div",
  children,
  className,
  style,
  direction = "up",
  distance = 24,
  delay = 0,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const variants = useItemVariants(direction, distance, delay);
  const Component = pick(as);

  return (
    <Component
      className={className}
      data-reveal=""
      initial="hidden"
      style={style}
      variants={variants}
      viewport={{ once, amount }}
      whileInView="visible"
    >
      {children}
    </Component>
  );
}

type StaggerProps = MotionProps & {
  gap?: number;
  delayChildren?: number;
};

/** Parent that staggers its `StaggerItem` children as they scroll into view. */
export function Stagger({
  as = "div",
  children,
  className,
  style,
  gap = 0.08,
  delayChildren = 0,
  amount = 0.12,
  once = true,
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = pick(as);

  return (
    <Component
      className={className}
      data-reveal=""
      initial="hidden"
      style={style}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : gap,
            delayChildren: reduce ? 0 : delayChildren,
          },
        },
      }}
      viewport={{ once, amount }}
      whileInView="visible"
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = MotionProps & {
  direction?: Direction;
  distance?: number;
};

export function StaggerItem({
  as = "div",
  children,
  className,
  style,
  direction = "up",
  distance = 24,
}: StaggerItemProps) {
  const variants = useItemVariants(direction, distance);
  const Component = pick(as);

  return (
    <Component
      className={className}
      data-reveal=""
      style={style}
      variants={variants}
    >
      {children}
    </Component>
  );
}

/**
 * Load-time (not scroll-triggered) entrance for above-the-fold content.
 */
export function Enter({
  as = "div",
  children,
  className,
  style,
  direction = "up",
  distance = 20,
  delay = 0,
}: Omit<RevealProps, "amount" | "once">) {
  const variants = useItemVariants(direction, distance, delay);
  const Component = pick(as);

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      style={style}
      variants={variants}
    >
      {children}
    </Component>
  );
}