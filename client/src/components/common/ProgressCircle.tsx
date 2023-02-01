// Inspired by https://css-tricks.com/building-progress-ring-quickly/

type ProgressCircleProps = {
  progress: number;
};

const ProgressCircle = ({ progress }: ProgressCircleProps) => {
  const radius = 40;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} style={{ transform: "rotate(-90deg)" }}>
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={[circumference, circumference].join(" ")}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressCircle;
