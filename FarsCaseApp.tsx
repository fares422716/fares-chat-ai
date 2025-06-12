import { useState } from "react";

export default function FarsCaseApp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    setOutput("جاري المعالجة...");
    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setOutput(data.result || "لم يتم توليد نتيجة.");
    } catch {
      setOutput("حدث خطأ أثناء المعالجة.");
    }
  };

  return (
    <div className="p-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleGenerate}>تشغيل</button>
      <pre>{output}</pre>
    </div>
  );
}
