type MessageCardProps = {
  message: string;
};

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <div className="flex h-96 bg-white justify-center items-center rounded-lg">
      <p>{message}</p>
    </div>
  );
}
