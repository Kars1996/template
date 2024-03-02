/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/


export default function() {
    return (
      <div
      className="absolute top-0 left-0 bottom-0 right-0 text-black flex items-center justify-center"
      style={{
          backgroundImage:
              "url('https://source.unsplash.com/ZK1HZiMZ2EM/1920x1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}
  >
      <div className="space-y-6 text-center max-w-xl px-20 py-14 border-2 border-white/10 bg-black/50 rounded-xl backdrop-filter backdrop-blur-lg">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#B16CEA] via-[#FF5E69] to-[#FFA84B]">
              Kars
          </h1>

          <SocialLink href="https://github.com/kars1996/Template">
              Repo
          </SocialLink>

          <p className="opacity-75 text-xl">A NextJS Template</p>
      </div>
  </div>
    );
}

function SocialLink(props: { children: string; href: string }) {
    return (
        <a
            href={props.href}
            className="space-x-3 bg-[#d2e4ff] px-3 py-1.5 text-black inline-flex items-center change-transform rounded-full transform transition-all hover:scale-95 duration-500"
        >
            <i
                className="bx bx-github inline"
                style={{ height: 24, width: 24 }}
            />
            <span>{props.children}</span>
        </a>
    );
}
