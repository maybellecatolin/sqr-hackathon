import Column from "../../components/RetroCol";

export default function RetroContainer() {
  const columns: {id: "wentWell" | "wentWrong" | "toImprove" | "actionItems"; title: string; cardColor: string;}[] = [
    { id: "wentWell", title: "✅ Went Well", cardColor: "bg-green-100" },
    { id: "wentWrong", title: "❌ Went Wrong", cardColor: "bg-red-100" },
    { id: "toImprove", title: "🔧 To Improve", cardColor: "bg-yellow-100" },
    { id: "actionItems", title: "📌 Action Items", cardColor: "bg-blue-100" },
  ];

  return (
    <div>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          🧠 Sprint Retrospective Board
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 h-[80vh]">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 min-w-[250px]">
              <Column type={col.id} title={col.title} cardColor={col.cardColor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
