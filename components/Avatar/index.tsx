import NextImage from 'next/image'

const Avatar = () => (
  <div
    id="klAvatar"
    className="size-56 shrink-0 p-0 md:size-64 xl:size-96 xl:p-8"
  >
    <NextImage
      src="/avatar.jpg"
      alt="Shlomi Nugarker"
      width={463}
      height={486}
      priority
      className="m-auto h-auto w-full rounded-full"
    />
  </div>
)

export default Avatar
