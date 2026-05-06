"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ChatEntry = {
  id: string;
  title?: string;
  snippet?: string;
  timestamp?: string;
};

export default function ChatHistoryPage() {
  const [history, setHistory] = useState<ChatEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("chatHistory");
      if (raw) {
        const parsed = JSON.parse(raw) as ChatEntry[];
        setHistory(parsed.slice().reverse());
      } else {
        const seed: ChatEntry[] = [
          {
            id: "seed-1",
            title: "Initial intake",
            snippet: "Discussed case facts and next steps.",
            timestamp: new Date().toISOString(),
          },
          {
            id: "seed-2",
            title: "Evidence review",
            snippet: "Summarized evidence and key timelines.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          },
          {
            id: "seed-3",
            title: "Draft memo",
            snippet: "Generated a draft memo for court filing.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          },
        ];
        localStorage.setItem("chatHistory", JSON.stringify(seed));
        setHistory(seed.slice().reverse());
      }
    } catch (e) {
      console.error("Failed to load chat history", e);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Chat History</h1>
        <Link
          href="/chat"
          className="text-sm text-primary hover:underline"
        >
          Back to Chat
        </Link>
      </div>

      {history.length === 0 ? (
        <div className="text-muted-foreground">No chat history yet.</div>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg hover:shadow-sm transition-shadow bg-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{item.title ?? `Chat ${item.id}`}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.snippet ?? "—"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground ml-4">
                  {item.timestamp
                    ? new Date(item.timestamp).toLocaleString()
                    : "—"}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Link
                  href={`/chat?session=${encodeURIComponent(item.id)}`}
                  className="text-sm text-primary hover:underline"
                >
                  Open
                </Link>
                <button
                  onClick={() => {
                    const raw = localStorage.getItem("chatHistory");
                    if (!raw) return;
                    try {
                      const parsed = JSON.parse(raw) as ChatEntry[];
                      const filtered = parsed.filter((c) => c.id !== item.id);
                      localStorage.setItem("chatHistory", JSON.stringify(filtered));
                      setHistory((h) => h.filter((c) => c.id !== item.id));
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="text-sm text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
