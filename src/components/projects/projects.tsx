export const Projects = () => {
  const projects = [
    {
      title: 'Pollify',
      description:
        'Real-time polling platform built with Next.js, Node.js, Socket.IO, PostgreSQL, and Docker.',
      github: '#',
      live: '#',
    },
    {
      title: 'Portfolio Website',
      description:
        'Personal portfolio showcasing projects, skills, and experience with modern UI design.',
      github: '#',
      live: '#',
    },
    {
      title: 'Do it creation',
      description: `A full-stack project management app with real-time collaboration, 
        built using Next.js, Express, MySQL with integration of Razorpay for payments.`,
      github: '#',
      live: '#',
    },
  ];

  return (
    <section className="w-full">
      <div className="border-y border-neutral-800 border-dashed px-10 py-10">
        <div className="mb-10">
          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>

          <p className="mt-4 max-w-2xl text-neutral-400">
            A collection of projects focused on full-stack development,
            real-time applications, APIs, and modern web experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-neutral-800 p-1"
            >
              <div className="h-full rounded-xl bg-neutral-950 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{project.title}</h3>

                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-sm hover:border-neutral-600"
                    >
                      G
                    </a>

                    <a
                      href={project.live}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-sm hover:border-neutral-600"
                    >
                      ↗
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
