export default function StatusPill({
  label = "Available for Projects",
  variant = "emerald",
  icon: Icon = null,
  size = "sm",
}) {
  const variantStyles = {
    emerald: {
      ping: "bg-emerald-400",
      dot: "bg-emerald-500",
      text: "text-emerald-400/90",
    },
    blue: {
      ping: "bg-blue-400",
      dot: "bg-blue-500",
      text: "text-blue-400/90",
    },
    amber: {
      ping: "bg-amber-400",
      dot: "bg-amber-500",
      text: "text-amber-400/90",
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.emerald;
  const textSize = size === "xs" ? "text-[9px]" : "text-[10px]";

  return (
    <div className="flex items-center gap-1.5">
      {Icon ? (
        <Icon className="h-2.5 w-2.5 text-slate-300" />
      ) : (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${currentVariant.ping} opacity-60`}
          ></span>
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${currentVariant.dot}`}
          ></span>
        </span>
      )}
      <span className={`${textSize} font-medium ${currentVariant.text}`}>
        {label}
      </span>
    </div>
  );
}
