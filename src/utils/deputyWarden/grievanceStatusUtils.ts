export const normalizeGrievanceStatus = (status: string | number) => {
  const raw = String(status ?? "").trim();
  const s = raw.toUpperCase();
  if (raw === "2" || s === "APPROVED" || s === "MANAGER") {
    return { label: "APPROVED", className: "bg-green-500 text-white" };
  }
  if (raw === "3" || s === "DECLINED" || s === "REJECTED") {
    return { label: "DECLINED", className: "bg-red-500 text-white" };
  }
  return { label: "PENDING", className: "bg-[#022B60] text-white" };
};
