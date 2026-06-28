import NextImage from 'next/image'

const Avatar = () => (
  <div
    id="klAvatar"
    className="size-56 shrink-0 p-0 md:size-64 xl:size-96 xl:p-8"
  >
    <NextImage
      src="/avatar.jpg"
      alt="Shlomi Nugarker, full-stack web developer in Tel Aviv"
      width={463}
      height={486}
      priority
      sizes="(max-width: 768px) 224px, (max-width: 1280px) 256px, 384px"
      className="m-auto h-auto w-full rounded-full"
    />
  </div>
)

export default Avatar
