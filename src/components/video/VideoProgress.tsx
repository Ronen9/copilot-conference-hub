import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/utils/videoUtils";

interface VideoProgressProps {
  duration: number;
  currentTime: number;
  progress: number;
  onProgressChange: (value: number[]) => void;
}

export const VideoProgress = ({
  duration,
  currentTime,
  progress,
  onProgressChange
}: VideoProgressProps) => {
  return (
    <div className="absolute -bottom-2 left-0 right-0 px-4 py-2 bg-black/50 flex items-center gap-4">
      <span className="text-white text-sm min-w-[80px]">
        {formatTime(duration - currentTime)}
      </span>
      <Slider
        value={[progress]}
        onValueChange={onProgressChange}
        max={100}
        step={0.1}
        className="flex-1"
      />
    </div>
  );
};