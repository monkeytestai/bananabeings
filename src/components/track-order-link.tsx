"use client";

import { useMonkeyMode } from "@/components/monkey-mode";
import { trackOrderHref } from "@/lib/monkeytest-mode";

export function TrackOrderLink({ className }: { className?: string }) {
  const mode = useMonkeyMode();
  const href = trackOrderHref(mode);
  return (
    <a
      href={href}
      id="track-order"
      data-testid="track-order"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        window.location.assign(href);
      }}
    >
      Track order
    </a>
  );
}
