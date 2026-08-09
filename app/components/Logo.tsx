export default function Logo({ className = "h-full w-full" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <circle cx="40" cy="40" r="40" fill="#000" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="42"
          fontWeight="700"
          fill="#fff"
          fontFamily="Inter, Arial, sans-serif"
          dominantBaseline="middle"
        >
          F
        </text>
      </svg>
    </div>
  );
}
