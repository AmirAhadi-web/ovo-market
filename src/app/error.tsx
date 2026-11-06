"use client";

import { RotateCcw } from "lucide-react";

import { ErrorState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-x py-16">
      <ErrorState
        action={
          <Button onClick={reset} variant="default">
            <RotateCcw className="size-4" />
            تلاش دوباره
          </Button>
        }
      />
    </div>
  );
}
