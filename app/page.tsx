"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [inputs, setInputs] = useState({ siita: "", rajhi: "", mostafa: "" });
  const [response, setResponse] = useState({ siita: "", rajhi: "", mostafa: "" });
  const [currentCase, setCurrentCase] = useState("siita");
  const [attachments, setAttachments] = useState({ siita: null, rajhi: null, mostafa: null });

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputs((prev) => ({ ...prev, [currentCase]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachments((prev) => ({ ...prev, [currentCase]: file }));
  };

  const handleGenerate = async (type) => {
    const input = inputs[currentCase];
    const promptMap = {
      memo: `صياغة مذكرة بناءً على: ${input}`,
      reply: `صياغة رد على الدعوى: ${input}`,
      summary: `تلخيص القضية التالية: ${input}`,
    };

    setResponse((prev) => ({ ...prev, [currentCase]: "جاري المعالجة..." }));

    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptMap[type] }),
      });

      if (!res.ok) throw new Error("فشل الاتصال بالخادم");

      const data = await res.json();
      setResponse((prev) => ({ ...prev, [currentCase]: data.result || "لم يتم توليد نتيجة." }));
    } catch (error) {
      console.error("Error during processing:", error);
      setResponse((prev) => ({ ...prev, [currentCase]: "حدث خطأ أثناء المعالجة. الرجاء المحاولة لاحقًا." }));
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto text-right rtl bg-[#0d0d0d] text-white min-h-screen">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">شركة الفارس للمحاماة والاستشارات القانونية</h1>
      </header>

      <Tabs
        defaultValue="siita"
        onValueChange={(val) => {
          setCurrentCase(val);
        }}
      >
        <TabsList className="grid grid-cols-3 gap-2 bg-transparent">
          <TabsTrigger value="siita">دعوى صيته</TabsTrigger>
          <TabsTrigger value="rajhi">دعوى الراجحي</TabsTrigger>
          <TabsTrigger value="mostafa">دعوى مصطفى العمالية</TabsTrigger>
        </TabsList>

        {Object.keys(inputs).map((caseId) => (
          <TabsContent key={caseId} value={caseId}>
            <Textarea
              placeholder="اكتب تفاصيل القضية هنا..."
              value={inputs[caseId]}
              onChange={handleInputChange}
              className="min-h-[120px] bg-[#1a1a1a] text-white border-white"
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              <Button onClick={() => handleGenerate("memo")}>✍️ صياغة مذكرة</Button>
              <Button onClick={() => handleGenerate("reply")}>🛡️ رد على الدعوى</Button>
              <Button onClick={() => handleGenerate("summary")}>📝 تلخيص</Button>
            </div>

            {response[caseId] && (
              <Card className="mt-4 bg-[#1a1a1a] border-white text-white">
                <CardContent className="whitespace-pre-wrap text-right">
                  {response[caseId]}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
